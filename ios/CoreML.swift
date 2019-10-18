//  Created by react-native-create-bridge

import Foundation

@objc(CoreML)
class CoreML : NSObject {
  // Export constants to use in your native module
  @objc
  func constantsToExport() -> [String : Any]! {
    return ["EXAMPLE_CONSTANT": "example"]
  }

  // Implement methods that you want to export to the native module
  @objc func exampleMethod() -> String {
    // Implement method
  }
}
