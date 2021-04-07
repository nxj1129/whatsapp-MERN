const express = require("express")();
const mongoose = require("mongoose");
const messages = require("./dbMessages.js");

//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware for parsing json
app.use(express.json());

const connection_url =
  "mongodb+srv://Zyzz:wSVMGZpkSMaKn0Ok@whatsscluster.u2obn.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
  // eslint-disable-next-line array-callback-return
  messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//listen
app.listen(port, () => console.log(`listening on port ${port}`));
