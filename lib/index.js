/*global angular */

var module = angular.module('less', []);

module.factory('$lessFileManager', ['$window', '$q', '$http', '$templateCache',
function($window, $q, $http, $templateCache) {
    var AbstractFileManager = require("less/lib/less/environment/abstract-file-manager.js");
    var fm = new AbstractFileManager();

    fm.supports = fm.alwaysMakePathsAbsolute = function() {
        return true;
    };

    fm.loadFile = function(filename, currentDirectory) {
        if (currentDirectory && !this.isPathAbsolute(filename))
            filename = currentDirectory + filename;
        filename = this.extractUrlParts(filename, $window.location.href).url;
        return $http.get(filename, {
            cache: $templateCache,
            transformResponse: []
        }).then(function(resp) {
            return {
                contents: resp.data,
                filename: filename,
                webInfo: {
                    lastModified: resp.headers('Last-Modified')
                }
            };
        }, function(resp) {
            return $q.reject({
                type: 'File',
                href: filename,
                message: "'" + filename + "' wasn't found (" + resp.status + ")",
            });
        });
    };

    return fm;
}]);

module.factory('$less', ['$lessFileManager',
function($lessFileManager) {
    var less = require('less/lib/less')();

    less.environment.addFileManager($lessFileManager);

    less.loadFile = function(filename) {
        return $lessFileManager.loadFile(filename);
    };

    less.parseFile = function(filename, options, callback) {
        if (!options)
            options = {};
        if (options.filename === undefined)
            options.filename = filename;

        return $lessFileManager.loadFile(filename).then(function(obj) {
            return less.parse(obj.contents, options, callback);
        }, function(err) {
            if (callback)
                callback(err);
        });
    };

    less.renderFile = function(filename, options, callback) {
        if (!options)
            options = {};
        if (options.filename === undefined)
            options.filename = filename;

        return $lessFileManager.loadFile(filename).then(function(obj) {
            return less.render(obj.contents, options);
        }, function(err) {
            if (callback)
                callback(err);
        });
    };

    return less;
}]);
