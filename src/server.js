const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
//mongodb+srv://ram:ram123@project1.m3pbh.mongodb.net/prodb?retryWrites=true&w=majority
mongoose.connect("mongodb://localhost/newcheck", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//schema

const sch = {
  name: String,
  email: String,
  password: String,
};
const mod = mongoose.model("mod", sch);

//SIGN IN
app.post("/check", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("safaffa");
  console.log(req.body);
  const extr = await mod.findOne({ email: email });
  //res.send(extr);
  //console.log(extr);
  if (extr && extr.password === password) {
    res.send("1");
  } else {
    res.send("0");
  }
});

// push data
app.post("/postdata", async (req, res) => {
  console.log(req.body);
  try {
    let emcheck = req.body.email;
    const ext = await mod.findOne({ email: emcheck });
    if (ext) {
      res.send("0");
    } else {
      const newmod = new mod({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const a = await newmod.save();

      res.send("1");
    }
  } catch (error) {
    console.log(error);
  }
});

// //TASK TABLE

// const task = {
//   taskname: String,
//   email: String,
//   taskduration: String,
//   projectname: String,
// };
// const taskmod = mongoose.model("TASK", task);

// app.post("/postask", async (req, res) => {
//   console.log(req.body);
//   try {
//     const tasks = new taskmod({
//       taskname: req.body.taskname,
//       email: req.body.email,
//       taskduration: req.body.taskduration,
//       projectname: req.body.projectname,
//       //emp id pro id
//     });
//     const t = await tasks.save();
//     res.json(t);
//   } catch (error) {
//     console.log(error);
//   }
// });

//UPCOMING PROJECTS PAGE

const sch2 = {
  projectname: String,
  status: Boolean,
};
const schema = mongoose.model("mod2", sch2, "COLL");

//post
app.post("/postproject", async (req, res) => {
  console.log("AM IN");
  const Schem = new schema({
    projectname: req.body.projectname,
    status: req.body.status,
  });
  const val = await Schem.save();
  res.json(val);
});

///FETCH
app.get("/getfull", (req, res) => {
  schema.find((err, val) => {
    if (err) {
      console.log(err);
    }
    res.json(val);
  });
});

//DELETE

app.delete("/del/:id", (req, res) => {
  console.log("AM IN DEL");
  schema.findByIdAndDelete(req.params.id, (err, val) => {
    if (err) {
      console.log(err);
    }
    res.json(val);
  });
});

app.listen(4000, () => {
  console.log("on server 4000");
});
