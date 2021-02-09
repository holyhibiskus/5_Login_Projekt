import React from "react";
import { Icon, Grid, Image } from 'semantic-ui-react'
import CarsList from '../components/CarsList'
import CarDetail from '../components/CarDetail'

export default class Cars extends React.Component {
    render() {
        return (
            <div>
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <CarsList />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <CarDetail />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}