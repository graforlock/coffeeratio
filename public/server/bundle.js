/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-apollo");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(20);

var _express = __webpack_require__(17);

var _express2 = _interopRequireDefault(_express);

var _graphqlServerExpress = __webpack_require__(18);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(23);

var _server2 = _interopRequireDefault(_server);

var _reactApollo = __webpack_require__(1);

var _transport = __webpack_require__(14);

var _transport2 = _interopRequireDefault(_transport);

var _path = __webpack_require__(21);

var _path2 = _interopRequireDefault(_path);

var _Html = __webpack_require__(5);

var _Html2 = _interopRequireDefault(_Html);

var _routes = __webpack_require__(10);

var _routes2 = _interopRequireDefault(_routes);

var _reactRouter = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import cors from 'cors';
var bodyParser = __webpack_require__(16);

var _require = __webpack_require__(13),
    schema = _require.schema;

var PORT = 4000;

var server = (0, _express2.default)();

server.use('/static', _express2.default.static(_path2.default.join(process.cwd(), 'public/client')));

server.use('/graphql', bodyParser.json(), (0, _graphqlServerExpress.graphqlExpress)({ schema: schema }));

server.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));

server.use(function (req, res) {
  (0, _reactRouter.match)({ routes: _routes2.default, location: req.originalUrl }, function (error, redirectLocation, renderProps) {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', error);
      // eslint-disable-line no-console
      res.status(500);
    } else if (renderProps) {
      var client = new _reactApollo.ApolloClient({
        addTypename: true,
        dataIdFromObject: function dataIdFromObject(result) {
          if (result.id && result.__typename) {
            // eslint-disable-line no-underscore-dangle
            return result.__typename + result.id; // eslint-disable-line no-underscore-dangle
          }
          return null;
        },
        ssrMode: true,
        networkInterface: (0, _transport2.default)('http://localhost:4000', {
          cookie: req.header('Cookie')
        })
      });

      var component = _react2.default.createElement(
        _reactApollo.ApolloProvider,
        { client: client },
        _react2.default.createElement(_reactRouter.RouterContext, renderProps)
      );

      (0, _reactApollo.renderToStringWithData)(component).then(function (content) {
        var data = client.store.getState().apollo.data;
        res.status(200);

        var html = _react2.default.createElement(_Html2.default, { content: content, state: { apollo: { data: data } } });
        res.send('<!doctype html>\n' + _server2.default.renderToStaticMarkup(html));
        res.end();
      }).catch(function (e) {
        console.error('RENDERING ERROR:', e);
        // eslint-disable-line no-console
        res.status(500);
        res.end('An error occurred. Please submit an issue to [https://github.com/apollographql/GitHunt-React] with the following stack trace:\n\n' + e.stack);
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

server.listen(PORT, function () {
  return console.log('GraphQL Server is now running on http://localhost:' + PORT);
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Html = function Html(_ref) {
  var content = _ref.content,
      state = _ref.state;
  return _react2.default.createElement(
    "html",
    { lang: "en" },
    _react2.default.createElement(
      "head",
      null,
      _react2.default.createElement("meta", { charSet: "utf-8" }),
      _react2.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      _react2.default.createElement("link", {
        rel: "stylesheet",
        href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css",
        integrity: "sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7",
        crossOrigin: "anonymous"
      }),
      _react2.default.createElement(
        "title",
        null,
        "GitHunt"
      )
    ),
    _react2.default.createElement(
      "body",
      null,
      _react2.default.createElement("div", { id: "content", dangerouslySetInnerHTML: { __html: content } }),
      _react2.default.createElement(
        "div",
        { id: "footer" },
        _react2.default.createElement(
          "ul",
          null,
          _react2.default.createElement(
            "li",
            null,
            "Fork on ",
            _react2.default.createElement(
              "a",
              { href: "https://github.com/apollostack/GitHunt" },
              "Github"
            )
          ),
          _react2.default.createElement(
            "li",
            null,
            "This is an",
            ' ',
            _react2.default.createElement(
              "a",
              { href: "http://www.apollostack.com/" },
              "Apollo"
            ),
            ' ',
            "example app"
          )
        )
      ),
      _react2.default.createElement("script", {
        dangerouslySetInnerHTML: {
          __html: "window.__APOLLO_STATE__=" + JSON.stringify(state) + ";"
        },
        charSet: "UTF-8"
      }),
      _react2.default.createElement("script", { src: "/static/bundle.js", charSet: "UTF-8" })
    )
  );
}; /* eslint-disable react/no-danger */

Html.propTypes = {
  content: _react.PropTypes.string.isRequired,
  // eslint-disable-line react/forbid-prop-types
  state: _react.PropTypes.object.isRequired
};

exports.default = Html;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methodContainerQuery = undefined;

var _templateObject = _taggedTemplateLiteral(['\n   query MethodContainerQuery($name: String) {\n       brewMethods(name: $name) {\n           id\n           name\n     }\n   }\n '], ['\n   query MethodContainerQuery($name: String) {\n       brewMethods(name: $name) {\n           id\n           name\n     }\n   }\n ']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactApollo = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var MethodContainer = function MethodContainer(_ref) {
  var _ref$data = _ref.data,
      loading = _ref$data.loading,
      error = _ref$data.error,
      brewMethods = _ref$data.brewMethods;

  if (loading) {
    return _react2.default.createElement(
      'p',
      null,
      'Loading ...'
    );
  } else if (error) {
    return _react2.default.createElement(
      'p',
      null,
      error.message
    );
  }

  return _react2.default.createElement(
    'ul',
    null,
    brewMethods.map(function (method) {
      return _react2.default.createElement(
        'li',
        null,
        method.name
      );
    })
  );
};

var methodContainerQuery = exports.methodContainerQuery = (0, _reactApollo.gql)(_templateObject);

exports.default = (0, _reactApollo.graphql)(methodContainerQuery, {
  options: { pollInterval: 5000 }
})(MethodContainer);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  return _react2.default.createElement(
    "div",
    { className: "App" },
    props.children
  );
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hello = function Hello(_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    'div',
    null,
    name
  );
};

Hello.defaultProps = { name: 'World' };

exports.default = Hello;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _MethodContainer = __webpack_require__(6);

var _MethodContainer2 = _interopRequireDefault(_MethodContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MethodPage = function MethodPage(_ref) {
  var name = _ref.name;
  return _react2.default.createElement(_MethodContainer2.default, { name: name });
};

MethodPage.defaultProps = { name: 'Espresso' };

exports.default = MethodPage;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(2);

var _layout = __webpack_require__(7);

var _layout2 = _interopRequireDefault(_layout);

var _MainPage = __webpack_require__(8);

var _MainPage2 = _interopRequireDefault(_MainPage);

var _MethodPage = __webpack_require__(9);

var _MethodPage2 = _interopRequireDefault(_MethodPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { component: _layout2.default },
  _react2.default.createElement(_reactRouter.Route, { path: '/', component: _MainPage2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/:method', component: _MethodPage2.default })
);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = { persistedQueries: false };

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _brewMethods = [{
  id: 1,
  name: 'AeroPress',
  keywords: [],
  description: 'desc',
  image: '',
  ratios: ['15:1', '16:1'],
  recipes: []
}, {
  id: 2,
  name: 'Drip/Pour Over',
  keywords: [],
  description: 'desc',
  image: '',
  ratios: ['15:1'],
  recipes: []
}, {
  id: 3,
  name: 'French Press',
  keywords: [],
  description: 'desc',
  image: '',
  ratios: ['16:1'],
  recipes: []
}, {
  id: 4,
  name: 'Turkish Pot/Cezve',
  keywords: [],
  description: 'desc',
  image: '',
  ratios: ['16:1'],
  recipes: []
}, {
  id: 5,
  name: 'Espresso',
  keywords: [],
  description: 'desc',
  image: '',
  ratios: ['16:1'],
  recipes: []
}];

var nextId = _brewMethods[_brewMethods.length - 1].id;

module.exports = {
  // Mutation: {
  //     addChannel: (root, args) => {
  //         const newChannel = { id: nextId++, name: args.name };
  //         brewMethods.push(newChannel);
  //         return newChannel;
  //     },
  // }
  Query: {
    brewMethods: function brewMethods() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (name === '') {
        return _brewMethods;
      }
      return _brewMethods.find(function (method) {
        return method.name === name;
      });
    }
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// src/schema.js
var _require = __webpack_require__(19),
    makeExecutableSchema = _require.makeExecutableSchema;

var resolvers = __webpack_require__(12);

var typeDefs = '\ntype BrewMethod {\n   id: ID!                \n   name: String!\n   image: String!\n   description: String!\n   ratios: [String]\n   recipes: [Recipe]\n}\n\ntype Recipe {\n    id: ID!\n    name: String!\n    steps: [String]\n}\ntype Query {\n   brewMethods(name: String): [BrewMethod]\n}\n';

var schema = makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });
module.exports = { schema: schema };

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNetworkInterface;

var _persistgraphql = __webpack_require__(22);

var _extracted_queries = __webpack_require__(15);

var _extracted_queries2 = _interopRequireDefault(_extracted_queries);

var _config = __webpack_require__(11);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns either a standard, fetch-full-query network interface or a
// persisted query network interface (from `extractgql`) depending on
// the configuration within `./config.js.`
function getNetworkInterface() {
  var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new _persistgraphql.PersistedQueryNetworkInterface({
    queryMap: _extracted_queries2.default,
    uri: host + '/graphql',
    opts: { credentials: 'same-origin', headers: headers },
    enablePersistedQueries: _config2.default.persistedQueries
  });
}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {
	"mutation addChannel($name: String!) {\n  addChannel(name: $name) {\n    id\n    name\n    __typename\n  }\n}\n": 1,
	"query ChannelsListQuery {\n  channels {\n    id\n    name\n    __typename\n  }\n}\n": 2
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("graphql-server-express");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("persistgraphql");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(3);


/***/ })
/******/ ]);