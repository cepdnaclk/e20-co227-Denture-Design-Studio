const router = require("express").Router();
const Assessor = require("../model/Assessor");

router.route("/add").post(async (req, res) => {
    const { first_name, last_name, email, user_name, password } = req.body;
    const existassessor = await Assessor.findOne({user_name});
    if(existassessor){
        return res.status(400).send("username already exist use another one");
    }
    const newAssessor = new Assessor({ first_name, last_name, email, user_name, password });

     await newAssessor.save()
        .then(() => {
            res.json("assessor added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error adding assessor", error: err.message });
        });
});

router.route("/").get(async (req, res) => {
    await Assessor.find()
        .then((assessor) => {
            res.json(assessor);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error fetching assessors", error: err.message });
        });
});

router.route("/get/:id").get(async (req, res) => {
    let { id } = req.params;
     await Assessor.findById(id)
        .then((assessor) => {
            if (assessor) {
                res.status(200).send({ status: "User fetched", assessor });
            } else {
                res.status(404).send({ status: "User not found" });
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error fetching user", error: err.message });
        });
});

module.exports = router;
