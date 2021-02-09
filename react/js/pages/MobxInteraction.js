import React from "react";
import { Grid, Image } from 'semantic-ui-react'
import RabbitSwitch from '../components/RabbitSwitch'
import RabbitCards from '../components/RabbitCards'
import RabbitName from '../components/RabbitName'

export default class MobxInteraction extends React.Component {
  render() {
    return (
      <div>
        <Grid celled>
        <Grid.Row>
      		<Grid.Column width={4}>
      			<RabbitSwitch />
      		</Grid.Column>
      		<Grid.Column width={3}>
        		<RabbitCards />
      		</Grid.Column>
            <Grid.Column width={6}>
                <RabbitName />
            </Grid.Column>
        </Grid.Row>
        </Grid>
      </div>
    );
  }
}
