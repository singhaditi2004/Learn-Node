const express = require("express");

const app = express();
app.use(express.json);
const courses = [
  { id: 1, name: "JS" },
  { id: 2, name: "Java" },
  { id: 3, name: "Python" },
  { id: 4, name: "C++" },
  { id: 5, name: "C#" },
];
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/contact", (res, req) => {
  res.send("Contact page");
});

app.get("/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(courses);
});
app.get("/courses/:id", (req, res) => {
  let course = courses.find((cour) => cour.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Course Not found");
  }
  res.send(course);
});
app.put("/courses/:name", (req, res) => {
  let course = courses.find((cour) => cour.name === req.params.name);
  if (!course) {
    res.status(404).send("Course Not found");
  }
  course.name = req.body.name;
  res.send(course);
});
app.delete("/courses/:coursename", (req, res) => {
  let UpdatedCourses = courses.filter(
    (course) => course.name !== req.params.coursename
  );
  courses = UpdatedCourses;
  res.send(courses);
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
