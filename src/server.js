import express from "express";
import { engine } from "express-handlebars";
import { marked } from "marked";
import bodyParser from "body-parser";
import validateReview from "./serverFilters/reviewValidation.js";

export default function(api) {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());

    app.engine("handlebars", engine({
        helpers: {
            markdown: md => marked(md),
        },
    }));
    app.set("view engine", "handlebars");
    app.set("views", "./handlebars-templates");


    app.get("/", async (req, res) => {
        const movies = await api.getMovies();
        res.render("homepage", { movies });
    });

    app.get("/homepage", async (req, res) => {
        const movies = await api.getMovies();
        res.render("homepage", { movies });
    })

    app.get("/api/upcoming-screenings", async (req, res) => {
        const data = await api.getScreenings(req.query);
        res.json(data);
    })

    app.get("/about", (req, res) => {
        res.render("about");
    })

    app.get("/contact", (req, res) => {
        res.render("contact");
    })

    app.get("/giftcard", (req, res) => {
        res.render("giftcard");
    })

    app.get("/news", (req, res) => {
        res.render("news");
    })

    app.get("/tickets", (req, res) => {
        res.render("contact");
    })

    app.get("/movies", (req, res) => {
        res.render("movie");
    })

    app.get("/movies/:movieId", async (req, res) => {
        const movie = await api.getMovie(req.params.movieId);
        if (movie) {
            res.render("movie", { movie });
        } else {
            res.status(404).render("404");
        }
    })

    app.post("/api/movies/:id/reviews", async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        const movie = await api.getMovie(id);
        const review = {
            movie: movie,
            ...body,    
        }

        const status = validateReview(review);

        if (status.isValid) {
            try {
                await api.postReview(review, true);
            } catch (err) {
                console.log(err);
                res.status(500).end();
            }
        } 
        res.status(status.code).send({ status: status });    
    });

    app.use("/static", express.static("./static"));

    return app;
}