import React, {Component} from 'react';
import {View, StyleSheet, TouchableNativeFeedback, Text} from 'react-native';

export default class Button extends Component {
  render() {
    const {submit, labelSubmit} = this.props;
    return (
      <TouchableNativeFeedback
        onPress={submit ? submit : ''}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={[styles.borders2]}>
          <Text style={styles.fontSizeText}>
            {labelSubmit ? labelSubmit : ''}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  borders2: {
    flex: 1,
    fontWeight: 'bold',
    borderColor: 'pink',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    height: 55,
    borderRadius: 15,
    backgroundColor: 'skyblue',
    margin: 10,
  },
});
