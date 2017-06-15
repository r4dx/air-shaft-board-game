define(["app/game/actor"], function (Actor) {

    function Android(position, gameMap) {
      Actor.call(this, position, gameMap, "android")

      this.afterTurn = function() {
        var alien = this.gameMap.getObject("alien")
        if (this.gameMap.see(this, alien))
          this.score += 10
      }
    }

    return Android
  }
);