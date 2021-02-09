import React from "react";

// Cards und Images und Icons importieren
import { Icon, Card, Image } from 'semantic-ui-react'

// observer einbinden
import { observer } from "mobx-react";

// der Store auf den gehört werden soll, muss eingebunden werden
import storyStore from "../stores/storyStore"


// mit der Annotation @observer ist die Komponente fähig als Observer zu fungieren.
@observer
export default class CarDetail extends React.Component {
    constructor(props) {
        super(props);
    }


    // nachdem der neue Text geladen wurde, wird die Komponente neu gerendert.
    render() {
        const {selectedStory} = storyStore;
        return (
            <div>
                <Card>
                    <Card.Content>
                        <Card.Header>Story:</Card.Header>
                        <Card.Description>
                            {selectedStory.name}
                            <br />
                            {"Author: " + selectedStory.author}
                            <br />
                            {"Theme: " + selectedStory.theme}
                            <br />
                            {selectedStory.text}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}
