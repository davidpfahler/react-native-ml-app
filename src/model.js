import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import CoreML from './CoreMLNativeModule';
import fs from 'react-native-fs';

export async function getActsOfModelForImg (mlmodelc, imgUri) {
    try {
        const localImgPath = await getLocalPathFromUri(imgUri);
        const acts = await CoreML.classifyImageWithModel(localImgPath, mlmodelc);
        return acts
    } catch (e) {
        // TODO: error handling
        console.log("error", e);
        throw e;
    }
}

export function getTopKClassesFromActs (k, classes, acts) {
    const topK = Array.from(acts)
        // .map((act, i) => [act, i])
        .sort((a, b) => {
            if (a.value < b.value) return -1;
            if (a.value > b.value) return 1;
            return 0;
        })
        .reverse()
        .slice(0, k)

    // denominator of softmax function
    const denominator = acts.map(act => Math.exp(act.value)).reduce((a,b) => a+b);
    return topK.map(({key, value}, _, acts) => ({
        breed: classes[key],
        act: value,
        prob: Math.exp(value) / denominator,
    }));
}

async function getLocalPathFromUri (uri) {
    if (typeof uri === 'number') {
        const res = await resolveAssetSource(uri);
        uri = res.uri;
    }
    if (uri.startsWith('http')) {
        const r = /[^/]+$/g;
        const [fname] = uri.match(r);
        let localPath = fs.TemporaryDirectoryPath;
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
    // fileUrl must be without protocol
    const r = /^file:\/\/(.+)/;
    if (r.test(uri)) {
        return uri.match(r)[1];
    }
    return uri;
}
