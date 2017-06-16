define([ 'jquery' ], function ($) {

  function InitStateRenderer(state) {

    this.render = function () {
      $('#state_actor').html(state.currentActor.id)
      $('#status').html('Press space to choose start location')
    }
  }

  return InitStateRenderer
});