define(
  [ "app/actor/actor", "app/util/math", "app/actor/door" ], function (Actor, MathUtil, Door) {

    function Alien(gameMap, gameState) {
      Actor.call(this, gameMap, gameState, "alien")
      this.inPanic = false
      var bannedDirection = null

      this.recalculateAvailableMoves = function () {
        this.availableMoves = MathUtil.getRandomInt(1, 6)
      }

      this.go = function (direction) {
        if (this.availableMoves <= 0)
          throw "There're no moves left"

        if (this.inPanic && direction == bannedDirection)
          return

        var collideObjects = this.gameMap.getObjectsToThe(this, direction)
        for (var i = 0; i < collideObjects.length; i++) {
          var collideObject = collideObjects[i]
          if (!(collideObject instanceof Door)) {
            collideObject.die()
            this.score += collideObject.isAndroid ? 1 : 10
          }
        }

        this.gameMap.move(this, direction)
        this.availableMoves--
      }

      this.panic = function (direction) {
        bannedDirection = direction
        this.inPanic = true
      }

      this.afterTurn = function() {
        this.inPanic = false
        bannedDirection = null
      }

    }

    return Alien
  }
);
