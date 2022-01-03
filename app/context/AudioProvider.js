import React, { Component, createContext } from 'react';
import { Text, View, Alert, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';

export const AudioContext = createContext();
export class AudioProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFiles: [],
      permissionError: false,
      dataProvider: new DataProvider((row1, row2) => row1 !== row2),
    };
  }

  permissionAlert = () => {
    Alert.alert('Permission Repuired', 'This app needs to read audio fiies', [
      {
        text: 'i am ready',
        onPress: () => this.getPermission(),
      },
      {
        text: 'cancel',
        onPress: () => this.permissionAlert(),
      },
    ]);
  };

  getAudioFiles = async () => {
    const { dataProvider, audioFiles } = this.state;
    
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'video',
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'video',
      first: media.totalCount,
    });
    this.setState({
      ...this.state,
      dataProvider: dataProvider.cloneWithRows([
        ...audioFiles,
        ...media.assets,
      ]),
      audioFiles: [...audioFiles, ...media.assets],
    });
  };

  getPermission = async () => {
    // {
    //   status:"undetermined",
    //   canAskAgain:true,
    //   accessPrivileges:"none",
    //   expires:"never",
    //   granted:false
    // }

    const permission = await MediaLibrary.getPermissionsAsync();

    if (permission.granted) {
      // we want to get all the audio files
      this.getAudioFiles();
    }

    if (!permission.canAskAgain && !permission.granted) {
      this.setState({ ...this.state, permissionError: true });
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === 'denied' && canAskAgain) {
        // we going to display alert that user allow this permission to work this app
        // show alert permission
        this.permissionAlert();
      }
      if (status === 'granted') {
        // we want to get all the audio files
        this.getAudioFiles();
      }
      if (status === 'denied' && !canAskAgain) {
        // we want to display some error to the user
        this.setState({ ...this.state, permissionError: true });
      }
    }
  };

  componentDidMount() {
    // khởi tạo hàm xin quyền truy cập
    this.getPermission();
  }

  render() {
    const { dataProvider, audioFiles, permissionError } = this.state;
    if (permissionError) {
      return (
        <View style={styles.contentError}>
          <Text style={styles.textErr}>
            It looks like you haven't accept the permission
          </Text>
        </View>
      );
    }
    return (
      <AudioContext.Provider value={{ audioFiles, dataProvider }}>
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}
export default AudioProvider;

const styles = StyleSheet.create({
  contentError: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textErr: {
    fontSize: 20,
    textAlign: 'center',
    color: 'red',
  },
});
