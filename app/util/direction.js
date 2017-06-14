define(function () {
    function Direction() {}

    Direction.LEFT = 0
    Direction.TOP = 1
    Direction.RIGHT = 2
    Direction.DOWN = 3

    Direction.calculateNewPosition = function (position, direction) {
      var result = position

      if (direction == Direction.LEFT)
        result.x--

      if (direction == Direction.RIGHT)
        result.x++

      if (direction == Direction.TOP)
        result.y--

      if (direction == Direction.DOWN)
        result.y++

      return result
    }

    return Direction
  }
);
