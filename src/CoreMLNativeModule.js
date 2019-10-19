//  Created by react-native-create-bridge

import { NativeModules } from 'react-native'

const { CoreML } = NativeModules

export default {
  compileModel (uncompiledModelPath) {
    return CoreML.compileModel(uncompiledModelPath);
  },
  classifyImageWithModel (imgPath, compiledModelPath) {
    return CoreML.classifyImageWithModel(imgPath, compiledModelPath);
  },
}
