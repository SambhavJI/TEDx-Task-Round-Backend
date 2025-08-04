const express = require("express");
const questions = require("./questions");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); 

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/questions", (req, res) => {
  res.render("index", { questions });
});

app.post("/submit", (req, res) => {
  const submitted = req.body; 
  let score = 0;

  questions.forEach((q, i) => {
    if (submitted[i] === q.answer) {
      score++;
    }
  });

  res.render("result", { score, total: questions.length });
});

app.get("/questions/random", (req, res) => {
  const random = questions[Math.floor(Math.random() * questions.length)];
  res.render("index", { questions: [random] });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
