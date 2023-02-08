import app from "../src/server.js";
import request from "supertest"; 

//Mocks
const mockReview = {
    author: "John Doe",
    comment: "This is a test comment",
    rating: 1,
};

describe("POST /api/movies/:id/reviews", () => {
    describe("Rating validation", () => {
        test("status 200 if rating is between 0-5", async () => {
            const res = await request(app)
                .post("/api/movies/1/reviews")
                .set("Content-Type", "application/json")
                .send({
                    ...mockReview,
                    rating: 3
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.status.message).not.toBeUndefined();
        });

        test("status 403 if rating is below 0", async () => {
            const res = await request(app)
                .post("/api/movies/2/reviews")
                .set("Content-Type", "application/json")
                .send({
                    ...mockReview,
                    rating: -1
                });

            expect(res.statusCode).toBe(403);
            expect(res.body.status.message).not.toBeUndefined();
        });

        test("status 403 if rating is above 5", async () => {
            const res = await request(app)
                .post("/api/movies/2/reviews")
                .set("Content-Type", "application/json")
                .send({
                    ...mockReview,
                    rating: 6
                });

            expect(res.statusCode).toBe(403);
            expect(res.body.status.message).not.toBeUndefined();
        });

        test("status 403 if rating is not a number", async () => {
            const res = await request(app)
                .post("/api/movies/2/reviews")
                .set("Content-Type", "application/json")
                .send({
                    ...mockReview,
                    rating: "This is a string"
                });

            expect(res.statusCode).toBe(403);
            expect(res.body.status.message).not.toBeUndefined();
        });
    });
    
    describe("Author validation", () => {
        test("status 403 if author.length is <= 0", async () => {
            const res = await request(app)
                .post("/api/movies/3/reviews")
                .set("Content-Type", "application/json")
                .send({
                    ...mockReview,
                    author: ""
                });

            expect(res.statusCode).toBe(403);
            expect(res.body.status.message).not.toBeUndefined();
        });

        test("status 400 if author is not a string", async () => {
            const res = await request(app)
                .post("/api/movies/3/reviews")
                .set("Content-Type", "application/json")
                .send({
                    ...mockReview,
                    author: 1
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.status.message).not.toBeUndefined();
        });

        test("status 403 if author contains profanity", async () => {
            const res = await request(app)
                .post("/api/movies/3/reviews")
                .set("Content-Type", "application/json")
                .send({
                    ...mockReview,
                    author: "Milda Matilda"
                });

            expect(res.statusCode).toBe(403);
            expect(res.body.status.message).not.toBeUndefined();
        });
    });

    describe("Comment validation", () => {
        test("status 403 if comment.length is > 200", async () => {
            const res = await request(app)
                .post("/api/movies/3/reviews")
                .set("Content-Type", "application/json")
                .send({
                    ...mockReview,
                    comment: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                });

            expect(res.statusCode).toBe(403);
            expect(res.body.status.message).not.toBeUndefined();
        });

        test("status 400 if comment is not a string", async () => {
            const res = await request(app)
                .post("/api/movies/3/reviews")
                .set("Content-Type", "application/json")
                .send({
                    ...mockReview,
                    comment: 1
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.status.message).not.toBeUndefined();
        });

        test("status 403 if comment contains profanity", async () => {
            const res = await request(app)
                .post("/api/movies/3/reviews")
                .set("Content-Type", "application/json")
                .send({
                    ...mockReview,
                    comment: "jösses Denna film fick mig att börja gråta."
                });

            expect(res.statusCode).toBe(403);
            expect(res.body.status.message).not.toBeUndefined();
        });
    });
});
