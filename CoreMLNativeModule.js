//  Created by react-native-create-bridge

import { NativeModules } from 'react-native'

const { CoreML } = NativeModules

export default {
  exampleMethod () {
    return CoreML.exampleMethod()
  },

  test (name) {
    return CoreML.test(name)
  },

  EXAMPLE_CONSTANT: CoreML.EXAMPLE_CONSTANT,
}
