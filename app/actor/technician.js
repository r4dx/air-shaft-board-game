define(
  [
    "app/actor/actor",
    "app/actor/door"
  ], 
  function (Actor, Door) {
    function Technician(gameMap) {
      Actor.call(this, gameMap, "technician")
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
        var objects = this.gameMap.getObjectsToThe(this, direction)
        for (var i = 0; i < objects.length; i++) {
          var door = objects[i]
          if (!(door instanceof Door))
            continue
          door.close()
        }
      }
    }

    return Technician
  }
);