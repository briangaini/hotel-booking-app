const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

// ===== MIDDLEWARE =====
app.use(express.json());
app.use(cors());

// Global request logger (proves every request reaches this process)
app.use((req, res, next) => {
  console.log(`[App Log] ${req.method} ${req.originalUrl}`);
  next();
});

// ===== ROOT ROUTE =====
app.get('/', (req, res) => {
  res.send('Hotels Rooftop Server is running...!');
});

// ===== ROUTES =====
const blogRoutes = require("./src/routes/blog.route");
const commentRoutes = require("./src/routes/comment.route");
const userRoutes = require("./src/routes/auth.user.route")

app.use("/api/auth", userRoutes)
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);


// ===== STARTUP =====
async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB or starting server:", err);
  }
}

// Avoid double “connected successfully” logs; keep a single startup flow:
main().catch(err => console.error(err));