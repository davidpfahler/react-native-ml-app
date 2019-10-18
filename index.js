/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import modelPath from './dogs-resnet18.mlmodel';
import imgPath from './airedale.jpg';
import CoreML from './CoreMLNativeModule';
import fs from 'react-native-fs';

async function getLocalPathFromUri (uri) {
    if (uri.startsWith('http')) {
        const r = /[^/]+$/g;
        const [fname] = uri.match(r);
        const localPath = fs.DocumentDirectoryPath + fname;
        const { jobId, promise } = fs.downloadFile({
            fromUrl: uri,
            toFile: localPath,
        });
        await promise;
        return localPath;
    }
    return uri;
}

setTimeout(async () => {
    try {
        const mlmodel = await resolveAssetSource(modelPath);
        const img = await resolveAssetSource(imgPath);
        const uncompiledModelPath = await getLocalPathFromUri(mlmodel.uri);
        const mlmodelc = await CoreML.compileModel(uncompiledModelPath);
        const localImgPath = await getLocalPathFromUri(img.uri);
        console.log(localImgPath)
        const res = await CoreML.classifyImageWithModel(localImgPath, mlmodelc);
        console.log('res', res);
    } catch (e) {
        console.log("error", e)
    }

    
}, 500)

AppRegistry.registerComponent(appName, () => App);
