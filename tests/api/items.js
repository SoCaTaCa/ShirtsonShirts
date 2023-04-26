const client = require("../../db/client");
const app = require("../../app");
const request = require("supertest");
const { rebuildDB, seedDB } = require("../../db/seedData");

// Write tests inside of this function.
const test = async () => {
  console.log("--- RUNNING api/items TESTS ---");
  try {
    let response = null;

    const testGetApiItems = async () => {
      console.log("testing get /api/items");
      response = await request(app).get("/api/items");
      console.log("RESPONSE", response);
      if (typeof response.body === "object" && response.body.length === 5) {
        console.log("passed");
      } else {
        console.log("FAILED");
      }
    };
    const testPostApiItems = async () => {
      console.log("testing post /api/items");
      response = await request(app).post("/api/items").send({
        name: "newitem",
        price: 0,
        size: "XXXXL",
        categoryId: 1,
        description: "shirt",
      });
      console.log("RESPONSE", response.body);
      if (
        typeof response.body === "object" &&
        response.body.name === "newitem"
      ) {
        console.log("passed");
      } else {
        console.log("FAILED");
      }
    };
    const testPatchApiItems = async () => {
      console.log("testing patch /api/items");
      response = await request(app).patch("/api/items/1").send({
        name: "newitem2",
        price: 0,
        size: "XXXXL",
        categoryId: 1,
        description: "shirt",
      });
      console.log("RESPONSE", response.body);
      if (
        typeof response.body === "object" &&
        response.body.name === "newitem2"
      ) {
        console.log("passed");
      } else {
        console.log("FAILED");
      }
    };
    const testGetApiItemsItemid = async () => {
      console.log("testing get /api/items/:itemid");
      response = await request(app).get("/api/items/1");
      console.log("RESPONSE", response.body);
      if (typeof response.body === "object" && response.body.id === 1) {
        console.log("passed");
      } else {
        console.log("FAILED");
      }
    };
    const testDeleteApiItemsItemid = async () => {
      console.log("testing delete /api/items/:itemid");
      response = await request(app).delete("/api/items/1");
      console.log("RESPONSE", response.body);
      if (typeof response.body === "object" && response.body.id === null) {
        console.log("passed");
      } else {
        console.log("FAILED");
      }
    };
    const testGetApiItemsCategory = async () => {
      console.log("testing get /api/items/category/:categoryid");
      response = await request(app).get("/api/items/category/1");
      console.log("RESPONSE", response.body);
      if (typeof response.body === "object" && response.body.category) {
        console.log("passed");
      } else {
        console.log("FAILED");
      }
    };
    const testGetApiItemsName = async () => {
      console.log("testing get /api/items/:itemname");
      response = await request(app).get("/api/items/1");
      console.log("RESPONSE", response.body);
      if (typeof response.body === "object" && response.body.name) {
        console.log("passed");
      } else {
        console.log("FAILED");
      }
    };

    await testGetApiItems();
    await testPostApiItems();
    // await testPatchApiItems();
    await testGetApiItemsItemid();
    // await testDeleteApiItemsItemid();
    await testGetApiItemsCategory();
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
