define(function () {

    function EndState(actors) {
      this.actors = actors

      this.move = function (direction) { }

      this.next = function () {
        return true
      }
    }

    return EndState
  }
);