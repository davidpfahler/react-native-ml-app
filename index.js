/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import modelPath from './dogs-resnet18.mlmodel';

setTimeout(async () => {
    try {
        const resource = await resolveAssetSource(modelPath);
        const blob = await fetch(resource.uri);
        console.log("myResource was loaded: ", blob);
    } catch (e) {
        console.log("error", e)
    }
}, 500)

AppRegistry.registerComponent(appName, () => App);
