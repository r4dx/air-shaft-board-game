define(["app/util/math"], function (MathUtil) {

    function Android(position, gameMap) {
      this.id = "android"
      this.gameMap = gameMap
      this.score = 0
      this.availableMoves = 0

      gameMap.set(this, position)

      var recalculateAvailableMoves = function (self) {
        self.availableMoves = MathUtil.getRandomInt(1, 3)
      }


      this.takeTurn = function () {
        recalculateAvailableMoves(this)
      }

      this.go = function (direction) {
        if (this.availableMoves <= 0)
          throw "There're no moves left"

        this.gameMap.move(this, direction)
        if (--this.availableMoves != 0)
          return

        var alien = this.gameMap.getObject("alien")
        if (this.gameMap.see(this, alien))
          this.score += 10
      }

      this.skip = function() {
        this.availableMoves = 0
      }
    }

    return State
  }
);
