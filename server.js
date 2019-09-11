const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const app = express();

require("dotenv").config();

// //DB config
// const db = require("./config/keys").mongoURI;

// //db connection
// const uri = process.env.mongoURI2;
// mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true });
// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db connection 2
// const db = process.env.mongoURI;
// mongoose
//   .connect(db, { useNewUrlParser: true, useCreateIndex: true })
//   .then(() => console.log("mongoDB connected"))
//   .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

// app.get("/", (req, res) => res.send("hello Joe"));

//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server has started on port ${port}`));
