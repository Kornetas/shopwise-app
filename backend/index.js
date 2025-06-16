const app = require("./server");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Connect to MongoDB only when starting server normally
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
