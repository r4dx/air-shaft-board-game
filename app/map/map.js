define(function () {

    function Map(width, height, inputs) {
      if (inputs >= width || inputs <= 0 || width <= 0 || height <= 1)
        throw 'Cannot create map - wrong arguments'

      this.WALL = 'wall'
      this.PATH = 'path'

      this.width = width
      this.height = height
      this.inputs = inputs
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

      this.generate = function () {

        initAllWalls(this)

        var takenInputs = []

        for (var i = 0; i < this.inputs; i++) {
          var index = 0

          do {
            index = getRandomInt(1, this.width - 2)
          } while (takenInputs.indexOf(index) != -1 || takenInputs.indexOf(index - 1) != -1 || takenInputs.indexOf(index + 1) != -1)
            
          takenInputs.push(index)

          this.cells[0][index] = this.PATH

          for (var h = 1; h < height - 1; h++) {
            this.cells[h][index] = this.PATH

            if (h % 2 != 0)
              continue

            var oldIndex = index

            if (index - 1 <= 1)
              index = getRandomInt(index + 1, this.width - 2)
            else if (index + 1 >= this.width - 2)
              index = getRandomInt(1, index - 1)
            else if (getRandomInt(0, 1) == 1)
              index = getRandomInt(1, index - 1)
            else
              index = getRandomInt(index + 1, this.width - 2)
                               
            var _min = oldIndex < index ? oldIndex : index
            var _max = oldIndex >= index ? oldIndex : index

            for (var k = _min; k <= _max; k++) {
              this.cells[h][k] = this.PATH
            }
          }

          this.cells[this.height - 1][index] = this.PATH
        }
      }
    }

    return Map
  }
);
