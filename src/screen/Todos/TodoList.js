import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  TextInput,
  Button,
} from 'react-native';
import { Constants } from 'react-native-navigation';
import * as actions from '../../redux/actions/todoListAction/todoAction';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import _ from 'lodash';
import Item from './Item';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      date: '',
      deletedRowKey: null,
    };
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  generateKey = numberOfCharacters => {
    return require('random-string')({ length: numberOfCharacters });
  };

  onAddItem = () => {
    let key = this.generateKey(10);
    const item = {
      id: key,
      title: this.state.title,
      date: this.state.date,
    };

    this.props.addTask(item);
    this.setState({
      id: '',
      title: '',
      date: '',
    });
  };

  refreshTaskList = activeKey => {
    this.setState(prevState => {
      return {
        deletedRowKey: activeKey,
      };
    });
  };

  render() {
    const { tasks } = this.props;
    const groupData = _.groupBy(tasks, 'date');
    const sectionData = _.map(groupData, (value, key) => {
      return {
        title: key,
        data: value,
      };
    });

    return (
      <>
        <SafeAreaView style={styles.container}>
          {/* <FlatList
            data={this.props.tasks}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => <Item title={item.title} />}
          /> */}
          <SectionList
            sections={sectionData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => (
              <Item item={item} index={index} parentSessionList={this} />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
            rederSectionHeader={({ section }) => <Text>{section.date}</Text>}
          />
        </SafeAreaView>
        <View>
          <TextInput
            placeholder="Type"
            value={this.state.title}
            onChangeText={val => this.onChangeText('title', val)}
          />
          <DatePicker
            style={{ width: 400 }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.setState({ date: date });
            }}
            value={this.state.date}
          />
          <Button title="Add new" onPress={this.onAddItem} />
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.task.tasks,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addTask: newItem => dispatch(actions.addTask(newItem)),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },

  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  },
  imageThumbnail: {
    flex: 1,
    height: 200,
  },
  date: {
    fontSize: 30,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);
