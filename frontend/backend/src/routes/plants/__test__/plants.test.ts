import { Plant } from "../../../../src/models/plant";
import request from "supertest";
import { app } from "../../../app";
import { plantMockData } from "../../../test/mock-data/plant";

// Since we are running test in memory database
// We are not creating any resource therefore in memory
// Create some resource we will not be able to find

it("throw 400 not found error, if not plant is found by the given id ", async () => {
  await request(app).get("/api/plant/345343535").expect(400);
});

it("fetch the plants with different properties ", async () => {
  const plant = new Plant(plantMockData);
  await plant.save();
  await request(app).get(`/api/plant/${plant.id}`).expect(200);
});
