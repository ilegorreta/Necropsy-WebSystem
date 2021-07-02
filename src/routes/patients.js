const express = require("express");
const router = express.Router();

const db = require("../database")

router.get("/add", (req, res) => {
    res.render("patients/add")
});

router.post("/add", (req, res) => {
    res.send("Received")
});

module.exports = router;