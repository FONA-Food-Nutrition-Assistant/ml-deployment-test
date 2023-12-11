const tf = require('@tensorflow/tfjs')
const tfn = require('@tensorflow/tfjs-node');
const tfjs_conv = require('@tensorflow/tfjs-converter');
var path = require('path');
const canvass = require('canvas')

// change parameter based on model used.
const modelParameter = {
	MODEL_URL: tfn.io.fileSystem(path.join(__dirname, '..', 'from_saved_model', 'model.json')),
	IMG_SIZE: 224, 
	PRED_CLASS: require('../predClass.json'),
	CLASS_TO_SHOW: 10
}

// async function loadModel(){
// 	const model = await tf.loadGraphModel(MODEL_URL)
// 	return model
// }

/**
 * Write your code below
 * @example
 */
async function doPrediction(imgURL) {
	// model = loadModel()
	const model = await tf.loadGraphModel(modelParameter.MODEL_URL)

	const imgElement = new canvass.createCanvas(modelParameter.IMG_SIZE, modelParameter.IMG_SIZE, 3)
	
	imgElement.src = imgURL

	const img = tf.browser.fromPixels(imgElement).reshape([-1, modelParameter.IMG_SIZE, modelParameter.IMG_SIZE, 3]).toFloat()
	
	prediction = model.predict(img).dataSync()
	
	top = Array.from(prediction).map(function(p,i){
		return {
			probability: p,
			className: modelParameter.PRED_CLASS[i]
		};
	}).sort(function(a,b){
		return b.probability-a.probability;
	}).slice(0,modelParameter.CLASS_TO_SHOW)

	return top;
}

module.exports = {
	doPrediction,
};
