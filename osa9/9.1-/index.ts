import { bmiCalculator } from './bmiCalculator'

import express from 'express';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query
    const bmi = bmiCalculator(Number(height), Number(weight))
    if (!height || !weight || !height && !weight) {
        res.status(400).send({error: 'malformatted parameters'})
    }
    let bmiToText: string

    if (bmi >= 25) {
        bmiToText = "Overweight"
    } else if (bmi <= 18.4 ) {
        bmiToText = "Underweight"
    } else {
        bmiToText = "Normal"
    }

    res.send({height, weight, bmiToText})
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});