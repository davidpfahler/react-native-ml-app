/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as RNFS from 'react-native-fs';

;(async () => {
    const { jobid, promise } = RNFS.downloadFile({
        fromUrl: "https://picsum.photos/200",
        toFile: RNFS.DocumentDirectoryPath + '/photo.jpg',
    });
    const res = await promise;
    console.log(res);
})();

AppRegistry.registerComponent(appName, () => App);
