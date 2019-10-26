define([ 'jquery' ], function ($) {

  function InitStateRenderer(state) {

    this.render = function () {

      var actor = state.currentActor.id
      if (state.currentActor.isAndroid)
        actor += " (android)"


      $('#state_actor').html(actor)
      $('#status').html('Press space to choose start location')
    }
  }

  return InitStateRenderer
});