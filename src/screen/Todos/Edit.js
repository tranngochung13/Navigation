import React, { Component } from 'react';
import {
  TextInput,
  Text,
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Navigation } from 'react-native-navigation';
import { actUpdateItem } from '../../redux/actions/todoListAction/todoAction';
import { connect } from 'react-redux';

class Edit extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = {
      id: '',
      title: '',
      date: '',
    };
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  onUpdate = id => {
    const task = {
      id: id,
      title: this.state.title,
      date: this.state.date,
    };
    this.props.onUpdatetask(id, task);
    Navigation.dismissModal(this.props.componentId);
  };

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      id: data.id,
      title: data.title,
      date: data.date,
    });
  }

  render() {
    const { title, date } = this.state;
    console.log(this.props.tasks);
    return (
      <View>
        <ScrollView style={styles.scrollView}>
          <TextInput>
            {title}
          </TextInput>
          <DatePicker
            style={{ width: 400 }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={date => {
              this.setState({ date: date });
            }}
            value={this.state.date}
          />
          <TouchableHighlight onPress={() => this.onUpdate(this.state)}>
            <Text>Update</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
  },
  name: {
    position: 'absolute',
    marginTop: 275,
    fontSize: 20,
  },
  imageThumbnail: {
    height: 300,
  },
  imageThumbnail1: {
    height: 150,
    width: 160,
    borderRadius: 15,
    margin: 10,
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdatetask: task => dispatch(actUpdateItem(id, task)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
