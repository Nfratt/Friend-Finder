//require//
var express = require("express");
var path = require("path");

//Express App Setup
var app = express();
var PORT = process.env.PORT || 3000;

//Express app 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Data
var friendlist = [
  {
    name: 'Nick',
    photo: '',
    scores: [
      '1',
      '4',
      '5',
      '3',
      '1',
      '1',
      '1',
      '2',
      '1',
      '3'
    ]
  }
]


//htmlRoutes
// homepage
app.get('/', function (req, res) {

  res.sendFile(path.join(__dirname, '/public/home.html'));
});

//Survey 
app.get('/survey', function (req, res) {

  res.sendFile(path.join(__dirname, '/public/survey.html'));
});

//apis 
//Display all friendlist
app.get('/api/friendlist', function (req, res) {
  return res.json(friendlist);
});

// new friendlist
app.post("/api/friendlist", function (req, res) {
  var newFriend = req.body;
  console.log(newFriend);
  friendlist.push(newFriend);

  //Compare scores
  let match;
  let maxscore = 99;
// had to do a for loop inside a for loop(had to look this up)
  for (var i = 0; i < friendlist.length - 1; i++) {
    var score = 0;
    for (var j = 0; j < 10; j++) {
      var partialsum = Math.abs(friendlist[i].scores[j] - newFriend.scores[j]);
      score += partialsum;
    }
    if (score < maxscore) {
      maxscore = score;
      match = i;
    }
  }
  res.json(friendlist[match]);
});


//Start the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});