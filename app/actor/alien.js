define(
  [ "app/actor/actor", "app/util/math", "app/actor/door" ], function (Actor, MathUtil, Door) {

    function Alien(gameMap) {
      Actor.call(this, gameMap, "alien")

      this.recalculateAvailableMoves = function () {
        this.availableMoves = MathUtil.getRandomInt(1, 6)
      }

      this.go = function (direction) {
        if (this.availableMoves <= 0)
          throw "There're no moves left"

        var collideObject = this.gameMap.getObjectToThe(this, direction)
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