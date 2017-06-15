define([ 'jquery' ], function ($) {

  function StateRenderer(state) {

    this.render = function () {
      $('#state_actor').html(state.currentActor.id)
      $('#state_score').html(state.currentActor.score)
      $('#state_ap').html(state.currentActor.availableMoves)

      if (state.currentActor.availableMoves <= 0)
        $('#press_space').css('font-weight', 'bold')
      else
        $('#press_space').css('font-weight', 'normal')

    }
  }

  return StateRenderer
});