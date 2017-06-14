define([ 'jquery' ], function ($) {

  function StateRenderer(state) {

    this.render = function () {
      $('#state_actor').html(state.currentActor.id)
      $('#state_score').html(state.currentActor.score)
      $('#state_ap').html(state.currentActor.availableMoves)
    }
  }

  return StateRenderer
});