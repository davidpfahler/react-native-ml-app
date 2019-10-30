import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import AwesomeIcon from 'react-native-vector-icons/MaterialIcons';

import {CardView, CenteredCard } from './CenteredCard';

const ImageIcon = styled(AwesomeIcon)`
    color: grey;
    max-width: 50%;
    align-self: center;
`;
const Image = styled.Image`
    width: 100%;
    padding-top: 100%;
`;

const TouchableImage = ({onPress, uri}) => (
    <TouchableOpacity onPress={onPress}>
        <Image source={{ uri }} />
    </TouchableOpacity>
);

export default ({onPress, coverImg}) => coverImg ? <TouchableImage 
        uri={coverImg.uri}
        onPress={onPress}
    /> : (
    <CardView>
        <CenteredCard elevation={2} onPress={onPress}>
            <ImageIcon size={150} name="image" />
        </CenteredCard>
    </CardView>
)
