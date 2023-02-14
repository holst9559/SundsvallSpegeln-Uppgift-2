import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import runApp from "../src/server.js";
import { getReviews } from "../src/api.js";

const app = runApp({ getReviews });

const mockData1 = {
  data: [
    {
      id: 124,
      attributes: {
        comment: "hejsan",
        rating: 3,
        author: "review namn",
        verified: true,
        createdAt: "2023-02-10T08:40:39.581Z",
        updatedAt: "2023-02-10T08:40:39.581Z",
      },
    },
    {
      id: 74,
      attributes: {
        comment: "För lite prutt humor",
        rating: 2,
        author: "Ankan",
        verified: false,
        createdAt: "2023-02-07T10:40:40.546Z",
        updatedAt: "2023-02-07T10:40:40.546Z",
      },
    },
    {
      id: 139,
      attributes: {
        comment: "aaaaaaaaa",
        rating: 2,
        author: "aaaaa aaaaaa",
        verified: true,
        createdAt: "2023-02-10T08:43:33.513Z",
        updatedAt: "2023-02-10T08:43:33.513Z",
      },
    },
    {
      id: 110,
      attributes: {
        comment: "cxv",
        rating: 2,
        author: "dfg sdfg",
        verified: true,
        createdAt: "2023-02-10T08:32:49.728Z",
        updatedAt: "2023-02-10T08:32:49.728Z",
      },
    },
    {
      id: 171,
      attributes: {
        comment: "Very nice movie",
        rating: 4,
        author: null,
        verified: false,
        createdAt: "2023-02-11T17:43:33.889Z",
        updatedAt: "2023-02-11T17:43:33.889Z",
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 5,
      pageCount: 14,
      total: 68,
    },
  },
};

const mockData2 = {
  data: [
    {
      id: 19,
      attributes: {
        comment: "Jättebra film!",
        rating: 0,
        author: "Richard",
        verified: null,
        createdAt: "2023-02-02T12:24:12.887Z",
        updatedAt: "2023-02-02T12:24:12.887Z",
      },
    },
    {
      id: 28,
      attributes: {
        comment: "Review utan namn",
        rating: 0,
        author: "Richard",
        verified: null,
        createdAt: "2023-02-02T13:25:22.837Z",
        updatedAt: "2023-02-02T13:25:22.837Z",
      },
    },
    {
      id: 121,
      attributes: {
        comment: "dfgdfg",
        rating: 1,
        author: "dfg dfg",
        verified: true,
        createdAt: "2023-02-10T08:38:48.428Z",
        updatedAt: "2023-02-10T08:38:48.428Z",
      },
    },
    {
      id: 189,
      attributes: {
        comment: "Great",
        rating: 5,
        author: "Henry",
        verified: false,
        createdAt: "2023-02-11T20:01:33.801Z",
        updatedAt: "2023-02-11T20:01:33.801Z",
      },
    },
    {
      id: 98,
      attributes: {
        comment: "Not bad. Would watch it again.",
        rating: 4,
        author: "Stefan Lindgren",
        verified: false,
        createdAt: "2023-02-08T22:32:58.782Z",
        updatedAt: "2023-02-08T22:32:58.782Z",
      },
    },
  ],
  meta: {
    pagination: {
      page: 2,
      pageSize: 5,
      pageCount: 14,
      total: 68,
    },
  },
};

const mockId = 2;
const page = mockData1.meta.pagination.page;
const pageSize = mockData1.meta.pagination.pageSize;

const page2 = mockData2.meta.pagination.page;
const pageSize2 = mockData2.meta.pagination.pageSize;

describe("get max reviews", () => {
  test("get max 5 reviews per page ", async () => {
    const result = await getReviews(mockId, page, pageSize);
    console.log('result',result, page, pageSize)

    expect(result.length).toBeLessThanOrEqual(5);
    return result;
  });

  test("pages show different reviews", async () => {
    const result1 = await getReviews(mockId, page, pageSize);

    const result2 = await getReviews(mockId, page2, pageSize2);

    expect(result1[0].id).not.toStrictEqual(result2[0].id);
  });

  /* test("get different total of reviews when page size changes", async () => {
    const res = await request(app).get(
      "/api/movies/3/reviews?page=1&pageSize=10"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(10)
    
  }); */

  test("correct response format", async () => {
    const result = await getReviews(mockId, page, pageSize);
    expect(Array.isArray(result)).toBeTruthy();
    expect(result[0].attributes.comment).not.toBeUndefined();
    expect(result[0].attributes.rating).not.toBeUndefined();
    expect(result[0].attributes.author).not.toBeUndefined();
  });
});
