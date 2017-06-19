define(["app/actor/actor"], function (Actor) {

    function Android(gameMap, gameState) {
      Actor.call(this, gameMap, "android")

      this.win = function () {
        this.score += 10
        if (gameState.playersWon == 0) {
          this.score += 10
          var alien = this.gameMap.getObject("alien")
          alien.score += 10
        }

        this.nonActive = true
        this.onWin(this)
      }

      this.afterTurn = function() {
        var alien = this.gameMap.getObject("alien")
        if (this.gameMap.see(this, alien))
          this.score += 10
      }
    }

    return Android
  }
);