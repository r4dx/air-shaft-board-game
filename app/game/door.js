define(["app/util/math"], function (MathUtil) {

    function Door(position, gameMap) {
      this.id = "door" + "_" + position.x + "_" + position.y
      this.gameMap = gameMap
      this.state = Door.OPENED

      gameMap.set(this, position)

      this.close = function () {
        this.state = Door.CLOSED
      }
    }

    Door.OPENED = "opened"
    Door.CLOSED = "closed"
    return Door
  }
);
