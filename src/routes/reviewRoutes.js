import express from "express";
import * as api from "../api.js";
const reviewRouter = express.Router();

reviewRouter.post('/movies/:id/reviews', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const movie = await api.getMovie(id);
    const review = {
        ...body,
        movie: movie,
    }
    //api.postReview(review);
});

export default reviewRouter;