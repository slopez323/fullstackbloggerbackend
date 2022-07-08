var express = require("express");
var router = express.Router();

const { blogsDB } = require("../mongo");

router.get("/hello-blogs", function (req, res, next) {
  res.json({ message: "hello from express" });
});

router.get("/all-blogs", async function (req, res, next) {
  try {
    const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 0;
    const skip =
      Number(req.query.limit) * (Number(req.query.page) - 1) >= 0
        ? Number(req.query.limit) * (Number(req.query.page) - 1)
        : 0;
    const sortField = req.query.sortField;
    const sortOrder = req.query.sortOrder;
    const filterField = req.query.filterField;
    const filterValue = req.query.filterValue;

    const filter = filterField ? { [filterField]: filterValue } : {};
    const sort = sortField ? { [sortField]: sortOrder } : {};

    const collection = await blogsDB().collection("posts");
    const posts = await collection
      .find(filter)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .toArray();

    res.json(posts);
  } catch (e) {
    res.status(500).send("Error fetching posts.");
  }
});

module.exports = router;
