const router = require("express").Router();
const Student = require("../model/Student");
router.route("/add").post(async (req, res) => {
    const { first_name, last_name, email, user_name, password } = req.body;
    const existstudent = await Student.findOne({user_name});
    if(existstudent){
        return res.status(400).send("username already exist use another one");
    }
    const newStudent = new Student({ first_name, last_name, email, user_name, password });

     await newStudent.save()
        .then(() => {
            res.json("Student added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error adding student", error: err.message });
        });
});

router.route("/").get(async (req, res) => {
    await Student.find()
        .then((students) => {
            res.json(students);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error fetching students", error: err.message });
        });
});

router.route("/get").get(async (req, res) => {
    let { user_name } = req.body;
    await  Student.findOne({user_name})
        .then((student) => {
            if (student) {
                res.status(200).send({ status: "User fetched", student });
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
