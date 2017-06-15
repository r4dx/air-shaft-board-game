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

  Ќабор игроков
   аждый игрок может быть одной из нескольких ролей
   ажда€ роль отличаетс€ подсчетом очков, тем как она может ходить и способност€ми
  ƒл€ каждой роли отдельный класс
  —тейт хранит - чей сейчас ход
  ¬ инстанц роли принимаетс€ карта, чтобы видеть, что возможно, а что нет
  –еализовать класс дл€ андроида

  Android {
    this.position
    this.currentMoves - определ€етс€ на каждом шагу - после каждого действи€
    this.score - пересчитываетс€ после каждого хода
    go(direction, moves)
    skip() - увеличивает moves
  }

  FlamethrowerOperator {
    this.position
    this.currentMoves
    this.score
    go(direction, moves)
    skip()
    fire(alien)
  }

  Alien {
    this.position
    this.currentMoves
    this.score
    go(direction, moves)
    skip()
    eat(target)
  }

  Mechanic {
    this.position
    this.currentMoves
    this.score
    go(direction, moves)
    skip()
    setDoor(mapPosition) - должно вызыватьс€ в начале игры, не больше, чем Ќ раз
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
