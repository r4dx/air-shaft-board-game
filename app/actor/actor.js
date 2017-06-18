define(["app/util/math"], function (MathUtil) {

    function Actor(gameMap, id) {
      this.gameMap = gameMap
      this.state = state
      this.score = 0
      this.availableMoves = 0
      this.nonActive = false
      this.id = id

      this.recalculateAvailableMoves = function () {
        this.availableMoves = MathUtil.getRandomInt(1, 3)
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

        if (this.gameMap.move(this, direction))
          this.win()

        if (--this.availableMoves != 0)
          return
      }

      this.win = function () {
        this.score += 10
        this.nonActive = true
        this.onWin(this)
      }

      this.die = function () {
        this.nonActive = true
        this.onDie(this)
      }

      this.onDie = function (self) {}
      this.onWin = function (self) {}
      this.afterTurn = function() {}
    }

    return Actor
  }
);