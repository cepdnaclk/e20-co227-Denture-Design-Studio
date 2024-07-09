const router = require("express").Router();
const Student = require("../model/Student");

router.post("/add", async (req, res) => {
  const { first_name, last_name, email, user_name, password } = req.body;
  const existstudent = await Student.findOne({ user_name });
  if (existstudent) {
    return res.status(400).send("Username already exists, use another one");
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

router.get("/", async (req, res) => {
  await Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error fetching students", error: err.message });
    });
});

router.post("/get", async (req, res) => {
  const { user_name } = req.body;
  try {
    const student = await Student.findOne({ user_name });
    student.lastAccessed = new Date();
    await student.save();
    if (student) {
      res.status(200).send({ status: "User fetched", student });
    } else {
      res.status(404).send({ status: "User not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error fetching user", error: err.message });
  }
});



router.delete('/delete',async (req,res)=>{
  try {
    const {user_name} = req.body;
    const student = await Student.findOne({user_name});

    if(student){
      await student.deleteOne({user_name});    
      return res.status(200).send({status:'user delete',student});

    }else{
      res.status(404).send({ status: "User not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error delete user", error: err.message });
  }
});

router.put('/edit',async (req,res)=>{
  try {
    
  } catch (error) {
    
  }
});


module.exports = router;
