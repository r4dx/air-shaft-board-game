define(function () {

    function State(gameMap) {
      this.gameMap = gameMap
      this.actors = [ ]
      var currentIndex = -1
      this.currentActor = null

      this.addActor = function (actor) {
        this.actors.push(actor)
        var self = this
        actor.onDie = function(actor) { self.die(actor) }
      }

      this.next = function () {
        if (++currentIndex >= this.actors.length)
          currentIndex = 0

        this.currentActor = this.actors[currentIndex]
        this.currentActor.takeTurn()
        return this.actors.length != 1
      }

      this.die = function (actor) {
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