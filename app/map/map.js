define(function () {

    function Map(width, height, inputs, stopTurnChance) {
      if (inputs >= width || inputs <= 0 || width <= 0 || height <= 1)
        throw 'Cannot create map - wrong arguments'

      this.WALL = 'wall'
      this.PATH = 'path'

      this.width = width
      this.height = height
      this.inputs = inputs
      this.stopTurnChance = stopTurnChance
      this.cells = []

      var getRandomInt = function (min, max) {
        if (min >= max)
          throw 'Random failed: min >= max'

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      var initAllWalls = function (self) {
        for (var i = 0; i < self.height; i++) {
          self.cells[i] = []
          for (var k = 0; k < self.width; k++) {
            self.cells[i][k] = self.WALL
          }
        }
      }

      var hackUpDownPaths = function(self) {
        var takenInputs = []

        for (var i = 0; i < self.inputs; i++) {
          var index = 0

          do {
            index = getRandomInt(1, self.width - 2)
          } while (takenInputs.indexOf(index) != -1 || takenInputs.indexOf(index - 1) != -1 || takenInputs.indexOf(index + 1) != -1)
            
          takenInputs.push(index)

          self.cells[0][index] = self.PATH

          for (var h = 1; h < height - 1; h++) {
            self.cells[h][index] = self.PATH

            var oldIndex = index
            var direction = Math.random() > 0.5 ? 0 : 1

            for (var k = oldIndex; (direction == 0) ? (k > 1) : (k < self.width - 2); direction == 0 ? k-- : k++) {
              index = k
              self.cells[h][index] = self.PATH
              if (Math.random() <= self.stopTurnChance) {
                break
              }
            }
          }

          self.cells[self.height - 1][index] = self.PATH
        }        
      }

      this.generate = function () {
        initAllWalls(this)
        hackUpDownPaths(this)
      }
    }

    return Map
  }
);
