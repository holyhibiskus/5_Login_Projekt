import React from "react";
import { Icon, Grid, Image } from 'semantic-ui-react'
import StoryList from "../components/StoryList";
import StoryDetail from "../components/StoryDetail";

export default class Cars extends React.Component {
    render() {
        return (
            <div>
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <StoryList />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <StoryDetail />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}
