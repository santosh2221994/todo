app.provider('api',
  function () {
    // declariangular like this to avoid minification conflict
    this['$get'] = [
      '$http','constants',
      function ($http,constants) {
     // var apiBase = 'https://www.todoApp.com/api';
      //var apiBase = 'http://stage.todoApp.com/api';
        // var apiBase = 'https://localhost:3000/api';
      var apiBase = constants.base;

        var api = function (method, url, options) {
            options = angular.isObject(options) ? options : {};

            options.url = url.indexOf('http') === 0 ? url : apiBase + url;

            options.method = method;

            options.data = options.data || {};


            options.headers  = options.headers || {};

           // angular.extend(options.headers, {'Authorization': session.email() ? 'Bearer '+session.email() : null});
        //   angular.extend(options.headers,{'X-Requested-With':null})
           // angular.extend(options.headers, {'email': session.email() ? 'Local ' +session.email() : null});

            options.params = options.params || {};

            return $http(options).then(function (res) {
                var data = res.data;
                return data;
            });
        };

        ['GET', 'PUT', 'POST', 'DELETE'].forEach(function (method) {
          api[method.toLowerCase()] = function (url, options) {

            return api(method, url, options);
          };
        });

        return api;
      }
    ];
  }
);
