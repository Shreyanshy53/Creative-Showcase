const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Creative Showcase API Running");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.use("/auth", require("./routes/auth.routes"));
app.use("/test", require("./routes/test.routes"));
app.use("/api", require("./routes/protected.routes"));
app.use("/images", require("./routes/image.routes"));
app.use("/profile", require("./routes/profile.routes"));
app.use("/feed", require("./routes/feed.routes"));

