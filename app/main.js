define(['jquery', 'app/map/map', 'app/map/renderer'], function ($, Map, Renderer) {
    $(document).ready(function() {

      var gameMap = new Map(10, 10, 2);
      gameMap.generate();
      var renderer = new Renderer(gameMap, $('#map'), 100);
      renderer.render();
    })

});
