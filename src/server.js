import express from "express";
import { engine } from "express-handlebars";
import { marked } from "marked";
import bodyParser from "body-parser";
import validateReview from "./serverFilters/reviewValidation.js";

export default function (api) {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());

  app.engine(
    "handlebars",
    engine({
      helpers: {
        markdown: (md) => marked(md),
      },
    })
  );
  app.set("view engine", "handlebars");
  app.set("views", "./handlebars-templates");

  app.engine(
    "handlebars",
    engine({
      helpers: {
        markdown: (md) => marked(md),
      },
    })
  );
  app.set("view engine", "handlebars");
  app.set("views", "./handlebars-templates");

  app.get("/", async (req, res) => {
    const movies = await api.getMovies();
    res.render("homepage", { movies });
  });

  app.get("/homepage", async (req, res) => {
    const movies = await api.getMovies();
    res.render("homepage", { movies });
  });

  app.get("/about", (req, res) => {
    res.render("about");
  });

  app.get("/contact", (req, res) => {
    res.render("contact");
  });

  app.get("/giftcard", (req, res) => {
    res.render("giftcard");
  });

  app.get("/news", (req, res) => {
    res.render("news");
  });

  app.get("/tickets", (req, res) => {
    res.render("contact");
  });

  app.get("/movies", (req, res) => {
    res.render("movie");
  });

  app.get("/movies/:movieId", async (req, res) => {
    const movie = await api.getMovie(req.params.movieId);
    if (movie) {
      res.render("movie", { movie });
    } else {
      res.status(404).render("404");
    }
  });

  app.get("/api/movies", async (req, res) => {
    const movies = await api.getMovies();
    res.json(movies);
  });

  app.get("/api/movies/:movieId", async (req, res) => {
    const movie = await api.getMovie(req.params.movieId);
    res.json(movie);
  });

  app.get("/api/movies/:movieId/screenings", async (req, res) => {
    const movieScreenings = await api.getScreenings(
      parseInt(req.params.movieId)
    );
    res.json(movieScreenings);
  });

  // get reviews
  app.get("/api/movies/:id/reviews", async (req, res) => {
    try {
      let { page, pageSize } = req.query;

      if (!page) {
        page = 1;
      }

      if (!pageSize) {
        pageSize = 25;
      }
      const limit = parseInt(pageSize);
      const skip = (page - 1) * pageSize;

      const id = req.params.id;

      const reviews = await api.getReviews(id, limit, skip);

      //console.log("reviews", reviews);
      return res.status(200).send(reviews);
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/api/movies/:id/reviews", async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const movie = await api.getMovie(id);
    const review = {
      movie: movie,
      ...body,
    };

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

  app.get("/api/movies/:id/ratings", async (req, res) => {
    const id = req.params.id;
    const imdb = await api.getMovie(id);
    const data = await api.getAverageRating(id, imdb.attributes.imdbId);
    if (data) {
      res.status(200).send({ data });
    } else {
      res.status(404).end();
    }
  });

  app.get("/api/movies/:movieId/reviews/:id", async (req, res) => {
    const reviewId = await api.getSingleMovieReview(
      req.params.movieId,
      req.params.id
    );
    res.json(reviewId);
  });

  app.get("/api/upcoming-screenings", async (req, res) => {
    const data = await api.getScreenings(req.query);
    res.json(data);
  });

  app.use("/static", express.static("./static"));

  return app;
}
