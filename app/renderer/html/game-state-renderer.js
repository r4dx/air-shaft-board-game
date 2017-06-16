define([ 'jquery' ], function ($) {

  function GameStateRenderer(state) {

    this.render = function () {
      $('#state_actor').html(state.currentActor.id)
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