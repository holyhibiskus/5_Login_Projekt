import 'babel-polyfill';
import 'core-js/es/map';
import 'core-js/es/set';
import 'raf/polyfill';
import 'whatwg-fetch';
import React from "react"
import ReactDOM from "react-dom"
import Layout from "./pages/Layout"


const app = document.getElementById('app');

ReactDOM.render(
        <Layout />,
    app);