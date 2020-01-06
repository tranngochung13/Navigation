import React from 'react';

import axios from 'axios';
import {View, Text} from 'react-native';

export default class PersonList extends React.Component {
  state = {
    persons: [],
  };

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      const persons = res.data;
      this.setState({persons});
    });
  }

  render() {
    return (
      <View>
        {this.state.persons.map(person => (
          <View>
            <Text>{person.name}</Text>
            <Text>{person.email}</Text>
          </View>
        ))}
      </View>
    );
  }
}
