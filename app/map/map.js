define([ "app/util/direction", "app/map/terrain" ], function (Direction, Terrain) {
    function Map(terrain) {
      this.terrain = terrain
      this.objects = {}

      this.getObject = function (id) {
        return this.objects[id].object
      }

      this.see = function (viewer, object) {

      }

      var canSet = function (self, position) {
        for (var key in this.objects)
          if (self.object[key].position.x == position.x && self.object[key].position.y == position.y)
            return false

        if (self.terrain.cells[position.y][position.x] != Terrain.PATH)
          return false

        return true

      }

      this.set = function (object, position) {
        if (!canSet(position))
          throw "Can't set object with id='" + object.id + "' into position {x: " + position.x + ", y: " + position.y + "}"

        this.objects[object.id].object = object
        this.objects[object.id].position = position
      }

      this.move = function (object, direction) {
        var position = Direction.calculateNewPosition(this.objects[object.id].position, direction)
        if (!canSet(this, position))
          throw "Can't move object with id='" + object.id + "' into position {x: " + position.x + ", y: " + position.y + "}"

        this.objects[object.id].position = position
      }


    }

    return Map
  }
);
