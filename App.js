/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useRef, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Button } from 'react-native-material-ui';
import fs from 'react-native-fs';
import SafeAreaHelper from 'react-native-safe-area-helper'

import modelResource from './dogs-resnet18.mlmodel';
import imgPath from './airedale.jpg';
import CameraScreen from './src/CameraScreen';
import Model from './src/Model';
import classes from './src/classes';

const model = new Model(modelResource, classes);

const App: () => React$Node = () => {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraShown, setCameraShown] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [safeAreaInsets, setSafeAreaInsets] = useState({});
  const onPicTaken = data => {
    setImgData(data);
    setCameraShown(false);
  }

  function onSafeAreaInsetsChange (safeAreaInsets) {
    setSafeAreaInsets(safeAreaInsets);
  }

  async function loadModel () {
    if (isLoading || loaded) { return; }
    setIsLoading(true);
    try {
      await model.runModel(imgPath, fs.MainBundlePath + '/dogs-resnet18.mlmodelc')
    } catch (e) {
      console.error(e); // TODO: error handling
    }
    setLoaded(true);
    setIsLoading(false);
  }
  useEffect(() => { loadModel() }, []);

  useEffect(() => {
    if (!loaded || !imgData) { return; }
    model.runModel(imgData.uri);
  }, [loaded, imgData]); // runs when loaded or data changes
  
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
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Model is {isLoading ? 'loading...' : 'loaded.'}
              </Text>
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
