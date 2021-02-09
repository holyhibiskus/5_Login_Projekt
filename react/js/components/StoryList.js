import React from "react";

// Cards und Images und Icons importieren
import { Form, Modal, Header, Button, Table, Icon } from 'semantic-ui-react'

// observer einbinden
import { observer } from "mobx-react";

// der Store auf den gehört werden soll, muss eingebunden werden
import storyStore from "../stores/storySqlStore"
import userStore from "../stores/userStore";

// mit der Annotation @observer ist die Komponente fähig als Observer zu fungieren.
@observer
export default class StoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {modalOpen : false}
        this.newStory = {};
        storyStore.fetchStories();
    }

    reloadClicked() {
        storyStore.fetchStories();
    }

    tableRowClicked(story) {
        storyStore.selectStory(story);
        console.log(story);
    }

    removeClicked(story) {
        console.log("remove");
        console.log(story);
        storyStore.deleteStory(story.idstory);
    }

    saveNewStoryClicked() {
        // modal schließen
        this.setState({ modalOpen: false })
        console.log(this.newStory);
        storyStore.addNewStory(this.newStory);
    }

    openModal() {
        this.newStory = {};
        this.setState({ modalOpen: true });
    }

    titleChanged(e){
        console.log(e.target.value);
        this.newStory.title = e.target.value;
    }

    themeChanged(e){
        console.log(e.target.value);
        this.newStory.theme = e.target.value;
    }

    authorChanged(e){
        console.log(e.target.value);
        this.newStory.creator = e.target.value;
    }

    // nachdem der neue Text geladen wurde, wird die Komponente neu gerendert.
    render() {
        // nachdem die Stories geladen wurden, wird die Komponenten gerendert
        const {storiesFromServer} = storyStore;
        const storyArray = [...storiesFromServer];

        console.log("Render Component");
        console.log(storyArray);
        const TableRowsCars = storyArray.map((story,i) =>
            <Table.Row key={story.idstory} onClick={this.tableRowClicked.bind(this,story)}>
                <Table.Cell> { story.title }</Table.Cell>
                <Table.Cell> { story.theme }</Table.Cell>
                <Table.Cell> { story.creator }</Table.Cell>
                { userStore.userFromServer !== null ? <Table.Cell onClick={this.removeClicked.bind(this,story)}><Icon name="remove" /></Table.Cell> : <Table.Cell>Log in to delete!</Table.Cell> }
            </Table.Row>);
        return (
            <div>
                <Button onClick={this.reloadClicked.bind(this)}>Reload</Button>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Story</Table.HeaderCell>
                            <Table.HeaderCell>Theme</Table.HeaderCell>
                            <Table.HeaderCell>Author</Table.HeaderCell>
                            <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {  TableRowsCars  }
                    </Table.Body>
                </Table>
                { userStore.userFromServer !== null ?
                    <Modal
                        trigger={<Button onClick={this.openModal.bind(this)}>Create new Story</Button>}
                        open={this.state.modalOpen}
                        onClose={this.close}
                        style={{margin: "auto"}}
                    >
                        <Modal.Header>Insert new Story</Modal.Header>
                        <Modal.Content>

                            <Modal.Description>

                                <Form>
                                    <Form.Field>
                                        <label>Storytitle</label>
                                        <input placeholder='Storytitle' onChange={this.titleChanged.bind(this)} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Theme</label>
                                        <input placeholder='Theme eg. Fantasy' onChange={this.themeChanged.bind(this)} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Author</label>
                                        <input placeholder='Author' onChange={this.authorChanged.bind(this)} />
                                    </Form.Field>
                                    <Button type="button" onClick={this.saveNewStoryClicked.bind(this)}>Save</Button>
                                </Form>

                            </Modal.Description>
                        </Modal.Content>
                    </Modal> :
                    <p>Log in to create stories!</p>}
            </div>
        );
    }
}
