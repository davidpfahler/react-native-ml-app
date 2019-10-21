import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import CoreML from './CoreMLNativeModule';
import fs from 'react-native-fs';

export default class Model {
    _mlmodelc      = null;
    _modelResource = null;
    classes        = [];

    constructor (modelResource, classes) {
        this._modelResource = modelResource;
        this.classes = classes;
    }
    async runModel (imgResource, mlmodelc) {
        try {
            const img = await resolveAssetSource(imgResource);
            const localImgPath = await getLocalPathFromUri(img.uri);
            const acts = await CoreML.classifyImageWithModel(localImgPath, mlmodelc);
            return acts
        } catch (e) {
            // TODO: error handling
            console.log("error", e);
        }
    }
    getTopK (acts, k) {
        const topK = Array.from(acts)
            .map((act, i) => [act, i])
            .sort((a, b) => {
                if (a[0] < b[0]) return -1;
                if (a[0] > b[0]) return 1;
                return 0;
            })
            .reverse()
            .slice(0, k)
    
        // denominator of softmax function
        const denominator = acts.map(y => Math.exp(y)).reduce((a,b) => a+b)
        return topK.map(([act, i], _, acts) => ({
            breed: this.classes[i],
            act,
            prob: Math.exp(act) / denominator,
        }));
    }
}

async function getLocalPathFromUri (uri) {
    if (uri.startsWith('http')) {
        const r = /[^/]+$/g;
        const [fname] = uri.match(r);
        let localPath = fs.DocumentDirectoryPath;
        if (!(localPath.endsWith('/') || fname.startsWith('/'))) {
            localPath += '/';
        }
        localPath += fname;
        const { jobId, promise } = fs.downloadFile({
            fromUrl: uri,
            toFile: localPath,
        });
        await promise;
        return localPath;
    }
    const data = await fs.stat(uri);
    console.log('data', data);
    return uri;
}
