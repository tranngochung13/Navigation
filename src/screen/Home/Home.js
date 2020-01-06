import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {DATA} from '../../utils/contans';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {onShowModalDetail} from '../../navigation';

class Home extends Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    Navigation.pop(null);
    return true;
  };

  onPressItem = item => {
    onShowModalDetail(item);
  };

  renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={styles.item}
          onPress={() => this.onPressItem(item)}>
          <Image style={styles.imageThumbnail} source={{uri: item.imageUrl}} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => this.onPressItem(item)}>
          <Text style={styles.date}>{item.date.en}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => this.onPressItem(item)}>
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => this.onPressItem(item)}>
          <Text style={styles.address}>{item.address.en}</Text>
        </TouchableOpacity>
      </>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
          // onEndThread => load data
          // onRefresh
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  item: {
    flex: 1,
  },
  title: {
    fontSize: 30,
  },
  address: {
    fontSize: 20,
    color: 'pink',
  },
  date: {
    fontSize: 16,
    color: 'red',
  },
  imageThumbnail: {
    flex: 1,
    height: 200,
    borderRadius: 15,
  },
});

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // registerHandle: (data) => dispatch(addUser(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
