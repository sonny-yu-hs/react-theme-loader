React-Theme-Loader
=====================

React Theme Loader is a ReactJs Package that allows dynamic multiple-themes manage on a React Page for themes written in Less Stylesheets.

Using React Theme Loader allows you switching directly between theme files that are separate stylesheets

#### Requirements
- Node 6.9.1+

Node Packages:
- less
- less loader
- css loader
- style loader

This Readme file assumes that you already installed all of the packages above, please see https://github.com/webpack-contrib/less-loader for more details.

### Installation
```bash
npm install react-theme-loader --save
```

### Setting up react-theme-loader
#### package.json
"react-theme-loader" should have been added to the depencies upon installation

```js
{
  ...
  "dependencies": {
    ...
    "react-theme-loader": "version-name",
    ...
  },
  ...
}
```
#### .jsx

In your top-level React components where you want the theme styles to take effect, import the package:
```js
var ThemeLoader = require('react-theme-loader');
```
After importing the package as ThemeLoader, render ThemeLoader as a React Component
```js
render() {
  return (
      ...
      <ThemeLoader 
        ref='themeLoader'
        supportedThemes={supportedThemes}
        themeDirectory='./../../style/themes/'
        fonts='./../../style/fonts.less'
        defaultTheme='dark'
        themeCookie='CURRENT_THEME'
      />
      ...
  );
}
```
When rendering the ThemeLoader, there are certain properties we need to attach to the element; the above is just an example, please read the instructions below on filling in the props and do NOT copy the above exactly.

#####Required

"ref": pass in "themeLoader" exactly so that you have access to the functions provided by the component.

"supportedThemes": pass in an <b>array</b> of strings that represent the names of the theme files (without ".less").<br>

Example:
```js
var supportedThemes = ['dark', 'light', 'green', 'blue', 'mocha'];
```

"themeDirectory": pass in the relative path of the directory of the theme files in "supportedThemes"

#####Optional

"fonts": pass in the relative path of the fonts file. This file should contain <b>ALL</b> fonts used in the themes, and <u>do <b>NOT</b> import any fonts in the theme files since they mess up the indeces of loaded stylesheets.</u>
If "fonts" is not given, no fonts file will be loaded.

"defaultTheme": pass in the name(string) of the default theme, which will be loaded initially when no theme cookie is stored. The first theme in "supportedThemes" will be the default if not specified.

"themeCookie": pass in the name(string) of the cookie where you wish to store the current theme name, so that the browser will remember the selected theme. "CURRENT_THEME" will be used if not specified.

### Using react-theme-loader

##### Switching Themes

In the React component where ThemeLoader is rendered, simply use 
```js
this.refs.themeLoader.setTheme(theme)
```
to switch themes, where theme is the name(string) of the theme you wish to switch to.

When a theme is loaded, the ThemeLoader will render the following to HTML:
```html
<div class='rc-ThemeLoader nameOfCurrentTheme' />
```