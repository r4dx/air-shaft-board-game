define(
  [ 
    "app/util/direction", 
    "app/map/terrain",
    "app/actor/door"
  ], 
  function (Direction, Terrain, Door) {
    function Map(terrain) {
      this.terrain = terrain
      this.objects = {}

      this.getObject = function (id) {
        if (! (id in this.objects))
          throw "No object '" + id + "' found"
        return this.objects[id].object
      }

      this.removeObject = function (id) {
        if (! (id in this.objects))
          throw "No object '" + id + "' found"
        delete this.objects[id]
      }

      var isFree = function (self, position, exclusions) {
        for (var key in self.objects) {
          if (exclusions.some(element => key == element.id))
            continue

          if (self.objects[key].position.x == position.x && self.objects[key].position.y == position.y && (!(self.objects[key].object instanceof Door) || self.objects[key].object.state == Door.CLOSED))
            return false
        }

        if (self.terrain.cells[position.y][position.x] != Terrain.PATH)
          return false

        return true
      }

      this.see = function (viewer, object) {
        var viewerPosition = this.objects[viewer.id].position
        var objectPosition = this.objects[object.id].position
        if (viewerPosition.x != objectPosition.x && viewerPosition.y != objectPosition.y)
          return false

        if (viewerPosition.x != objectPosition.x) {
          var min = Math.min(objectPosition.x, viewerPosition.x)
          var max = Math.max(objectPosition.x, viewerPosition.x)

          for (var i = min + 1; i < max; i++)
            if (!isFree(this, { x: i, y: objectPosition.y}, []))
              return false
        }

        if (viewerPosition.y != objectPosition.y) {
          var min = Math.min(objectPosition.y, viewerPosition.y)
          var max = Math.max(objectPosition.y, viewerPosition.y)

          for (var i = min + 1; i < max; i++)
            if (!isFree(this, { x: objectPosition.x, y: i}, []))
              return false
        }

        return true

      }

      this.set = function (object, position) {
        if (!isFree(this, position, []))
          throw "Can't set object with id='" + object.id + "' into position {x: " + position.x + ", y: " + position.y + "}"

        this.objects[object.id] = { object: object, position: position } 
      }

      this.move = function (object, direction) {
        var position = Direction.calculateNewPosition(this.objects[object.id].position, direction)
        if (!isFree(this, position, []))
          throw "Can't move object with id='" + object.id + "' into position {x: " + position.x + ", y: " + position.y + "}"

        this.objects[object.id].position = position

        return position.y == this.terrain.height - 1
      }

      this.getObjectsToThe = function (object, direction) {
        var result = []
        var position = Direction.calculateNewPosition(this.objects[object.id].position, direction)
        for (var key in this.objects) {
          if (this.objects[key].position.x == position.x && this.objects[key].position.y == position.y)
            result.push(this.objects[key].object)
        }
        return result
      }

      this.directionToGetToObject = function (viewer, object) {
        var viewerPosition = this.objects[viewer.id].position
        var objectPosition = this.objects[object.id].position

        if (viewerPosition.x != objectPosition.x && viewerPosition.y != objectPosition.y)
          throw "Cannot detect direction"

        if (viewerPosition.x == objectPosition.x)
          return viewerPosition.y > objectPosition.y ? Direction.UP : Direction.DOWN

        if (viewerPosition.y == objectPosition.y)
          return viewerPosition.x > objectPosition.x ? Direction.LEFT : Direction.RIGHT
      }

      this.getFreeInputs = function (exclusions) {
        var result = []
        var inputs = this.terrain.getInputs()
        for (var i = 0; i < inputs.length; i++)
          if (isFree(this, inputs[i], exclusions))
            result.push(inputs[i])

        return result
      }

      this.getFreeOutputs = function (exclusions) {
        var result = []
        var outputs = this.terrain.getOutputs()
        for (var i = 0; i < outputs.length; i++)
          if (isFree(this, outputs[i], exclusions))
            result.push(outputs[i])

        return result
      }


    }

    return Map
  }
);
