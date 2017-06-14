define(function () {
    function MathUtil() {}

    MathUtil.getRandomInt = function (min, max) {
      if (min >= max)
        throw 'Random failed: min >= max'

      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return MathUtil
  }
);
