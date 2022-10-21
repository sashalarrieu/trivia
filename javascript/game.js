exports = typeof window !== "undefined" && window !== null ? window : global;

exports.Game = function() {
  var players          = new Array();
  var places           = new Array(6);
  var purses           = new Array(6);
  var inPenaltyBox     = new Array(6);

  var popQuestions     = new Array();
  var scienceQuestions = new Array();
  var sportsQuestions  = new Array();
  var rockQuestions    = new Array();

  var currentPlayer    = 0;
  var isGettingOutOfPenaltyBox = false;
  var categories = ["Pop", "Science", "Sports", "Rock"];
  var nextCategory = "";

  var didPlayerWin = function(){
    return !(purses[currentPlayer] == 6)
  };

  var currentCategory = function(){
    if (nextCategory != "")
      return nextCategory;
    if(places[currentPlayer] == 0 || places[currentPlayer] == 4 || places[currentPlayer] == 8)
      return categories[0];
    if(places[currentPlayer] == 1 || places[currentPlayer] == 5 || places[currentPlayer] == 9)
      return categories[1];
    if(places[currentPlayer] == 2 || places[currentPlayer] == 6 || places[currentPlayer] == 10)
      return categories[2];
    return categories[3];
  };

  this.createRockQuestion = function(index){
    return "Rock Question "+index;
  };

  for(var i = 0; i < 50; i++){
    popQuestions.push("Pop Question "+i);
    scienceQuestions.push("Science Question "+i);
    sportsQuestions.push("Sports Question "+i);
    rockQuestions.push(this.createRockQuestion(i));
  };

  this.isPlayable = function(howManyPlayers){
    return howManyPlayers >= 2;
  };

  this.add = function(playerName){
    players.push(playerName);
    places[this.howManyPlayers()] = 0;
    purses[this.howManyPlayers()] = 0;
    inPenaltyBox[this.howManyPlayers()] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };

  this.getInPenaltyBox = function(){
    return inPenaltyBox;
  };

  this.getCurrentPlayer = function(){
    return currentPlayer;
  };

  this.howManyPlayers = function(){
    return players.length;
  };


  var askQuestion = function(){
    if(currentCategory() == 'Pop')
      console.log(popQuestions.shift());
    if(currentCategory() == 'Science')
      console.log(scienceQuestions.shift());
    if(currentCategory() == 'Sports')
      console.log(sportsQuestions.shift());
    if(currentCategory() == 'Rock')
      console.log(rockQuestions.shift());
  };

  this.roll = function(roll){
    console.log(players[currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if(inPenaltyBox[currentPlayer]){
      if(roll % 2 != 0){
        isGettingOutOfPenaltyBox = true;
        inPenaltyBox[currentPlayer] = false;

        console.log(players[currentPlayer] + " is getting out of the penalty box");
        places[currentPlayer] = places[currentPlayer] + roll;
        if(places[currentPlayer] > 11){
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
        console.log("The category is " + currentCategory());
        askQuestion();
      }else{
        console.log(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    }else{

      places[currentPlayer] = places[currentPlayer] + roll;
      if(places[currentPlayer] > 11){
        places[currentPlayer] = places[currentPlayer] - 12;
      }

      console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
      console.log("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function(){
    nextCategory = "";

    if(inPenaltyBox[currentPlayer]){
      if(isGettingOutOfPenaltyBox){
        console.log('Answer was correct!!!!');
        purses[currentPlayer] += 1;
        console.log(players[currentPlayer] + " now has " +
                    purses[currentPlayer]  + " Gold Coins.");

        var winner = didPlayerWin();
        currentPlayer += 1;
        if(currentPlayer == players.length)
          currentPlayer = 0;

        return winner;
      }else{
        currentPlayer += 1;
        if(currentPlayer == players.length)
          currentPlayer = 0;
        return true;
      }



    }else{

      console.log("Answer was corrent!!!!");

      purses[currentPlayer] += 1;
      console.log(players[currentPlayer] + " now has " +
                  purses[currentPlayer]  + " Gold Coins.");

      var winner = didPlayerWin();

      currentPlayer += 1;
      if(currentPlayer == players.length)
        currentPlayer = 0;

      return winner;
    }
  };

  this.wrongAnswer = function(){
		console.log('Question was incorrectly answered');
		console.log(players[currentPlayer] + " was sent to the penalty box");
		inPenaltyBox[currentPlayer] = true;

    nextCategory = Math.floor(Math.random()*categories.length-1);

    // Saisie de la nouvelle categorie manuellement
    // let newCat = ""
    // while (categories.includes(newCat)) {
    //   newCat = prompt("Please enter the next category: ");
    // }
    // nextCategory = newCat;

    currentPlayer += 1;
    if(currentPlayer == players.length)
      currentPlayer = 0;
		return true;
  };
};

var notAWinner = false;

var game = new Game();

game.add('Chet');

if(!game.isPlayable()){
  if(game.howManyPlayers() == 0){
    game.add('Player 1');
    game.add('Player 2');
  }else{
    game.add('Player 2');
  }
}

do{

  game.roll(Math.floor(Math.random()*6) + 1);

  if(Math.floor(Math.random()*10) == 7){
    notAWinner = game.wrongAnswer();
  }else{
    notAWinner = game.wasCorrectlyAnswered();
  }

}while(notAWinner);
