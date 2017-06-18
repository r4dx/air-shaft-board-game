define([ "app/util/math" ], function (MathUtil) {

    function Terrain(width, height, inputs, stopTurnChance) {
      if (inputs >= width || inputs <= 0 || width <= 0 || height <= 1)
        throw 'Cannot create map - wrong arguments'

      this.width = width
      this.height = height
      this.inputs = inputs
      this.stopTurnChance = stopTurnChance
      this.cells = []

      var initAllWalls = function (self) {
        for (var i = 0; i < self.height; i++) {
          self.cells[i] = []
          for (var k = 0; k < self.width; k++) {
            self.cells[i][k] = Terrain.WALL
          }
        }
      }

      var hackUpDownPaths = function(self) {
        var takenInputs = []

        for (var i = 0; i < self.inputs; i++) {
          var index = 0

          do {
            index = MathUtil.getRandomInt(1, self.width - 2)
          } while (takenInputs.indexOf(index) != -1 || takenInputs.indexOf(index - 1) != -1 || takenInputs.indexOf(index + 1) != -1)
            
          takenInputs.push(index)

          self.cells[0][index] = Terrain.PATH

          for (var h = 1; h < height - 1; h++) {
            self.cells[h][index] = Terrain.PATH

            var oldIndex = index
            var direction = Math.random() > 0.5 ? 0 : 1

            for (var k = oldIndex; (direction == 0) ? (k > 1) : (k < self.width - 2); direction == 0 ? k-- : k++) {
              index = k
              self.cells[h][index] = Terrain.PATH
              if (Math.random() <= self.stopTurnChance) {
                break
              }
            }
          }

          self.cells[self.height - 1][index] = Terrain.PATH
        }        
      }

      this.getInputs = function () {
        var result = []

        for (var i = 0; i < this.width; i++)
          if (this.cells[0][i] == Terrain.PATH)
            result.push({ x: i, y: 0 })

        return result
      }

      this.getOutputs = function () {
        var result = []

        for (var i = 0; i < this.width; i++)
          if (this.cells[this.height - 1][i] == Terrain.PATH)
            result.push({ x: i, y: this.height - 1 })

        return result
      }


      this.generate = function () {
        initAllWalls(this)
        hackUpDownPaths(this)
      }

    }

    Terrain.WALL = "wall"
    Terrain.PATH = "path"

    return Terrain
  }
);
