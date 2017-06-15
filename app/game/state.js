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

      this.nextTurn = function () {
        if (++currentIndex >= this.actors.length)
          currentIndex = 0

        this.currentActor = this.actors[currentIndex]
        this.currentActor.takeTurn()
      }

      this.die = function (actor) {
        this.gameMap.removeObject(actor.id)
        this.actors.splice(this.actors.indexOf(actor), 1)
      }

    }

    return State
  }
);




/*

  Набор игроков
  Каждый игрок может быть одной из нескольких ролей
  Каждая роль отличается подсчетом очков, тем как она может ходить и способностями
  Для каждой роли отдельный класс
  Стейт хранит - чей сейчас ход
  В инстанц роли принимается карта, чтобы видеть, что возможно, а что нет
  Реализовать класс для андроида

  FlamethrowerOperator {
    this.position
    this.currentMoves
    this.score
    go(direction, moves)
    skip()
    fire(alien)
  }

  Technician {
    this.position
    this.currentMoves
    this.score
    go(direction, moves)
    skip()
    setDoor(mapPosition) - должно вызываться в начале игры, не больше, чем Н раз
    close(door)
    open(door)
  }

  Door {
    this.position
    this.state
    open()
    close()
  }

*/
