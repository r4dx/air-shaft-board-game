define(['jquery'], function ($) {

  function MapRenderer(gameMap, rootElement, elementSizePx) {
    this.render = function () {
      var table = $('<table></table>').css('table-layout', 'fixed').attr('cellspacing', 0);

      for (var i = 0; i < gameMap.height; i++) {
        var row = $('<tr></tr>')

        for (var k = 0; k < gameMap.width; k++) {
          color = 'black'
          if (gameMap.cells[i][k] == 'path')
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

  return MapRenderer
});