import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Image = styled.Image`
    width: 100%;
    padding-top: 100%;
`;

const TouchableImage = ({onPress, uri}) => (
    <TouchableOpacity onPress={onPress}>
        <Image source={{ uri }} />
    </TouchableOpacity>
);

export default ({onPress, coverImg}) => (
    <TouchableImage 
        uri={coverImg.uri}
        onPress={onPress}
    />
)
