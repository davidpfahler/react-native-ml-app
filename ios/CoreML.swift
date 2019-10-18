import Foundation

@objc(CoreML)
class CoreML : NSObject {
  @objc func test(_ name: String, resolve:@escaping RCTPromiseResolveBlock, reject:@escaping RCTPromiseRejectBlock) ->Void {
    resolve("Hello " + name)
  }

  // Export constants to use in your native module
  @objc
  func constantsToExport() -> [String : Any]! {
    return ["EXAMPLE_CONSTANT": "example"]
  }

  // Implement methods that you want to export to the native module
  @objc func exampleMethod() {
    // Implement method
  }
}
