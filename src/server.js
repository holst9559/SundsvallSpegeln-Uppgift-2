import express from "express";
import { engine } from "express-handlebars";
import { marked } from "marked";
import bodyParser from 'body-parser';
import reviewRouter from './routes/reviewRoutes.js';

import * as api from './api.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("handlebars", engine({
    helpers: {
        markdown: md => marked(md),
    },
}));
app.set("view engine", "handlebars");
app.set("views", "./handlebars-templates");

app.use('/api', reviewRouter);

app.get("/", async (req, res) => {
    const movies = await api.getMovies();
    res.render("homepage", { movies });
});

app.get("/homepage", async (req, res) => {
    const movies = await api.getMovies();
    res.render("homepage", { movies });
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

app.use("/static", express.static("./static"));

export default app;