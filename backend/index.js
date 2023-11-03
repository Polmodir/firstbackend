// JUST MAKING A NUMBER TO USE LATER FOR PORT
const port = 2007;

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

// SHOWING THE FULL DATA
app.get("/", (request, response) => {
  fs.readFile("./data/data.json", "utf-8", (error, data) => {
    if (error) {
      response.send("reading file error");
    }
    response.json(JSON.parse(data));
  });
});

// ADDING FILE TO THE DATA JSON
app.post("/", (request, response) => {
  const body = request.body;
  fs.readFile("./data/data.json", "utf-8", (error, data) => {
    let changingData = JSON.parse(data);
    if (error) {
      response.send("reading file error");
    }

    const newElement = {
      id: changingData.length + 1,
      firstName: body.firstName,
      lastName: body.lastName,
      gender: body.gender,
      birthday: body.birthday,
      studying: body.studying,
    };

    changingData.push(newElement);

    fs.writeFile(
      "./data/data.json",
      JSON.stringify(changingData),
      (writeError) => {
        if (writeError) {
          response.send("error");
        } else {
          response.json(changingData);
        }
      }
    );
  });
});

// DELETING BY ID
app.delete("/:id", (request, response) => {
  const { id } = request.params;
  fs.readFile("./data/data.json", "utf-8", (error, data) => {
    if (error) {
      response.send("reading file error");
    }
    let changingData = JSON.parse(data);
    let changedData = changingData.filter((x) => x.id !== Number(id));
    changedData.map((x, idx) => {
      x.id = idx + 1;
    });
    fs.writeFile(
      "./data/data.json",
      JSON.stringify(changedData),
      (writeError) => {
        if (writeError) {
          response.send("error");
        } else {
          response.json(changedData);
        }
      }
    );
  });
});

// CHANGING VALUES OF THE KEYS IN THE JSON
app.patch("/:id", (request, response) => {
  const body = request.body;
  const { id } = request.params;
  fs.readFile("./data/data.json", "utf-8", (error, data) => {
    if (error) {
      response.send("reading file error");
    }
    let changingData = JSON.parse(data);
    let jsonKeys = Object.keys(changingData[id - 1]);
    Object.keys(body).map((x) => {
      jsonKeys.map((y) => {
        if (x == y) {
          changingData[id - 1][y] = body[x];
        }
      });
    });
    fs.writeFile(
      "./data/data.json",
      JSON.stringify(changingData),
      (writeError) => {
        if (writeError) {
          response.send("error");
        } else {
          response.json(changingData);
        }
      }
    );
  });
});

app.listen(port, () => {
  console.log("server aschalshu puuu port ni " + port);
});
