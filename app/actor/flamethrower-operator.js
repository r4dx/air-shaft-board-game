define(
  [
    "app/actor/actor",
    "app/actor/alien"
  ], 
  function (Actor, Alien) {
    function FlamethrowerOperator(gameMap, gameState) {
      Actor.call(this, gameMap, gameState, "flamethrower-operator")
      var fuelTanksLeft = 1

      this.afterTurn = function() {
        var alien = this.gameMap.getObject("alien")
        if (this.gameMap.see(this, alien))
          this.score += 10
      }

      this.fire = function () {
        if (--fuelTanksLeft < 0)
          return

        var alien = this.gameMap.getObject("alien")
        if (this.gameMap.see(this, alien)) {
          var bannedDirection = this.gameMap.directionToGetToObject(alien, this)
          alien.panic(bannedDirection)
        }
      }
    }

    return FlamethrowerOperator
  }
);