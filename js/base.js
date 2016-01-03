;(function (window) {
   var Plugins = [
      {'src': '/js/base/vendor/1jquery.js'},
      {'src': '/js/base/vendor/2modernizr.js'},
      {'src': '/js/base/vendor/3device.js'},
      {'src': '/js/base/vendor/jquery.easing.js'},
      {'src': '/js/base/vendor/underscore.js'},
      {'src': '/js/base/plugin.js'},
      {'src': '/js/base/common.js'}
   ];

   var jsTag = document.getElementsByTagName('script');
   var len = len = Plugins.length;

   for(var i = 0; i < len; i++){
      document.write('<script src="' + Plugins[i].src + '"></script>');
   }

}(window));
