let express = require("express");
let users = require("./MOCK_DATA (3).json");
let fs = require("fs");
let app = express();
app.use(express.urlencoded({ extended: false }));
app.get("/users", (req, res) => {
  let htmlRend = `
  <ul>
  ${users
    .map((user) => {
      return `
        <li>${user.job_title}</li>
      `;
    })
    .join("")}
  </ul>
  `;
  res.send(htmlRend);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});
app.post("/api/users", (req, res) => {
  //create the new user
  let body = req.body;
  console.log("Body");
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA (3).json", JSON.stringify(users), (err) => {
    if (err) {
      return err;
    } else {
      return res.json({ status: "success", id: users.length });
    }
  });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    let id = Number(req.params.id);
    console.log(typeof id);
    let user = users.find((e) => e.id == id);
    res.send(user);
  })
  .patch((req, res) => {
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "pending" });
  });

// app.get("/api/users/:id", (req, res) => {

// });

// app.patch("/api/users/:id", (req, res) => {

// });
// app.delete("/api/users/:id", (req, res) => {

// });

app.listen(8023, () => {
  console.log("server successfully started");
});
