const tf = require('@tensorflow/tfjs')
const tfn = require('@tensorflow/tfjs-node');
const tfjs_conv = require('@tensorflow/tfjs-converter');
var path = require('path');
const canvass = require('canvas')

TEST_IMG_URL = "https://storage.googleapis.com/fona-dev-bucket/foods/user-food-1.jpg"

const MODEL_URL = tfn.io.fileSystem(path.join(__dirname, '..', 'from_saved_model', 'model.json'))

const IMG_SIZE = 224

const pred_class = require('../predClass.json')

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
	const model = await tf.loadGraphModel(MODEL_URL)

	const imgElement = new canvass.createCanvas(IMG_SIZE, IMG_SIZE, 3)
	
	imgElement.src = imgURL

	const img = tf.browser.fromPixels(imgElement).reshape([-1, IMG_SIZE, IMG_SIZE, 3]).toFloat()
	
	prediction = model.predict(img).dataSync()
	
	top5 = Array.from(prediction).map(function(p,i){
		return {
			probability: p,
			className: pred_class[i]
		};
	}).sort(function(a,b){
		return b.probability-a.probability;
	}).slice(0,5)

	return top5;
}

module.exports = {
	doPrediction,
};
