'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');

var supportedThemes = [
  'dark',
  'donut',
  'oreo',
  'tiramisu',
  'azure'
];

class ThemeLoader extends React.Component {
  constructor(props) {
    super(props);
    this.importAllThemes = this.importAllThemes.bind(this);
    this.getThemeIndex = this.getThemeIndex.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.state = {
      themeIndex: 0,
      themes: [],
    };
  }

  importAllThemes() {
    supportedThemes.forEach(function (theme) {
      // load and disable the theme stylesheet
      require('./../../styles/themes/' + theme + '.less');
      let styleSheetIndex = document.styleSheets.length - 1;
      document.styleSheets[styleSheetIndex].disabled = true;

      // record the stylesheet information to state
      let themeInfo = {
        name: theme,
        styleSheetIndex: styleSheetIndex
      };
      let updatedThemes = this.state.themes;
      updatedThemes.push(themeInfo);
      this.setState({
        themes: updatedThemes
      });
    }.bind(this));

    // load the fonts used in the stylesheets
    require('./../../styles/fonts.less');
  }

  getThemeIndex(theme) {
    let index = this.state.themes.map(function(t) {
      return t.name;
    }).indexOf(theme);

    if (index > -1) {
      return index;
    }
    return this.getThemeIndex('dark');
  }

  setTheme(theme) {
    // getting the index of the new theme in the supportedThemes array
    let newThemeIndex = this.getThemeIndex(theme);

    // setting the cookies for the new theme
    Cookies.remove('ARBITER_THEME');
    Cookies.set('ARBITER_THEME', this.state.themes[newThemeIndex].name);
    // calculating the respective indexes of the stylesheets of new theme
    //    and old theme among all the stylesheets loaded
    let oldThemeStyleSheetIndex = this.state.themes[this.state.themeIndex].styleSheetIndex;
    let newThemeStyleSheetIndex = this.state.themes[newThemeIndex].styleSheetIndex;

    // disabling the old theme stylesheet and enabling the new theme stylesheet
    document.styleSheets[oldThemeStyleSheetIndex].disabled = true;
    document.styleSheets[newThemeStyleSheetIndex].disabled = false;
    this.setState({
      themeIndex: newThemeIndex
    });
  }

  componentWillMount() {
    // importing all the themes from files after
    this.importAllThemes();
  }

  componentDidMount() {
    // setting the initial theme from cookies
    let theme = Cookies.get('ARBITER_THEME');
    this.setTheme(theme);

    // changing the document class as "themeLoaded"
    document.body.className = 'themeLoaded';
  }

  render() {
    return (
			<div className={classNames('rc-ThemeLoader', supportedThemes[this.state.themeIndex])} />
    );
  }
}

export default ThemeLoader;
