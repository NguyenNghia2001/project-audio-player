import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import AudioListItem from '../components/AudioListItem';
import Screen from '../components/Screen';
import OptionModal from '../components/OptionModal';
import { Audio} from 'expo-av';

export class AudioList extends Component {
  static contextType = AudioContext;
  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
    };
    this.currentItem = {};
  }

  layoutProvider = new LayoutProvider(
    (i) => 'video',
    (type, dim) => {
      switch (type) {
        case 'video':
          dim.width = Dimensions.get('window').width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  handleAudioPress = audio => {
    console.log(audio)
    const playbackOjb = new Audio.Sound();
    playbackOjb.loadAsync({uri: audio.uri} , {shouldPlay: true})
  }

  rowRenderer = (type, item) => {
    return (
      <AudioListItem
        title={item.filename}
        onAudioPress = {() => this.handleAudioPress(item)}
        duration={item.duration}
        onOptionPress={() => {
          this.currentItem = item;
          this.setState({ ...this.state, optionModalVisible: true });
        }}
      />
    );
  };

  render() {
    return (
      <AudioContext.Consumer>
        {({ dataProvider }) => {
          return (
            <Screen style={styles.container}>
              <RecyclerListView
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
              />
              <OptionModal
              onPlayPress = {() => console.log('Play music')}
              onPlayListPress = {() => console.log('add play list')}

              currentItem = {this.currentItem}
                onClose={() =>
                  this.setState({ ...this.state, optionModalVisible: false })
                }
                visible={this.state.optionModalVisible}
              />
            </Screen>
          );
        }}
      </AudioContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // text: {
  //   padding: 10,
  //   borderBottomColor: 'red',
  //   borderBottomWidth: 2,
  //   borderColor: 'red',
  //   // backgroundColor: 'blue'
  // },
});
export default AudioList;
