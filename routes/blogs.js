var express = require("express");
var router = express.Router();

const { blogsDB } = require("../mongo");

router.get("/hello-blogs", function (req, res, next) {
  res.json({ message: "hello from express" });
});

router.get("/all-blogs", async function (req, res, next) {
  try {
    const collection = await blogsDB().collection("posts");
    const posts = await collection.find({}).toArray();
    res.json(posts);
  } catch (e) {
    res.status(500).send("Error fetching posts.");
  }
});

module.exports = router;
