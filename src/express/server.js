import express from "express";
import { engine } from "express-handlebars";
import { marked } from "marked";

import { getMovies, getMovie } from "../data/moviesData.js";

const app = express();


app.engine("handlebars", engine({
    helpers: {
        markdown: md => marked(md),
    },
}));
app.set("view engine", "handlebars");
app.set("views", "./handlebars-templates");

app.get("/", async (req, res) => {
    const movies = await getMovies();
    res.render("homepage", { movies });
});

app.get("/homepage", async (req, res) => {
    const movies = await getMovies();
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

app.get("/movie", (req, res) => {
    res.render("movie");
})

app.get("/movie/:movieId", async (req, res) => {
    const movie = await getMovie(req.params.movieId);
    if (movie) {
        res.render("movie", { movie });
    } else {
        res.status(404).render("404");
    }
})

app.use("/src", express.static("./src"));

export default app;