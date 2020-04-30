const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

app.use(cors(['*']));
app.use(bodyParser.json());

// Error Handler
app.use((req, res, next, err) => {
  console.log(err.stack);
  res.status(500).send("Something Broke");
})

app.use('/', require('./routes'));

app.listen(PORT, () => {
  console.log("Server start on port: " + PORT);
})