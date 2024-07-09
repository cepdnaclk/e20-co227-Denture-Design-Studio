const router = require("express").Router();
const Admin = require("../model/Admin");

router.route("/add").post(async (req, res) => {
    const { first_name, last_name, email, user_name, password } = req.body;
    const existadmin = await Admin.findOne({user_name});
    if(existadmin){
        return res.status(400).send("username already exist use another one");
    }
    const newAdmin = new Admin({ first_name, last_name, email, user_name, password });

     await newAdmin.save()
        .then(() => {
            res.json("admin added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error adding admin", error: err.message });
        });
});

router.route("/").get(async (req, res) => {
    await Admin.find()
        .then((admin) => {
            res.json(admin);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error fetching adminss", error: err.message });
        });
});

router.post("/get", async (req, res) => {
    const { user_name } = req.body;
    try {
      const admin = await Admin.findOne({ user_name });
      if (admin) {
        res.status(200).send({ status: "User fetched", admin });
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
      const admin = await Admin.findOne({user_name});

      if(admin){
        await admin.deleteOne({user_name});    
        return res.status(200).send({status:'user delete',admin});
  
      }else{
        res.status(404).send({ status: "User not found" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ status: "Error delete user", error: err.message });
    }
  });
module.exports = router;
