const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

const logic = require('./ml-logic');

/**
 * ML Model Implementation
 * @note This is a dummy implementation of the ML model
 */
app.post('/predict', bodyParser.json(), async (req, res) => {
	// const calculationString = '1+1';
	// const result = logic.doPrediction(eval(calculationString), 2);
	const result = await logic.doPrediction(req.body.imgURL)
	
	res.status(200).json({
		message: 'Give top 5 predictions:',
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
