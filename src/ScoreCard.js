import React from 'react';
import { Text, List, Avatar } from 'react-native-paper';
import styled from 'styled-components/native';

import images from './assets/images';

const getBreed = className => className.split('_').map(p => {
    return p.charAt(0).toUpperCase() + p.slice(1);
}).join(' ');

const CenteredText = styled(Text)`
    align-self: center;
    font-size: 16;
`;

const ScoreView = styled.View`
    width: 100%;
    padding: 10px;
`

const Item = ({img, title, percentage}) => (
    <List.Item
        left={props => <Avatar.Image {...props} size={40} source={img} />}
        title={title}
        titleStyle={{marginLeft: 6}}
        right={props => <CenteredText {...props}>{percentage}%</CenteredText>}
    />
);

export default ({top5}) => (
    <ScoreView>
        {top5.length ? top5.map(({breed, percentage}) => <Item
            key={breed}
            img={images[breed]}
            title={getBreed(breed)}
            percentage={percentage}
        />) : null}
    </ScoreView>
);
