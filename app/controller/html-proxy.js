define(function () {

  function HtmlProxy(controller) {
    this.register = function () {

      document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37)
          controller.left()
        else if(event.keyCode == 38)
          controller.up()
        else if(event.keyCode == 39)
          controller.right()
        else if(event.keyCode == 40)
          controller.down()
        else if(event.keyCode == 32)
          controller.space()
      });

    }
  }

  return HtmlProxy
});