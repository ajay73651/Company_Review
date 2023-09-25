const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const Review = require("./models/review");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/add-review", async (req, res) => {
  try {
    const { company_name, pros, cons, rating } = req.body;

    await Review.create({
      company_name: company_name,
      pros: pros,
      cons: cons,
      ratings: rating,
    });

    return res.status(201).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create attendance" });
  }
});

app.get("/api/get-review", async (req, res) => {
  try {
    const { companyName } = req.query;
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Company Name parameter is required" });
    }

    const review = await Review.findAll({
      where: {
        company_name: companyName,
      },
    });

    if (review) {
      const { company_name, pros, cons, ratings } = review;
      return res.json({
        review,
        message: "success",
      });
    } else {
      return res.json({ message: "No data found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve review" });
  }
});

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
