import React from 'react';
import { Card } from 'react-native-paper';
import styled from 'styled-components/native';
import AwesomeIcon from 'react-native-vector-icons/MaterialIcons';

import {CardView, CenteredCard } from './CenteredCard';

const ImageIcon = styled(AwesomeIcon)`
    color: grey;
    max-width: 50%;
    align-self: center;
`;

const Cover = styled(Card.Cover)`
    height: 299px;
    width: 299px;
`

export default ({onPress, coverImg}) => (
    <CardView>
        <CenteredCard elevation={2} onPress={onPress}>
            {coverImg && <Cover source={{ uri: coverImg.uri }} />}
            {!coverImg && <ImageIcon size={150} name="image" />}
        </CenteredCard>
    </CardView>
)