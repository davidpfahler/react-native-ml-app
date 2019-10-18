/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import modelPath from './dogs-resnet18.mlmodel';
import imgPath from './airedale.jpg';

import CoreML from './CoreMLNativeModule';

setTimeout(async () => {
    const greeting = await CoreML.test('David');
    console.log(greeting);

    // try {
    //     const mlmodel = await resolveAssetSource(modelPath);
    //     const img = await resolveAssetSource(imgPath);
    //     const mlmodelc = await compileModel(mlmodel);
    //     const res = await classifyImage(img, mlmodelc);
    // } catch (e) {
    //     console.log("error", e)
    // }

    
}, 500)

AppRegistry.registerComponent(appName, () => App);
