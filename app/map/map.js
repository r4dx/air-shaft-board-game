define(function () {
    function Map(terrain) {
      this.terrain = terrain
      this.objects = {}

      this.getObject = function (id) {
        return this.objects[id].object
      }

      this.see = function (viewer, object) {

      }

      var canSet = function (object, position) {

      }

      this.set = function (object, position) {
        if (!canSet(object, position))
          throw "Can't set object with id='" + object.id + "' into position {x: " + position.x + ", y: " + position.y + "}"

        this.objects[object.id].object = object
        this.objects[object.id].position = position
      }

      this.move = function (object, direction) {

      }


    }

    return Map
  }
);
