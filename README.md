## angular-lessjs

A small [Less.js] wrapper that exposes it as an [AngularJS] service for
programmatic usage in the browser, and handles imports using `$http` and
`$templateCache`.

    angular.module('myModule', ['less'])
        .run(function($less) {
            $less.render('body { background: pink }').then(function(res) {
                console.log(res.css);
            });
        });

The `$less` service is Less.js itself, like anywhere else, but with these
additional methods:

 - `loadFile(filename)`:
   Alias for `$lessFileManager.loadFile`.

 - `renderFile(filename, [options], [callback])`:
   Load a file using `loadFile` then render it.

 - `parseFile(filename, [options], [callback])`:
   Load a file using `loadFile` then parse it.

The Less.js file manager implementation is exposed as `$lessFileManager`.

 [Less.js]: http://lesscss.org/
 [AngularJS]: https://angularjs.org/
