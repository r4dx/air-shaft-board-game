define(function () {
    function Direction() {}

    Direction.LEFT = 0
    Direction.UP = 1
    Direction.RIGHT = 2
    Direction.DOWN = 3

    Direction.calculateNewPosition = function (position, direction) {
      var result = {}
      result.x = position.x
      result.y = position.y

      if (direction == Direction.LEFT)
        result.x--

      if (direction == Direction.RIGHT)
        result.x++

      if (direction == Direction.UP)
        result.y--

      if (direction == Direction.DOWN)
        result.y++

      return result
    }

    return Direction
  }
);
