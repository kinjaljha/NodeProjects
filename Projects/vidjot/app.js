/* eslint-disable no-undef */
/* eslint-disable no-console */
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();

//map global promise . get rid of warning
mongoose.Promise = global.Promise;

//connect to mongoose
mongoose
    .connect("mongodb://localhost/vidjot-dev")
    .then(() => console.log("mongo db connected"))
    .catch(err => console.log(err));

//load idea model
require("./models/Idea");
const Idea = mongoose.model("ideas");

//handlebar middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use((request, response, next) => {
    console.log(Date.now());
    next();
});

app.get("/", (request, response) => {
    const title = "Welcome";
    response.render("index", {
        title: title
    });
});
//about route
app.get("/about", (request, response) => {
    response.render("about");
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server started on ports ${port}`);
});
