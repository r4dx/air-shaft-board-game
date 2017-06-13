define(function () {

    function State() {

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


      var local = function () {
      }


      this.global = function () {
      }

    }

    return State
  }
);
