const client = require("../../db/client");
const app = require("../../app");
const request = require("supertest");
const { rebuildDB, seedDB } = require("../../db/seedData");

// Write tests inside of this function.
const test = async () => {
  console.log("--- RUNNING api/carts TESTS ---");
  try {
    loginResponse = await request(app)
      .post('/api/users/login')
      .send({
        username: 'tredding',
        password: 'slushies89'
      });
    const token = loginResponse.body.token;

    console.log("Testing get to /:userId/current");
    let goodResponse = await request(app).get("/api/carts/2/current").set('Authorization', `Bearer ${token}`);

    let badResponse = await request(app).get("/api/carts/1/current").set('Authorization', `Bearer ${token}`);
    if (
      goodResponse.body.success &&
      badResponse.body.error === "NoCurrentCart"
    ) {
      console.log("passed");
    } else {
      console.log("FAILED");
    }

    console.log("Testing get to /:userId/previous");
    goodResponse = await request(app).get("/api/carts/1/previous").set('Authorization', `Bearer ${token}`);

    badResponse = await request(app).get("/api/carts/2/previous").set('Authorization', `Bearer ${token}`);
    if (
      goodResponse.body.success &&
      badResponse.body.error === "NoPreviousCarts"
    ) {
      console.log("passed");
    } else {
      console.log("FAILED");
    }

    console.log("Testing patch to /:cartId");
    response = await request(app).patch("/api/carts/2").set('Authorization', `Bearer ${token}`).send({ userId: loginResponse.body.user.id});
    if (response.body.success && response.body.cart.isPurchased) {
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
