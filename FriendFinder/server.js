//require//
var express = require("express");
var path = require("path");

//Express App Setup//
var app = express();
var PORT = process.env.PORT || 3000;

//Express App Data Parsing//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Data//
var friends = [
  {
    name: 'Nick',
    photo: '',
    scores: [
      '1',
      '1',
      '1',
      '1',
      '1',
      '1',
      '1',
      '1',
      '1',
      '1'
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
//Display all friends
app.get('/api/friends', function (req, res) {
  return res.json(friends);
});

// new friends
app.post("/api/friends", function (req, res) {
  var newFriend = req.body;
  console.log(newFriend);
  friends.push(newFriend);

  //Compare scores
  let match;
  let maxscore = 999;
// had to do a for loop inside a for loop(had to look this up)
  for (var i = 0; i < friends.length - 1; i++) {
    var score = 0;
    for (var j = 0; j < 10; j++) {
      var partialsum = Math.abs(friends[i].scores[j] - newFriend.scores[j]);
      score += partialsum;
    }
    if (score < maxscore) {
      maxscore = score;
      match = i;
    }
  }
  res.json(friends[match]);
});


//Start the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});