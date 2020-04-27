app.provider('session',
  function () {
    this['$get'] = [
      'cache',
      function (cache) {
        var email = null;
        var name = null; 

        var session = {
          load: function () {
            name = cache('auth.name');
            email = cache('auth.email');
            return this;
          },
          
          set: function (name,email,) {
            cache('auth.name', name);
            cache('auth.email', email);
            return session.load();
          },
          name: function () {
            return name;
          },

          email: function () {
            return email;
          },
          clear: function () {
            cache.remove('auth.email');
            cache.remove('auth.name');
            return this;
          }
        };

        return session;
      }
    ];
  }
);