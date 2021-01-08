  
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const EventModel = require("./eventSchema");
const logger = require("./logger")

var port = 8000;

const app = express();

// Connect to MongoDB using mongoose
mongoose.connect('mongodb+srv://admin:<password>@cluster0.saktb.mongodb.net/eventLog?retryWrites=true&w=majority',
 { useNewUrlParser: true, connectTimeoutMS: 1000})
  .then(()=> console.log("Database Connected"))
  .catch(error => console.log(error));

// Use body parser
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, event, timestamp");
  next();
});

// create API
app.post("/logEvent", (req, res, next) => {
  const event = req.headers.event;
  const timestamp = req.headers.timestamp;
  logger.info(`event --> ${event} ${timestamp}`)
  const eventLog = new EventModel({ event: event, timestamp: timestamp});
  eventLog.save((err) => {
      if(err) next(err);
  })
  res.sendStatus(200);
})

// Error handling middleware
app.use((err, req, res, next) => {
	console.log(err);
	res.status(422).send({ error: err.message });
});

// Listen on port
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});