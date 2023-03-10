import request from "supertest"; 
import runApp from "../src/server.js";
import { getMovie } from "../src/api.js";

//Mocks
const mockReview = {
    author: "John Doe",
    comment: "This is a test comment",
    rating: 1,
};

async function postReview(review, verified = false) { //Posting review to CMS API is not necessary in these tests, so it only returns true
    return true;
};

const app = runApp({ //Inject required api functions
    getMovie,
    postReview,
});


describe("POST /api/movies/:id/reviews", () => {
    test("status 200 if review is valid", async () => {
        const res = await request(app)
            .post("/api/movies/1/reviews")
            .set("Content-Type", "application/json")
            .send({ ...mockReview });

        expect(res.statusCode).toBe(200);
        expect(res.body.status.message).not.toBeUndefined();
    });

    describe("Rating validation", () => {
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
                    comment: "j??sses Denna film fick mig att b??rja gr??ta."
                });

            expect(res.statusCode).toBe(403);
            expect(res.body.status.message).not.toBeUndefined();
        });
    });
});





