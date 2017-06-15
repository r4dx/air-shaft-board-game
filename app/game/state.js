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

  ����� �������
  ������ ����� ����� ���� ����� �� ���������� �����
  ������ ���� ���������� ��������� �����, ��� ��� ��� ����� ������ � �������������
  ��� ������ ���� ��������� �����
  ����� ������ - ��� ������ ���
  � ������� ���� ����������� �����, ����� ������, ��� ��������, � ��� ���
  ����������� ����� ��� ��������

  Android {
    this.position
    this.currentMoves - ������������ �� ������ ���� - ����� ������� ��������
    this.score - ��������������� ����� ������� ����
    go(direction, moves)
    skip() - ����������� moves
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
    setDoor(mapPosition) - ������ ���������� � ������ ����, �� ������, ��� � ���
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
