//  Created by react-native-create-bridge

// import RCTBridgeModule
#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#elif __has_include(“RCTBridgeModule.h”)
#import “RCTBridgeModule.h”
#else
#import “React/RCTBridgeModule.h” // Required when used as a Pod in a Swift project
#endif

// import RCTEventEmitter
#if __has_include(<React/RCTEventEmitter.h>)
#import <React/RCTEventEmitter.h>
#elif __has_include(“RCTEventEmitter.h”)
#import “RCTEventEmitter.h”
#else
#import “React/RCTEventEmitter.h” // Required when used as a Pod in a Swift project
#endif

// Export a native module
// https://facebook.github.io/react-native/docs/native-modules-ios.html#exporting-swift
@interface RCT_EXTERN_MODULE(CoreML, NSObject)

// We do not need call UIKit for initialization
+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

// Export methods to a native module
// https://facebook.github.io/react-native/docs/native-modules-ios.html#exporting-swift
RCT_EXTERN_METHOD(compileModel:(NSString *)uncompiledModelPath resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(classifyImageWithModel:(NSString *)imgPath compiledModelPath:(NSString *)compiledModelPath resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end
