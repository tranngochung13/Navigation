import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Button, Text, AsyncStorage} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Login from '../Login';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {email, username} = this.props.user.user;
    console.log('user', this.props.user);

    const data = {
      email: email,
      username: username,
    };

    let token = AsyncStorage.getItem('token');

    return (
      <View>
        {token == null ? (
          ''
        ) : (
          <View>
            <Text>{email}</Text>
            <Text>{username}</Text>
            <Button
              onPress={async () => {
                try {
                  let token1 = await AsyncStorage.getItem('token');

                  console.log('token', token1);

                  await AsyncStorage.removeItem('token');
                  Navigation.setRoot({
                    root: {
                      stack: {
                        children: [
                          {
                            component: {
                              name: 'Login',
                              options: {
                                topBar: {
                                  backButton: {
                                    visible: false,
                                  },
                                  title: {
                                    text: 'Login',
                                    alignment: 'center',
                                    fontSize: 30,
                                  },
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  });
                  //  return true;
                } catch (error) {
                  console.log(error);
                }
              }}
              title="Sign Out"
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('state.user', state.user);
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // loginHandle: data => dispatch(loginUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
