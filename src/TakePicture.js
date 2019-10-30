import React from 'react';
import AwesomeIcon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import { Text } from 'react-native-paper';

const TakePictureView = styled.View`
    flex: 1;
`
    
const TouchableTakePicture = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const ImageIcon = styled(AwesomeIcon)`
    color: grey;
    max-width: 50%;
`;

export default ({onPress}) => (
    <TakePictureView>
        <TouchableTakePicture onPress={onPress}>
            <ImageIcon size={150} name="image" />
            <Text>Tap anywhere to take a picture.</Text>
        </TouchableTakePicture>
    </TakePictureView>
)
