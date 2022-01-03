# Project audio player 
> Audio interface and request permission to access the device in use
### Installation && Usage
The application is run online on the website https://snack.expo.dev/ <br>
- Step 1: create an expo account to run the app demo <br>
- Step 2: choose the interface to demo as web, iphone .. or your personal phone
- Step 3: Practical experience with UI Music (clicking bottom tab will move to new page and bottom menus will be active)
### View code in Screen
- AudioList 
```php
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
```

- Player
```php
const Player = () => {
  return (
    <View style={styles.container}>
      <Text>  Player </Text>
    </View>
  )

};
```
- Please grant access

```php 
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
```
## Result on completion
![Screenshot](https://lh3.googleusercontent.com/1p1LDIyi3I_qwhRirTSk8l8utaMbeA-6mZ7P66ZPyX54-TSDTeIgiIK260Wu1nwP21il_vUFEoM3HvIsBP-vufzeoj9sQgNBZ7kaDXEMzU-bCujEgr6h_eijxPQ8vfKRh4aZQmmd9MEJAQLi3OzrmRDHlDB7lTQw3jHRgSZ2RTtLsxoB-tBW7rOOEohy6QHR-LQh-zugg0O0cyZaPqGLKiA3b8LD2CLjYSG6p4r-ejNysZvTG0qoLLLW1kPweGPxOGZJIyWw4IX3R08wn2eueXYBZcaFNIgaVBojZ8Q39sVAFq10SdoExMMKwajNr1rZXfauNfD8FVEWqx4cjjStE6OZmSZ52ObLY9mlkZVab0CNUmr3poWakZkIKSHoOH8oo3feulFoVib3iUzBJZObTw_nYX6gIZFkcDqHJUlw3tmXqjRouxDnVmb1AWaiO-Ao7W_CFMIpJwejpstHDJRMe-W_l-StxWMicpuulUJ4uhpAqdwwmcqxIQfXaBugn-y6kGXsoO29HWuEPGUPmwRjDyCKfPyZkTCj4yYV2deHEKpxWj93UPiyzsUfeHgkeOVz8ovf5fzowChq1Z7sYBzWOApXqVgNp4KCxDnf9Z6rbYU-ZMUTvY_IBMt_yB-W8pD9jqNAGjtwbg-jV1Jb1DY0vDs0SKu3X55PFKPSUpcEk7eDjT8MBVSW--mt0hcFPF1enmRXlWdJCMQmABy-yfahBqk=w776-h1378-no?authuser=0)
![Screenshot](https://lh3.googleusercontent.com/F7JUlu_zXqYbRf3JTwNpnAbXbrBaxducdF8Cw97sMNJZ1rRnaQfhb5trTq3lALvbrGYrK6FZ8DRTJ8fSGiBAUFafR5FKE_Ds-NZSxUrrb4v_tD0KMH-SJcCSdWQqg0ovhBBUkRcMis3zh4BDTcxdG9dtq0s_l6eGY3oJqrkUBTfnFgTupRXgy-Q6P1YtGACw1OU0SPaYcbQOtB2aC3Sxx3P2-VU4f2p6xjDi_B49OjbAnOwFZKQRdc9xHzXWSTVi-qw1d6AhVpfAPBdvqtpRYRvjz3G4-bqrjhAE2rEMOrrjH4Cwcq6dk63SAPWcdDnNRXFwOcdvZU5F6BW67swJoBrsdQM5zKa_H0IpsHzMsjKn_yL1Cp6aCjwbppxkKw-Nkg91oxbtUlEsou07MruP8nmy4-WgPLpsO4M9hAbhtRM1iSvNiCeLC-FnInMApdQw1PZGEW2CFMMqZOgqxJqU-kga8W_AJhCa0DYTEjOFb_9pkjbgIplkHsmQ_GfRcVtzemJIRWgBpS2dK2SFVrtIK0tV3iDYDEzvOFrmDl8d37-M9rBwWJlIhWTZjF7HLQOplJTh-GjxnyEGqFugE7p7GWoC1TbvL27j_odW88oLtxHgXf9MgyFrfQq4-7ZGaN5vsiRxsg9hZtbfUgW-SEju0ZiXJ8_zn-yf32ryIJjhh31sIisl_X5efiP2e0JtJyL4n_KfmbMSp0Y5sGQCkA5EgUg=w776-h1378-no?authuser=0)


