'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');

var supportedThemes = ['dark', 'donut', 'oreo', 'tiramisu', 'azure'];

var ThemeLoader = function (_React$Component) {
  _inherits(ThemeLoader, _React$Component);

  function ThemeLoader(props) {
    _classCallCheck(this, ThemeLoader);

    var _this = _possibleConstructorReturn(this, (ThemeLoader.__proto__ || Object.getPrototypeOf(ThemeLoader)).call(this, props));

    _this.importAllThemes = _this.importAllThemes.bind(_this);
    _this.getThemeIndex = _this.getThemeIndex.bind(_this);
    _this.setTheme = _this.setTheme.bind(_this);
    _this.state = {
      themeIndex: 0,
      themes: []
    };
    return _this;
  }

  _createClass(ThemeLoader, [{
    key: 'importAllThemes',
    value: function importAllThemes() {
      supportedThemes.forEach(function (theme) {
        // load and disable the theme stylesheet
        require('./../../styles/themes/' + theme + '.less');
        var styleSheetIndex = document.styleSheets.length - 1;
        document.styleSheets[styleSheetIndex].disabled = true;

        // record the stylesheet information to state
        var themeInfo = {
          name: theme,
          styleSheetIndex: styleSheetIndex
        };
        var updatedThemes = this.state.themes;
        updatedThemes.push(themeInfo);
        this.setState({
          themes: updatedThemes
        });
      }.bind(this));

      // load the fonts used in the stylesheets
      require('./../../styles/fonts.less');
    }
  }, {
    key: 'getThemeIndex',
    value: function getThemeIndex(theme) {
      var index = this.state.themes.map(function (t) {
        return t.name;
      }).indexOf(theme);

      if (index > -1) {
        return index;
      }
      return this.getThemeIndex('dark');
    }
  }, {
    key: 'setTheme',
    value: function setTheme(theme) {
      // getting the index of the new theme in the supportedThemes array
      var newThemeIndex = this.getThemeIndex(theme);

      // setting the cookies for the new theme
      Cookies.remove('ARBITER_THEME');
      Cookies.set('ARBITER_THEME', this.state.themes[newThemeIndex].name);
      // calculating the respective indexes of the stylesheets of new theme
      //    and old theme among all the stylesheets loaded
      var oldThemeStyleSheetIndex = this.state.themes[this.state.themeIndex].styleSheetIndex;
      var newThemeStyleSheetIndex = this.state.themes[newThemeIndex].styleSheetIndex;

      // disabling the old theme stylesheet and enabling the new theme stylesheet
      document.styleSheets[oldThemeStyleSheetIndex].disabled = true;
      document.styleSheets[newThemeStyleSheetIndex].disabled = false;
      this.setState({
        themeIndex: newThemeIndex
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      // importing all the themes from files after
      this.importAllThemes();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // setting the initial theme from cookies
      var theme = Cookies.get('ARBITER_THEME');
      this.setTheme(theme);

      // changing the document class as "themeLoaded"
      document.body.className = 'themeLoaded';
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', { className: classNames('rc-ThemeLoader', supportedThemes[this.state.themeIndex]) });
    }
  }]);

  return ThemeLoader;
}(React.Component);

exports.default = ThemeLoader;
