import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Colors, DefaultTheme, Provider } from 'react-native-paper';
import fs from 'react-native-fs';
import SafeAreaHelper from 'react-native-safe-area-helper';

import CameraScreen from './src/CameraScreen';
import Main from './src/Main';
import { getActsOfModelForImg, getTopKClassesFromActs } from './src/model';
import classes from './src/classes';

const getActsForImg = getActsOfModelForImg.bind(null, fs.MainBundlePath + '/dogs-resnet18.mlmodelc');
const getTop5BreedsFromActs = getTopKClassesFromActs.bind(null, 5, classes);

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.indigo500,
    },
};

export default () => {
    const [cameraShown, setCameraShown] = useState(false);
    const [imgData, setImgData] = useState(null);
    const [safeAreaInsets, setSafeAreaInsets] = useState({});
    const [top5, setTop5] = useState([]);

    function onPicTaken(data) {
        setImgData(data);
        setCameraShown(false);
    }

    function onSafeAreaInsetsChange(safeAreaInsets) {
        setSafeAreaInsets(safeAreaInsets);
    }

    async function runModel() {
        try {
            var acts = await getActsForImg(imgData.uri);
        } catch (e) {
            console.error(e); // TODO: error handling
            return e;
        }
        setTop5(getTop5BreedsFromActs(acts));
    }

    useEffect(() => {
        if (!imgData || !imgData.uri) { return; }
        runModel(imgData.uri);
    }, [imgData]); // runs when imgData changes

    return (<Provider theme={theme}>
        <SafeAreaHelper onInsetsChange={onSafeAreaInsetsChange} />
        <StatusBar barStyle="dark-content" />
        {cameraShown ? <CameraScreen
            onPicTaken={onPicTaken}
            safeAreaInsets={safeAreaInsets}
        /> : <Main showCamera={() => setCameraShown(true)} imgData={imgData} top5={top5} />
        }</Provider>);
};
