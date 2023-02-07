import app from "../src/server.js";
import request from "supertest"; 
import FormData from "form-data";

//Mocks
const review = {
    "author": "asdasdasdasdasdsd",
    "comment": "asdasdasdasdasd",
    "rating": "1",
};


describe("POST /api/movies/id/reviews", () => {
    test("Rating is between 0-5", async () => {
        const res = await request(app)
            .post("/api/movies/2/reviews")
            .set("form")
            .send(review);  
        
        expect(res.statusCode).toBe(200);
        expect(res.headers["Content-Type"]).toBe("application/x-www-form-urlencoded");
        //expect(res.contentType).toBe("application/x-www-form-urlencoded");
        //expect(res.body.status.message).toBe("Lyckad Validation");
    });
});
