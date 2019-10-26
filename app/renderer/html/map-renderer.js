define(
  [ 
    'jquery', 
    'app/renderer/html/terrain-renderer',
    'app/actor/cat',
    'app/actor/alien',
    'app/actor/technician',
    'app/actor/flamethrower-operator',
    'app/actor/door'
  ], 
  function ($, TerrainRenderer, Cat, Alien, Technician, FlamethrowerOperator, Door) {
    function MapRenderer(gameMap) {
      var renderActor = function (td, objName, color) {
        td.attr('align', 'center').html("<b style='color: " + color + "'>" + objName + "</b>")
      }
      var renderCat = function (td, android) {
        renderActor(td, 'C', 'black')
      }
      var renderAlien = function (td, alien) {
        renderActor(td, '@', alien.inPanic ? 'red' : 'black')
      }
      var renderTechnician = function (td, technician) {
        renderActor(td, 'T', 'black')
      }
      var renderFlamethrowerOperator = function (td, technician) {
        renderActor(td, 'F', 'black')
      }
      var renderDoor = function (td, door) {
        renderActor(td, door.state == Door.CLOSED ? 'X' : 'O', 'black')
      }

      var renderObject = function (self, object, position) {
        var tdId = TerrainRenderer.generateId(position.x, position.y)
        var td = $('#' + tdId)

        // js is dynamically typed thus there's no double dispatch available
        if (object instanceof Cat)
          renderCat(td, object)

        if (object instanceof Alien)
          renderAlien(td, object)

        if (object instanceof Technician)
          renderTechnician(td, object)

        if (object instanceof Door)
          renderDoor(td, object)

        if (object instanceof FlamethrowerOperator)
          renderFlamethrowerOperator(td, object)
      }

      this.render = function () {
        for (var key in gameMap.objects)
          renderObject(this, gameMap.objects[key].object, gameMap.objects[key].position)
      }

    }

    return MapRenderer
  }
);