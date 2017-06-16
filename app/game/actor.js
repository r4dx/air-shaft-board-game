define(["app/util/math"], function (MathUtil) {

    function Actor(position, gameMap, id) {
      this.gameMap = gameMap
      this.state = state
      this.score = 0
      this.availableMoves = 0
      this.dead = false
      this.id = id
      gameMap.set(this, position)

      this.recalculateAvailableMoves = function () {
        this.availableMoves = MathUtil.getRandomInt(1, 60)
      }

      this.takeTurn = function () {
        if (this.dead)
          throw "Dead can't take turn"

        this.recalculateAvailableMoves()
      }

      this.go = function (direction) {
        if (this.dead)
          throw "Dead can't walk"

        if (this.availableMoves <= 0)
          throw "There're no moves left"

        this.gameMap.move(this, direction)

        if (--this.availableMoves != 0)
          return

        this.afterTurn()
      }

      this.die = function () {
        this.dead = true
        this.onDie(this)
      }

      this.onDie = function() {}
      this.afterTurn = function() {}
    }

    return Actor
  }
);