const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

module.exports = {
  // Function to set up an in-memory MongoDB for tests
  setupDB() {
    // Runs once before all tests
    beforeAll(async () => {
      // Create an in-memory MongoDB server
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();

      // Connect Mongoose to the in-memory server
      await mongoose.connect(uri);
    });

    // Runs once after all tests are finished
    afterAll(async () => {
      // Disconnect from the database and stop the in-memory server
      await mongoose.disconnect();
      await mongoServer.stop();
    });

    // Runs after each test
    afterEach(async () => {
      // Optional: clear all data between tests
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        await collections[key].deleteMany({});
      }
    });
  },
};
