import React from "react"
import {observer} from "mobx-react";
import NavigationBar from "../components/NavigationBar"
import MobxInteraction from "./MobxInteraction";
import Login from "./LoginPage"
import Register from "./RegisterPage"
import { Router, Route } from 'react-router-dom';
import history from "../helper/browserHistory"
import Story from "./Story";

if (typeof document !== "undefined") {
    // Require scss files
    require('../../stylesheets/_all.scss');
}

@observer
export default class Layout extends React.Component {

    render() {
        const containerStyle = {
            marginTop: "5px"
        };

        return (
            <Router history={history}>
                <div>
                    <NavigationBar location={location}/>
                    <div class="container" style={containerStyle}>
                        <div class="row">
                            <div class="col-xs-12">
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/mobxinteraction" component={MobxInteraction}/>
                                <Route exact path="/story" component={Story}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
    );
    }
}
