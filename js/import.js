;(function (window) {
  var Plugins = [
    {'src': '/themes/masizime/js/vendor/jquery.min.js'},
    {'src': '/themes/masizime/js/vendor/modernizr.js'},
    {'src': '/themes/masizime/js/vendor/jquery.easing.min.js'},
    {'src': '/themes/masizime/js/vendor/underscore.js'},
    {'src': '/themes/masizime/js/vendor/device.min.js'},
    {'src': '/themes/masizime/js/vendor/response.min.js'}
  ];

  var jsTag = document.getElementsByTagName('script');
  var len = len = Plugins.length;

  for(var i = 0; i < len; i++){
    document.write('<script src="' + Plugins[i].src + '"></script>');
  }

  var userAgent = window.navigator.userAgent.toLowerCase();
  var appVersion = window.navigator.appVersion.toLowerCase();

  if (userAgent.indexOf("msie") > -1) {
    if (appVersion.indexOf("msie 8.0") > -1 || appVersion.indexOf("msie 7.0") > -1 || appVersion.indexOf("msie 6.0") > -1) {
      document.write('<script src="/themes/masizime/js/vendor/jquery.backgroundSize.js"></script>');
    }
  }

}(window));
