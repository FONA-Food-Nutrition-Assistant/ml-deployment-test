const tf = require('@tensorflow/tfjs-node');

/**
 * Write your code below
 * @example
 */
function doPrediction(calculations, result) {
	const isResultCorrect = calculations === result;
	return isResultCorrect;
}

module.exports = {
	doPrediction,
};
