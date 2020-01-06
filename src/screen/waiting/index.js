import React, {Component} from 'react';
import {View, StyleSheet, AsyncStorage, ActivityIndicator} from 'react-native';
import {onLogin, onChangeIntoMainScreen} from '../../navigation';
import {loginUser, initUser} from '../../redux/actions/userAction/action';
import {connect} from 'react-redux';

class Waiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secure: true,
      email: '',
      password: '',

      emailError: '',
      passwordError: '',

      loading: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then(data => {
      const dataObject = JSON.parse(data);
      console.log('dataObject', dataObject);
      if (!data || data === '') {
        onLogin();
      } else {
        this.props.initUser(dataObject);
        onChangeIntoMainScreen();
      }
    });
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}

const mapStateToProps = data => {
  return {
    user: data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginHandle: data => dispatch(loginUser(data)),
    initUser: data => dispatch(initUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Waiting);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
