import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  TextInput,
  Button,
  FlatList,
  Alert,
} from 'react-native';
import {Constants} from 'react-native-navigation';
import * as actions from '../../redux/actions/todoListAction/todoAction';
import {connect} from 'react-redux';
import Swipeout from 'react-native-swipeout';
import {Navigation} from 'react-native-navigation';
import {onShowModalEdit} from '../../navigation';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
    };
  }

  onDelete = id => {
    this.props.onDelete(id);
  };

  render() {
    const swipeSettings = {
      autoClose: true,
      right: [
        {
          onPress: () => {
            const deletingRow = this.state.activeRowKey;
            Alert.alert(
              'Alert',
              'Are you sure you want to delete ?',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    this.onDelete(this.props.item.id);
                    this.props.parentSessionList.refreshTaskList(deletingRow);
                  },
                },
              ],
              {cancelable: true},
            );
          },
          text: 'Delete',
          type: 'delete',
        },
        {
          onPress: () => {
            Navigation.showModal({
              stack: {
                children: [
                  {
                    component: {
                      name: 'Edit',
                      passProps: {
                        data: item,
                      },
                      options: {
                        topBar: {
                          title: {
                            text: item.title,
                            fontSize: 30,
                            alignment: 'center',
                          },
                          rightButtons: [
                            {
                              id: 'close',
                              icon: require('../asset/image/comback.png'),
                            },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            });
          },
          text: 'Update',
          type: 'update',
        },
      ],
    };

    const {item} = this.props;

    return (
      <View style={styles.item}>
        <Swipeout {...swipeSettings}>
          <Text style={styles.title}>{item.title}</Text>
        </Swipeout>
      </View>
    );
  }
}

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

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => dispatch(actions.onDeleteTask(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
