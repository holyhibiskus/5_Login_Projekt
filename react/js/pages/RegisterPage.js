import React from "react";
import {observer} from "mobx-react";
import history from "../helper/browserHistory"

import userStore from "../stores/userStore";
import {observable} from "mobx";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";

const defaultErrorMessage = 'Alle Felder müssen befüllt werden und die Passwörter übereinstimmen.';
const dublicateErrorMessage = 'Login und Email müssen einzigartig sein.';


@observer
export default class RegisterPage extends React.Component {

    @observable
    users = [];

    @observable
    errorNewUser = false;

    @observable
    errorMessage = defaultErrorMessage;

    @observable
    user = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        passwordRepeat: "",
        admin: false,
        roles: [],
        rolesEdit: false
    };

    constructor(props) {
        super(props);
        console.log("REGISTER")

    }

    //Beim Schließen des Modals, werden die Werte auf 0 (bzw. bei Strings auf "") zurückgesetzt, damit beim erneuten
    // Öffnen des Modals nicht die alten Werte in die Felder übernommen werden.
    closeInput() {
        this.user = {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            passwordRepeat: "",
            id: 0
        };

        this.loadingNewUser = false;
    }

    //Die im Modal eingetragenen Daten werden in diese Funktion übergeben. Es wird mit Hilfe des Typs festgestellt,
    // welchen Wert man verändern/beschreiben möchte. Wurde der Typ erkannt wird die observable Variable mit dem
    // eingegebenen Wert überschrieben
    handleInputChange(type, event, data) {
        if (type === 'firstName') {
            this.user.firstName = data.value;
        } else if (type === 'lastName') {
            this.user.lastName = data.value;
        } else if (type === 'email') {
            this.user.email = data.value;
        } else if (type === 'username') {
            this.user.username = data.value;
        } else if (type === 'password') {
            this.user.password = data.value;
        } else if (type === 'passwordRepeat') {
            this.user.passwordRepeat = data.value;
        } else if (type === 'admin') {
            this.user.admin = !this.user.admin;
        } else if (type === 'rolesEdit') {
            this.user.rolesEdit = !this.user.rolesEdit;
        }
    }

    //Überprüft, ob der Benutzername und/oder das Passwort schon vorhanden ist und gibt eine Fehlermeldung zurück falls
    // der Benutzername oder das Passwort bereits vorhanden sind.
    isUnique() {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].username === this.user.username ||
                this.users[i].email === this.user.email) {
                this.errorMessage = dublicateErrorMessage;
                return false;
            }
        }
        return true;
    }

    //Bevor ein (neuer) Benutzer registreirt wird, werden die eingegebenen Werte überprüft ob Sie 0 sind. Ansonsten
    // wird eine Fehlermeldung im Modal ausgegeben.
    //Ebenfalls wird die Funktion "isUnique" aufgerufen, die überprüft, ob der Benutzername und/oder das Passwort schon
    // vorhanden ist.
    register() {
        if (this.user.password !== this.user.passwordRepeat ||
            this.user.password.length === 0 ||
            this.user.firstName.length === 0 ||
            this.user.lastName.length === 0 || this.user.email.length === 0 || !this.isUnique()
        ) {
            this.errorNewUser = true;
            return;
        }
        //Wenn keine Fehlermeldung aufgerufen wurde, wird die registerUser-Funktion im userStore aufgerufen.
        userStore.registerUser(this.user);
        //Anschließend wird die closeInput-Funktion aufgerufen, die die Variablen für die Eingabewerte zurücksetzt und
        // das EingabeModal schließt.
        this.closeInput();
        //LetztenEndes wird man auf die Login-Seite zurückgeleitet
        history.push('/login');
    }


    render() {
        return (
            <div>
                <Segment>
                    <h1>Registrierung</h1>
                    <Form error={this.errorNewUser}>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Vorname</label>
                                <Form.Input fluid value={this.user.firstName}
                                            onChange={this.handleInputChange.bind(this, 'firstName')}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Nachname</label>
                                <Form.Input fluid value={this.user.lastName}
                                            onChange={this.handleInputChange.bind(this, 'lastName')}/>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Loginname/Username</label>
                                <Form.Input fluid value={this.user.username}
                                            onChange={this.handleInputChange.bind(this, 'username')}/>
                            </Form.Field>
                            <Form.Field>
                                <label>E-Mail</label>
                                <Form.Input fluid value={this.user.email}
                                            type='email'
                                            onChange={this.handleInputChange.bind(this, 'email')}/>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Passwort</label>
                                <Form.Input fluid value={this.user.password}
                                            type='password'
                                            onChange={this.handleInputChange.bind(this, 'password')}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Passwort wiederholen</label>
                                <Form.Input fluid value={this.user.passwordRepeat}
                                            type='password'
                                            onChange={this.handleInputChange.bind(this, 'passwordRepeat')}/>
                            </Form.Field>
                        </Form.Group>
                        <Message
                            error
                            header='Fehler'
                            content={this.errorMessage}
                        />
                    </Form>
                    <Button onClick={this.register.bind(this)} type='submit'>Registrieren</Button>
                </Segment>
            </div>

        );
    }
}