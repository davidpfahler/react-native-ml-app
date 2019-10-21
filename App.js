import React, {useRef, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Image,
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Button } from 'react-native-material-ui';
import fs from 'react-native-fs';
import SafeAreaHelper from 'react-native-safe-area-helper';

import CameraScreen from './src/CameraScreen';
import {getActsOfModelForImg, getTopKClassesFromActs} from './src/model';
import classes from './src/classes';
import {wait} from './src/utils';

const getActsForImg = getActsOfModelForImg.bind(null, fs.MainBundlePath + '/dogs-resnet18.mlmodelc')
const getTop5BreedsFromActs = getTopKClassesFromActs.bind(null, 5, classes);

const App: () => React$Node = () => {
  const [cameraShown, setCameraShown] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [safeAreaInsets, setSafeAreaInsets] = useState({});
  
  function onPicTaken (data) {
    setImgData(data);
    setCameraShown(false);
  }

  function onSafeAreaInsetsChange (safeAreaInsets) {
    setSafeAreaInsets(safeAreaInsets);
  }

  async function runModel () {
    await wait(1500);
    try {
      var acts = await getActsForImg(imgData.uri);
    } catch (e) {
      console.error(e); // TODO: error handling
      return e;
    }
    const top5 = getTop5BreedsFromActs(acts);
    return top5;
  }

  useEffect(() => {
    if (!imgData || !imgData.uri) { return; }
    runModel(imgData.uri);
  }, [imgData]); // runs when imgData changes
  
  return (cameraShown ? <CameraScreen
      onPicTaken={onPicTaken}
      safeAreaInsets={safeAreaInsets}
    /> : <>
      <SafeAreaHelper onInsetsChange={onSafeAreaInsetsChange} />
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {imgData && <Image source={{uri: imgData.uri, isStatic: true}} style={{width: 100, height: 100}} />}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Button text="Show Camera" primary raised onPress={() => setCameraShown(true)} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
