import React, {Component} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  FlatList,
  View,
  ScrollView,
} from 'react-native';
import {DATA} from '../../utils/contans';
import {Navigation} from 'react-native-navigation';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  renderItem = ({item}) => {
    return (
      <>
        <Image style={styles.imageThumbnail1} source={{uri: item.imageUrl}} />
      </>
    );
  };

  navigationButtonPressed = ({buttonId}) => {
    const {componentId} = this.props;
    if (buttonId === 'close') {
      Navigation.dismissModal(componentId);
    }
  };

  render() {
    const {
      title,
      coordinate,
      address,
      subtitle,
      nameEvent,
      illustration,
      listImagesKey,
      imageUrl,
    } = this.props.data;
    return (
      <View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Image style={styles.imageThumbnail} source={{uri: imageUrl}} />
            <Text style={styles.title}>{title}</Text>
          </View>

          <Text style={styles.title}>ADDRESS</Text>
          <Text>{address.en}</Text>
          <Text style={styles.title}>IMAGE</Text>
          <FlatList
            data={DATA}
            renderItem={this.renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            // onEndThread => load data
            // onRefresh
          />
          <Text style={([styles.title], [styles.imageThumbnail])}>
            DESCRIPTION
          </Text>
          <Text>{subtitle.en}</Text>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    position: 'relative',
  },
  title: {
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
