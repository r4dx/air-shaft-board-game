define(['jquery'], function ($) {

  function TerrainRenderer(terrain, rootElement, elementSizePx) {
    this.render = function () {
      var table = $('<table></table>').css('table-layout', 'fixed').attr('cellspacing', 0);

      for (var i = 0; i < terrain.height; i++) {
        var row = $('<tr></tr>')

        for (var k = 0; k < terrain.width; k++) {
          color = 'black'
          if (terrain.cells[i][k] == 'path')
            color = 'white'
          row.append($('<td></td>')
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

  return TerrainRenderer
});