import {
    describe,
    expect,
    test
  } from "@jest/globals"
import { filterOutOldScreenings } from "../src/api.js";




//mock time
const fakeToday = new Date("2023-02-05T21:00:00.000Z");

//TODO make mock in json format

const items = { 
    data: [
            {
              id: 1,
              attributes: {
                start_time: "2023-02-02T21:00:00.000Z",
                room: "Stora salongen",
                createdAt: "2023-01-31T04:27:02.786Z",
                updatedAt: "2023-01-31T04:27:02.786Z",
              },
            },
            {
                id: 2,
                attributes: {
                  start_time: "2023-02-10T21:00:00.000Z",
                  room: "Stora salongen",
                  createdAt: "2023-01-31T04:27:02.786Z",
                  updatedAt: "2023-01-31T04:27:02.786Z",
                },
              },
        ]
    };


//const data = JSON.parse(items);
describe('describe', () => {

    test('test that screening times havent passed',  () => {
        const res = filterOutOldScreenings(items.data, fakeToday);
        const resLength = res.length;
        const newTime = new Date(res[0].attributes.start_time).getTime();
        const oldTime = new Date(res[1]).getTime();
        
        expect(newTime).toBeGreaterThanOrEqual(fakeToday.getTime());
        expect(resLength).toBe(1);
    });
    
});
