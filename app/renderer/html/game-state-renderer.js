define([ 'jquery', 'app/actor/alien' ], function ($, Alien) {

  function GameStateRenderer(state) {

    this.render = function () {
      var actor = state.currentActor.id
      if (state.currentActor instanceof Alien && state.currentActor.inPanic)
        actor += " (panic!)"

      $('#state_actor').html(actor)
      $('#state_score').html(state.currentActor.score)
      $('#state_ap').html(state.currentActor.availableMoves)
      $('#status').html('Press space for next turn')

      if (state.currentActor.availableMoves <= 0)
        $('#status').css('font-weight', 'bold')
      else
        $('#status').css('font-weight', 'normal')

    }
  }

  return GameStateRenderer
});