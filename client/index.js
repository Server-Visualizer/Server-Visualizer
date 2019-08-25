const React = require('react');
const { render } = require('react-dom');
import App from './App.jsx';
import style from './style.scss'

render(<App />, document.querySelector('#root'));
