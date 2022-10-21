require('./game.js');

describe("The test environment", function() {
  it("should pass", function() {
    expect(true).toBe(true);
  });

  it("should access game", function() {
    expect(Game).toBeDefined();
  });
});

describe("Players number", function() {

  it("should not pass because not enough players", function() {
    let game = new Game();
    game.add('charly');
    expect(game.isPlayable(game.howManyPlayers())).toBe(false);
  });

  it("should not pass because not enough players", function() {
    let game = new Game();
    game.add('Charly');
    game.add('Sasha');
    expect(game.isPlayable(game.howManyPlayers())).toBe(true);
  });
});


describe("A player can be able to exit of prison", function() {
  it("should walk in penality box", function() {
    let game = new Game();
    game.add('guilhem');

    game.wrongAnswer();
    game.wasCorrectlyAnswered();
    game.roll(3);
    expect(game.getInPenaltyBox()[game.getCurrentPlayer()]).toBe(false);
  })
});

describe("A player can be able to exit of prison only if he do a odd roll", function() {
  it("should walk in penality box", function() {
    let game = new Game();
    game.add('guilhem');

    game.wrongAnswer();
    game.wasCorrectlyAnswered();
    game.roll(2);
    expect(game.getInPenaltyBox()[game.getCurrentPlayer()]).toBe(true);
  })
});

describe("A player can be able to exit of prison only if he do a odd roll", function() {
  it("should walk in penality box", function() {
    let game = new Game();
    game.add('guilhem');

    game.wrongAnswer();
    game.wasCorrectlyAnswered();
    game.roll(2);
    expect(game.getInPenaltyBox()[game.getCurrentPlayer()]).toBe(true);
  })
});


