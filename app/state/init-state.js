define([ 'app/actor/technician', 'app/actor/alien', 'app/util/direction' ], function (Technician, Alien, Direction) {

    function InitState(gameMap, actors) {
      var currentIndex = -1
      this.currentActor = null
      var spawnPointIndex = 0
      var state = InitState.ACTORS
      var currentDoor = null

      var moveActor = function (self, direction) {
        var spawnPoints = self.currentActor instanceof Alien ? gameMap.getFreeOutputs([ self.currentActor ]) : gameMap.getFreeInputs([ self.currentActor ])

        if (direction == Direction.LEFT)
          spawnPointIndex--

        if (direction == Direction.RIGHT)
          spawnPointIndex++

        if (spawnPointIndex < 0)
          spawnPointIndex = spawnPoints.length - 1

        if (spawnPointIndex > spawnPoints.length - 1)
          spawnPointIndex = 0

        gameMap.set(self.currentActor, spawnPoints[spawnPointIndex])
      }

      this.move = function (direction) {
        if (state == InitState.ACTORS)
          moveActor(this, direction)
        else 
          gameMap.move(currentDoor, direction)
      }

      var setDoor = function (self) {
        currentDoor = self.currentActor.createDoor()
        gameMap.set(currentDoor, gameMap.getFreeInputs([ ])[0])
      }

      this.next = function () {
        if (this.currentActor instanceof Technician && state == InitState.ACTORS) {
          state = InitState.DOORS
        }

        if (state == InitState.DOORS && this.currentActor.doorsLeft > 0) {
           setDoor(this)
           return true
        }

        if (state == InitState.DOORS && this.currentActor.doorsLeft == 0)
          state = InitState.ACTORS

        spawnPointIndex = 0

        if (++currentIndex >= actors.length)
          return false        

        this.currentActor = actors[currentIndex]
        this.move(Direction.LEFT)

        return true
      }

      this.act = function(direction) { }
    }
    InitState.ACTORS = 'actors'
    InitState.DOORS = 'doors'

    return InitState
  }
);