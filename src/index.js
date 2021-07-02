const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars")
const path = require("path");

//Initializations
const app = express();

//Settings
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars")
}))
app.set("view engine", ".hbs");

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false})); //To stablish that we are not going to accept any media data on text fields, only strings
app.use(express.json()); //To accept jsons on our app

//Global Variables
app.use((req, res, next) => {
    next();
})

//Routes
app.use(require("./routes/index.js"));
app.use(require("./routes/auth"));
app.use("/patients", require("./routes/patients"));

//Public
app.use(express.static(path.join(__dirname, "public")));

//Starting the server
app.listen(app.get("port"), () => {
    console.log("Server on port ", app.get("port"));
});