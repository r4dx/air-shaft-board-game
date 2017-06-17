define(
  [
    "app/actor/actor",
    "app/actor/door"
  ], 
  function (Actor, Door) {
    function Technician(gameMap) {
      Actor.call(this, gameMap, "techician")
      this.doorsLeft = 2

      this.afterTurn = function() {
        var alien = this.gameMap.getObject("alien")
        if (this.gameMap.see(this, alien))
          this.score += 10
      }

      this.createDoor = function () {
        if (--this.doorsLeft < 0)
          throw 'No doors left to set'

        return new Door(this.doorsLeft)
      }

      this.close = function (direction) {
        var door = this.gameMap.getObjectToThe(this, direction)
        if (!door || !(door instanceof Door))
          throw "Can't find door to close"

        door.close()
      }
    }

    return Technician
  }
);