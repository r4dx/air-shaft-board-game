define([ 'jquery' ], function ($) {

  function EndStateRenderer(state) {

    this.render = function () {
      $('#status').html('Game is finished')
    }
  }

  return EndStateRenderer
});