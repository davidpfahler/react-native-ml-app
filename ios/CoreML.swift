import Foundation
import Vision

@available(iOS 12.0, *)
@objc(CoreML)
public class CoreML : NSObject {
  var models:[String:MLModel] = [:]
  
  func getModel(_ modelPath: String) -> MLModel? {
    if let m = models[modelPath] { return m }
    let modelURL = URL(fileURLWithPath: modelPath)
    if let m = try? MLModel(contentsOf: modelURL) {
      models[modelPath] = m
      return m
    }
    return nil
  }

  // @objc: instruct Swift to make method available to Obj-C runtime
  @objc func compileModel(_ uncompiledModelPath: String, resolve:@escaping RCTPromiseResolveBlock, reject:@escaping RCTPromiseRejectBlock) ->Void {
    DispatchQueue(label: "RNCoreML").async() {
      let url = URL(fileURLWithPath: uncompiledModelPath)
      do {
        let tempURL:URL = try MLModel.compileModel(at:url)
        resolve(tempURL.path);
      } catch {
        reject(nil, nil, error);
      }
    }
  }

  @objc func classifyImageWithModel(_ imgPath: String, compiledModelPath: String, resolve:@escaping RCTPromiseResolveBlock, reject:@escaping RCTPromiseRejectBlock) ->Void {
    guard let model = getModel(compiledModelPath) else {
      reject("no_model", "Could not load model with path" +  compiledModelPath, nil)
      return
    }
    do {
      let imageURL = URL(fileURLWithPath: imgPath)
      let vModel = try VNCoreMLModel(for: model);
      let image = CIImage(contentsOf: imageURL);
      let handler = VNImageRequestHandler(ciImage: image!);
      let request = VNCoreMLRequest(model: vModel) { (req, e) -> Void in
        if let results = req.results {
          if let labels = results as? [VNClassificationObservation] {
            var out = [[String:Any]]();
            labels.forEach() { (thisClass) in
              let value = thisClass.confidence;
              let key = thisClass.identifier;
              out.append(["key":key, "value":value]);
            }
            resolve(out);
            return;
          }
        }
        reject(nil, nil, nil);
      }
      request.imageCropAndScaleOption = VNImageCropAndScaleOption.centerCrop
      try handler.perform([request]);
    } catch {
      reject("model_error", "Error from model: " + error.localizedDescription, error);
    }
  }
}
