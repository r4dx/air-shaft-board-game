define([ 'jquery' ], function ($) {

  function EndStateRenderer(state) {

    this.render = function () {
      $('#status').html('Game is finished')

      var table = $('#leaderboard_table')
      table.html('')
      var row = $('<tr></tr>')

      row.append($("<td><b>Player</b></td>"))
      row.append($("<td><b>Score</b></td>"))
      table.append(row)

      state.actors.sort((a1, a2) => a2.score - a1.score )


      for (var i = 0; i < state.actors.length; i++) {
        var row = $('<tr></tr>')

        row.append($("<td>" + state.actors[i].id + "</td>"))
        row.append($("<td>" + state.actors[i].score + "</td>"))
        table.append(row)

      }
    }
  }

  return EndStateRenderer
});