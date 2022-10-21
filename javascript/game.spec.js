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

