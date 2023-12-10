const express = require('express');
const app = express();
const port = 3000;

const logic = require('./ml-logic');

/**
 * ML Model Implementation
 * @note This is a dummy implementation of the ML model
 */
app.get('/predict', (req, res) => {
	const calculationString = '1+1';
	const result = logic.doPrediction(eval(calculationString), 2);

	res.status(200).json({
		message: 'Hi There! We do some calculations here',
		result: result,
	});
});

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Hi There! Welcome to the ML Model API',
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
