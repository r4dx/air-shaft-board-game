define([ 'jquery', 'app/actor/alien' ], function ($, Alien) {

  function GameStateRenderer(state, endState) {
    var renderScores = function () {
      var table = $('#leaderboard_table')
      table.html('')
      var row = $('<tr></tr>')
      row.append($("<td><b>Player</b></td>"))
      row.append($("<td><b>Score</b></td>"))
      row.append($("<td><b>Status</b></td>"))
      table.append(row)
      endState.actors.sort((a1, a2) => {
        if (a1.dead)
          return 1000
        if (a2.dead)
          return -1000
        return a2.score - a1.score 
      })
      for (var i = 0; i < endState.actors.length; i++) {
        var row = $('<tr></tr>')
        row.append($("<td>" + endState.actors[i].id + "</td>"))
        row.append($("<td>" + endState.actors[i].score + "</td>"))
        row.append($("<td>" + (!endState.actors[i].nonActive ? 'Alive' : (endState.actors[i].dead ? 'Dead' : 'Escaped')) + "</td>"))
        table.append(row)
      }
    }

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

      renderScores()

    }
  }

  return GameStateRenderer
});