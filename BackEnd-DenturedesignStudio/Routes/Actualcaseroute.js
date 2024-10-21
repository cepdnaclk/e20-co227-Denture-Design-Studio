const router = require("express").Router();
const ActualCase = require("../model/Actualcases"); // Import your ActualCase model

// Add new ActualCase
router.post("/add", async (req, res) => {
  const { AnswerUrl, ProblemUrl, description, supportMaterialUrl } = req.body;

  // Check if a similar document already exists
  const existActualCase = await ActualCase.findOne({ AnswerUrl, ProblemUrl });
  if (existActualCase) {
    return res
      .status(400)
      .send("Case already exists, use another combination.");
  }

  // Create a new ActualCase
  const newActualCase = new ActualCase({
    AnswerUrl,
    ProblemUrl,
    description,
    supportMaterialUrl,
  });

  await newActualCase
    .save()
    .then(() => {
      res
        .status(200)
        .send({ status: "ActualCase added successfully", newActualCase });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error adding ActualCase", error: err.message });
    });
});

// Get random ActualCase
router.get("/random", async (req, res) => {
  const numCases = parseInt(req.query.numCases, 10) || 1; // Get the number of cases to return, default to 1

  try {
    // Use $sample to get random documents
    const randomCases = await ActualCase.aggregate([
      { $sample: { size: numCases } },
    ]);
    res.status(200).json(randomCases[0]);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error fetching random ActualCase", error: err.message });
  }
});

module.exports = router;
