import React from 'react';
import {
    SafeAreaView,
    ScrollView,
} from 'react-native';
import styled from 'styled-components/native';

import ImageCard from './ImageCard';
import ScoreCard from './ScoreCard';
import colors from './colors';

const Appbar = styled.View`
    height: 50px;
    background: ${colors.primary};
    align-items: center;
    justify-content: center;
`;

const AppbarTitle = styled.Text`
    font-size: 24;
    font-weight: 600;
    color: white;
`;

const FullHeightScrollView = styled(ScrollView)`
    height: 100%;
`

export default ({ showCamera, imgData, top5 }) => {
    return (<SafeAreaView>
        <FullHeightScrollView contentInsetAdjustmentBehavior="automatic">
            <Appbar>
                <AppbarTitle>Dog Breed Classifier</AppbarTitle>
            </Appbar>
            <ImageCard onPress={showCamera} coverImg={imgData} />
            <ScoreCard top5={top5} />
        </FullHeightScrollView>
    </SafeAreaView>);
}
