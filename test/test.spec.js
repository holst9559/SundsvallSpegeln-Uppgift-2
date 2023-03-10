import request from "supertest";
import runApp from "../src/server.js";
import { getMovie, getMovies } from "../src/api.js";

const app = runApp({ getMovie, getMovies });
const movies = await getMovies();

test("encanto test", async () => {
    const response = await request(app)
        .get("/movies/2")
        .expect("Content-type", "text/html; charset=utf-8")
        .expect(200);
    expect(response.text).toMatch(movies[0].attributes.title);
    expect(response.text.includes("Encanto")).toBeTruthy();
});

test("isle of dogs test", async () => {
    const response = await request(app)
        .get("/movies/1")
        .expect("Content-type", "text/html; charset=utf-8")
        .expect(200);
    expect(response.text).toMatch(movies[1].attributes.title);
    expect(response.text.includes("Isle of dogs")).toBeTruthy();
});

test("shawshank test", async () => {
    const response = await request(app)
        .get("/movies/3")
        .expect("Content-type", "text/html; charset=utf-8")
        .expect(200);
    expect(response.text).toMatch(movies[3].attributes.title);
    expect(response.text.includes("The Shawshank Redemption")).toBeTruthy();
});

test("totoro test", async () => {
    const response = await request(app)
        .get("/movies/4")
        .expect("Content-type", "text/html; charset=utf-8")
        .expect(200)        
    expect(response.text).toMatch(movies[2].attributes.title);
    expect(response.text.includes("Min granne Totoro")).toBeTruthy();
});

test("404 test", async () => {
    const response = await request(app)
        .get("/movies/42")
        .expect(404);
    expect(response.text.includes("404 NOT FOUND"));
})