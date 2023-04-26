const client = require("../../db/client");
const app = require("../../app");
const request = require("supertest");
const { rebuildDB, seedDB } = require("../../db/seedData");
const { response } = require("../../app");

// Write tests inside of this function.
const test = async () => {
  console.log("--- RUNNING api/carts TESTS ---");
  try {
    console.log("Testing get to /:userId/current");
    let goodResponse = await request(app).get("/api/carts/2/current");

    let badResponse = await request(app).get("/api/carts/1/current");
    if (
      goodResponse.body.success &&
      badResponse.body.error === "NoCurrentCart"
    ) {
      console.log("passed");
    } else {
      console.log("FAILED");
    }

    console.log("Testing get to /:userId/previous");
    goodResponse = await request(app).get("/api/carts/1/previous");

    badResponse = await request(app).get("/api/carts/2/previous");
    if (
      goodResponse.body.success &&
      badResponse.body.error === "NoPreviousCarts"
    ) {
      console.log("passed");
    } else {
      console.log("FAILED");
    }

    console.log("Testing patch to /:cartId");
    response = await request(app).get("/api/carts/:cartId");
    if (response.body.success && response.body.carts.userId === 1) {
      console.log("passed");
    } else {
      console.log("FAILED");
    }
  } catch (err) {
    console.log("Error runnning tests!", err);
  }
  console.log("--- TESTS FINISHED! ---");
};

rebuildDB()
  .then(seedDB)
  .then(test)
  .catch(console.error)
  .finally(() => client.end());
