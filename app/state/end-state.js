define(function () {

    function EndState(actors) {
      this.actors = actors

      this.move = function (direction) { }
      this.act = function(direction) { }

      this.next = function () {
        return true
      }
    }

    return EndState
  }
);