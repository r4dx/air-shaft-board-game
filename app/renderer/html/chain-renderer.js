define(function ($) {

  function ChainRenderer(renderers) {

    this.render = function () {
      for (var i = 0; i < renderers.length; i++) {
        var renderer = renderers[i]
        renderer.render()
      }
    }
  }

  return ChainRenderer
});