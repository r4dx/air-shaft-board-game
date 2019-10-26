define(["app/util/math"], function (MathUtil) {

    function Actor(gameMap, gameState, id) {
      this.gameMap = gameMap
      this.state = state
      this.score = 0
      this.availableMoves = 0
      this.nonActive = false
      this.dead = false
      this.id = id
      this.isAndroid = false

      this.recalculateAvailableMoves = function () {
        this.availableMoves = MathUtil.getRandomInt(1, 4)
      }

      this.takeTurn = function () {
        if (this.nonActive)
          throw "Non active can't take turn"

        this.recalculateAvailableMoves()
      }

      this.go = function (direction) {
        if (this.nonActive)
          throw "Non active can't walk"

        if (this.availableMoves <= 0)
          throw "There're no moves left"

        if (this.gameMap.move(this, direction)) {
          this.win()
          this.availableMoves = 0
          return
        }

        if (--this.availableMoves != 0)
          return
      }

      this.win = function () {
        if (this.isAndroid && gameState.playersWon == 0) {
          this.score += 10
          var alien = this.gameMap.getObject("alien")
          alien.score += 10
        }

        this.score += 10
        this.nonActive = true
        this.onWin(this)
      }

      this.die = function () {
        this.nonActive = true
        this.dead = true
        this.onDie(this)
      }

      this.onDie = function (self) {}
      this.onWin = function (self) {}
      this.afterTurn = function() {}
    }

    return Actor
  }
);