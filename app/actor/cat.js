define(["app/actor/actor", "app/util/math"], function (Actor, MathUtil) {

    function Cat(gameMap, gameState) {
      Actor.call(this, gameMap, gameState, "cat")

      this.recalculateAvailableMoves = function () {
        this.availableMoves = MathUtil.getRandomInt(1, 6)
      }

      this.afterTurn = function() {
        var alien = this.gameMap.getObject("alien")
        if (this.gameMap.see(this, alien))
          this.score += 10
      }
    }

    return Cat
  }
);