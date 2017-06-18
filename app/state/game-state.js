define(
  [
    "app/actor/alien",
    "app/actor/technician",
    "app/actor/flamethrower-operator"
  ], 
  function (Alien, Technician, FlamethrowerOperator) {

    function State(gameMap) {
      this.gameMap = gameMap
      this.actors = [ ]
      var currentIndex = -1
      this.currentActor = null

      this.addActors = function (actors) {
        for (var i = 0; i < actors.length; i++)
          this.addActor(actors[i])
      }

      this.addActor = function (actor) {
        this.actors.push(actor)
        var self = this
        actor.onDie = function(actor) { self.remove(actor) }
        actor.onWin = function(actor)
         self.remove(actor); 
      }

      this.next = function () {
        if (this.currentActor instanceof Alien && this.currentActor.inPanic && this.currentActor.availableMoves > 0)
          return true

        if (this.currentActor != null && !this.currentActor.nonActive)
          this.currentActor.afterTurn()

        if (++currentIndex >= this.actors.length)
          currentIndex = 0

        this.currentActor = this.actors[currentIndex]
        this.currentActor.takeTurn()
        return this.actors.length != 1
      }

      this.move = function (direction) {
        this.currentActor.go(direction)
      }

      this.act = function(direction) { 
        if (this.currentActor instanceof Technician)
          this.currentActor.close(direction)

        if (this.currentActor instanceof FlamethrowerOperator)
          this.currentActor.fire()
      }

      this.remove = function (actor) {
        this.gameMap.removeObject(actor.id)
        var index = this.actors.indexOf(actor)
        this.actors.splice(index, 1)
        if (currentIndex > index)
          currentIndex--
      }

    }

    return State
  }
);                                     