
import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import runApp from "../src/server.js";
import { getReviews } from "../src/api.js";

const app = runApp({ getReviews });

let id = 3;
let page = 1;
let pageSize = 5;

describe("get correct response format of reviews", () => {
  
  test("get max 5 reviews per page ", async () => {
    const res = await request(app).get(
      `/api/movies/${id}/reviews?page=${page}&pageSize=${pageSize}`
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeLessThan(6);
  });

  test("pages show different reviews", async () => {
    const result1 = await getReviews(id, page, pageSize);
    page = 2;
    const result2 = await getReviews(id, page, pageSize);

    expect(result1[0].id).not.toStrictEqual(result2[0].id);
  }); 

  test("get different total of reviews when page size changes", async () => {
    const res = await request(app).get(
      "/api/movies/3/reviews?page=1&pageSize=10"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(10)
    
  });

  test("correct response format", async () => {
        const result = await getReviews(id, page, pageSize);
        expect(Array.isArray(result)).toBeTruthy();
        expect(result[0].attributes.comment).not.toBeUndefined();
        expect(result[0].attributes.rating).not.toBeUndefined();
        expect(result[0].attributes.author).not.toBeUndefined();
      }); 

  
});
