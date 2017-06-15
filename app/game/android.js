define(["app/util/math"], function (MathUtil) {

    function Android(position, gameMap) {
      this.id = "android"
      this.gameMap = gameMap
      this.state = state
      this.score = 0
      this.availableMoves = 0
      this.dead = false

      gameMap.set(this, position)

      var recalculateAvailableMoves = function (self) {
        self.availableMoves = MathUtil.getRandomInt(1, 3)
      }

      this.takeTurn = function () {
        if (this.dead)
          throw "Dead can't take turn"

        recalculateAvailableMoves(this)
      }

      this.go = function (direction) {
        if (this.dead)
          throw "Dead can't walk"

        if (this.availableMoves <= 0)
          throw "There're no moves left"

        this.gameMap.move(this, direction)

        if (--this.availableMoves != 0)
          return

        var alien = this.gameMap.getObject("alien")
        if (this.gameMap.see(this, alien))
          this.score += 10
      }

      this.die = function () {
        this.dead = true
        this.onDie(this)
      }

      this.onDie = function() {}
    }

    return Android
  }
);