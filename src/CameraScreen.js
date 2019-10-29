import React, {useRef} from 'react';
import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';

const Flex = styled.View`
  flex: ${({flex = 1}) => flex};
`

const colors = {
  primary: 'transparent',
  secondary: 'white',
};

const Content = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const Fill = styled.View`
  flex-grow: 1;
`

const TriggerWrap = styled.View`
  width: 70px;
  margin-bottom: ${({inset = 0}) => inset + 12};
  height: 70px;
  border: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 35px;
  background-color: ${colors.primary};
  border-color: ${colors.secondary};
  background-color: ${colors.primary};
`

const Trigger = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin: 5px;
  background-color: ${colors.secondary};
  border-radius: 100px;
`

const captureOpts = {
  width: 299,
  height: 299,
  quality: 1.0,
  base64: false,
  pauseAfterCapture: false,
  exif: false,
};

export default function CameraScreen ({onPicTaken, safeAreaInsets}) {
  const camera = useRef(null);
  const takePictureAsync = async () => {
    if (!camera || !camera.current) {
      throw new Error("camera not referenced yet");
    }
    const data = await camera.current.takePictureAsync(captureOpts);
    onPicTaken(data);
  }

  return <>
    <Flex>
      <Flex
        as={RNCamera}
        ref={camera}
        type='back'
        captureAudio={false}
      />
      <Content>
        <Fill />
        <TriggerWrap inset={safeAreaInsets.bottom}>
          <Trigger onPress={takePictureAsync} />
        </TriggerWrap>
      </Content>
    </Flex>
  </>
}
