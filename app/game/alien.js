define(
  [ "app/util/math", "app/game/door" ], function (MathUtil, Door) {

    function Alien(position, gameMap) {
      this.id = "alien"
      this.gameMap = gameMap
      this.score = 0
      this.availableMoves = 0
      gameMap.set(this, position)

      var recalculateAvailableMoves = function (self) {
        self.availableMoves = MathUtil.getRandomInt(1, 6)
      }

      this.takeTurn = function () {
        recalculateAvailableMoves(this)
      }

      this.go = function (direction) {
        if (this.availableMoves <= 0)
          throw "There're no moves left"

        var collideObject = this.gameMap.getCollisionAfterMove(this, direction)
        if (collideObject && !(collideObject instanceof Door)) {
          collideObject.die()
          this.score++
        }

        this.gameMap.move(this, direction)
        if (--this.availableMoves != 0)
          return

      }
    }

    return Alien
  }
);
