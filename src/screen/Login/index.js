import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  AsyncStorage,
} from 'react-native';
import Form from '../../components/Form';
import Submit from '../../components/Button';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import store from '../../redux/store';
import {onChangeIntoMainScreen, onRegister} from '../../navigation';
import {loginUser, initUser} from '../../redux/actions/userAction/action';
import {connect} from 'react-redux';

class Login extends Component {
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

  onRestart = () => {
    this.setState({emailError: ''});
    this.setState({passwordError: ''});
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then(data => {
      if (!data || data === '') {
        this.setState({loading: true});
      }
    });
  }

  onLogin = () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    this.onRestart();
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (data.email === '') {
      this.setState({emailError: 'You need type email'});
    } else if (reg.test(data.email) === false) {
      this.setState({emailError: 'Email wrong'});
    } else if (data.password === '') {
      this.setState({passwordError: 'You need type password'});
    } else {
      this.props.loginHandle(data);
    }
  };

  onChangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    if (!this.state.loading) {
      return <View />;
    }

    const isEmpty = v => {
      return Object.keys(v).length === 0;
    };

    const a = {},
      b = {x: 1888},
      c = {m: '', n: '2'};

    console.log(isEmpty(this.state.email)); // true
    console.log(isEmpty(b.x)); // false
    console.log(isEmpty(c.m)); // false

    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Form
              labelName="Email*"
              placeHolder="john123@gmail.com"
              getData={val => this.onChangeText('email', val)}
              valueError={this.state.emailError}
            />
            <Form
              labelName="Password*"
              placeHolder="****************"
              getData={val => this.onChangeText('password', val)}
              valueError={this.state.passwordError}
              isSecure={true}
            />

            <View style={styles.buttonSubmit}>
              <Submit submit={this.onLogin} labelSubmit="Login" />
              <Submit submit={onRegister} labelSubmit="Register" />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  buttonSubmit: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 15,
  },
});
