define(["app/actor/actor"], function (Actor) {

    function Android(gameMap) {
      Actor.call(this, gameMap, "android")

      this.afterTurn = function() {
        var alien = this.gameMap.getObject("alien")
        if (this.gameMap.see(this, alien))
          this.score += 10
      }
    }

    return Android
  }
);