define(function () {
    function Door(number) {
      this.id = "door" + "_" + number
      this.state = Door.OPENED

      this.close = function () {
        this.state = Door.CLOSED
      }
    }

    Door.OPENED = "opened"
    Door.CLOSED = "closed"
    return Door
  }
);
