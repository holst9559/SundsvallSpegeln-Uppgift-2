import express from "express";
import { engine } from "express-handlebars";
import { marked } from "marked";


import * as api from './api.js';

const app = express();


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
    const movie = await api.getMovie(req.params.movieId);
    

    if (movie) {
        res.render("movie", { movie });
        
    } else {
        res.status(404).render("404");
    }
   
});

  
app.get("/api/movie/:movieId/screenings", async (req, res) => {
    const id = req.params.movieId;
    const data = await api.getScreenings(id);
    

    const resultFilter = data.filter(comming);

    function comming(time){
        const screening = new Date(time.attributes.start_time);
        const today = new Date();
       // console.log(time.attributes.start_time);
        if(screening >= today){
        return time; 
        } 
    }
    console.log(resultFilter)

    res.send(resultFilter);
    
});

app.use("/static", express.static("./static"));

export default app;