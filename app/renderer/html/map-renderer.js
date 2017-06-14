define(
  [ 
    'jquery', 
    'app/renderer/html/terrain-renderer',
    'app/game/android',
    'app/game/alien'
  ], function ($, TerrainRenderer, Android, Alien) {

  function MapRenderer(gameMap) {

    var renderActor = function (td, objName) {
      td.attr('align', 'center').html("<b style='color: red'>" + objName + "</b>")
    }

    var renderAndroid = function (td, android) {
      renderActor(td, 'A')
    }
    var renderAlien = function (td, alien) {
      renderActor(td, '@')
    }

    var renderObject = function (self, object, position) {
      var tdId = TerrainRenderer.generateId(position.x, position.y)
      var td = $('#' + tdId)

      // js is dynamically typed thus there's no double dispatch available
      if (object instanceof Android)
        renderAndroid(td, object)

      if (object instanceof Alien)
        renderAlien(td, object)
    }

    this.render = function () {
      for (var key in gameMap.objects)
        renderObject(this, gameMap.objects[key].object, gameMap.objects[key].position)
    }

  }

  return MapRenderer
});