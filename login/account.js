// JUST MAKING A NUMBER TO USE LATER FOR PORT
const port = 1104;

// GETTING EXPRESS AND TURNING IT INTO APP
const express = require("express");
const fs = require("fs");
const { request } = require("http");
const { type } = require("os");
const app = express();
const cors = require("cors");

// MAKING IT HAVE THE ABILITY TO READ A JSON FILE

app.use(cors());
app.use(express.json());

// SHOWING THE FULL LIST OF USERS
app.get("/", (request, response) => {
  fs.readFile("./accounts/accounts.json", "utf-8", (error, data) => {
    if (error) {
      response.send("reading file error");
    }
    response.json(JSON.parse(data));
  });
});

// ADDING AN USER TO THE JSON LIST
app.post("/", (request, response) => {
  const body = request.body;
  fs.readFile("./accounts/accounts.json", "utf-8", (error, data) => {
    if (error) {
      response.send("reading file error");
    }

    let changingData = JSON.parse(data);

    const newElement = {
      username: body.username,
      password: body.password,
    };
    namechecker = changingData.map((x) => {
      if (x.username == newElement.username) {
        return true;
      } else return false;
    });
    if (namechecker.includes(true)) {
      response.json({ error: true });
    } else {
      changingData.push(newElement);

      fs.writeFile(
        "./accounts/accounts.json",
        JSON.stringify(changingData),
        (writeError) => {
          if (writeError) {
            response.send("error");
          } else {
            response.json(changingData);
          }
        }
      );
    }
  });
});

app.listen(port, () => {
  console.log("server aschalshu puuu port ni " + port);
});
