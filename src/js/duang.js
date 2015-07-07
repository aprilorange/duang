'use strict';
(function(W, D, $) {

  function duang(argv) {
    var el = argv[0];
    this.dom = el;
    this.element = $(this.dom);
    this.__wrapped = false;
  }

  duang.prototype = {
    constructor: duang,
    wildcard: function(type, text, position, classNames) {
      position = position || 'right';
      this.element.each(function(i, element) {
        element = $(element);
        var el = element.parent();
        if (el.attr('id') != 'duang-parent' && !this.__wrapped) {
          element.wrap('<div id="duang-parent"></div>');
          el = element.parent();
          this.__wrapped = true;
        }
        el.removeClass(function(index, css) {
          return (css.match(/(^|\s)hint--\S+/g) || []).join(' ');
        })
        el
          .attr('data-hint', text)
          .addClass('hint--' + position)
          .addClass('hint--' + type)
          .addClass('hint--duang')
        if (classNames) {
          el.addClass(classNames);
        }
      })
      return this;
    },
    rip: function() {
      var el = this.element.parent();
      el.removeClass(function(index, css) {
        return (css.match(/(^|\s)hint--\S+/g) || []).join(' ');
      })
      el.removeAttr('data-hint');
    }
  }

  var methods = ['error', 'success', 'info', 'warning'];
  $.each(methods, function(i, name) {
    duang.prototype[name] = function(text, position, classNames) {
      W.duang(this.dom).wildcard(name, text, position, classNames);
    }
  });

  W.duang = function() {
    return new duang(arguments);
  }

})(window, document, jQuery);
