define([ 'jquery', "app/map/terrain" ], function ($, Terrain) {

  function TerrainRenderer(terrain, rootElement, elementSizePx) {

    this.render = function () {
      rootElement.html("")
      var table = $('<table></table>').css('table-layout', 'fixed').attr('cellspacing', 0);

      for (var i = 0; i < terrain.height; i++) {
        var row = $('<tr></tr>')

        for (var k = 0; k < terrain.width; k++) {
          color = 'black'

          if (terrain.cells[i][k] == Terrain.PATH)
            color = 'white'

          row.append($("<td id='" + TerrainRenderer.generateId(k, i) + "'>&nbsp;</td>")
            .width(elementSizePx)
            .height(elementSizePx)
            .css('heigth', elementSizePx + 'px')
            .css('background-color', color)
            .css('overflow', 'hidden')
            .css('word-wrap', 'break-word'));
        }

        table.append(row);
      }

      rootElement.append(table);
    }
  }

  TerrainRenderer.generateId = function(x, y) {
    return x + "_" + y
  }


  return TerrainRenderer
});