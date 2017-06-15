define(function () {

    function State(android, alien) {
      this.actors = [ android, alien ]
      var currentIndex = 0
      this.currentActor = this.actors[currentIndex]
      this.currentActor.takeTurn()

      this.nextTurn = function () {
        if (++currentIndex >= this.actors.length)
          currentIndex = 0

        this.currentActor = this.actors[currentIndex]
        this.currentActor.takeTurn()
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
