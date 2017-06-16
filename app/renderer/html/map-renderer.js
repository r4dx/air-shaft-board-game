define(
  [ 
    'jquery', 
    'app/renderer/html/terrain-renderer',
    'app/actor/android',
    'app/actor/alien',
    'app/actor/technician',
    'app/actor/door'
  ], 
  function ($, TerrainRenderer, Android, Alien, Technician, Door) {
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
      var renderTechnician = function (td, technician) {
        renderActor(td, 'T')
      }
      var renderDoor = function (td, door) {
        td.text(door.state == Door.CLOSED ? '||' : '|&nbsp;&nbsp;&nbsp;|')
      }

      var renderObject = function (self, object, position) {
        var tdId = TerrainRenderer.generateId(position.x, position.y)
        var td = $('#' + tdId)

        // js is dynamically typed thus there's no double dispatch available
        if (object instanceof Android)
          renderAndroid(td, object)

        if (object instanceof Alien)
          renderAlien(td, object)

        if (object instanceof Technician)
          renderTechnician(td, object)

        if (object instanceof Door)
          renderDoor(td, object)
      }

      this.render = function () {
        for (var key in gameMap.objects)
          renderObject(this, gameMap.objects[key].object, gameMap.objects[key].position)
      }

    }

    return MapRenderer
  }
);