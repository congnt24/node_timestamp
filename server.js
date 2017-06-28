// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/:date", function (request, response) {
  var date = request.params.date
  
  var unixdate = Number(date)
  
  var resDate
  
  var res = {'unixtime': 0, 'natural': ''}
  
  if (isNaN(unixdate)){
    resDate = new Date(date)
    res['unixtime'] = resDate.getTime()
    res['natural'] = toNatural(resDate)
  } else {
    resDate = new Date(unixdate)
    res['unixtime'] = resDate.getTime()
    res['natural'] = toNatural(resDate)
  }
  
  response.end(JSON.stringify(res))
  
  // response.sendFile(__dirname + '/views/index.html');
});

function toNatural(date){
  return date.getMonthText() +" "+date.getDate()+", "+date.getFullYear()
}

//extension
Date.prototype.getMonthText = function() {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[this.getMonth()];
}

// app.get("/dreams", function (request, response) {
//   response.send(dreams);
// });

// // could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
// app.post("/dreams", function (request, response) {
//   dreams.push(request.query.dream);
//   response.sendStatus(200);
// });

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
