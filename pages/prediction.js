import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';




// Load your actual data here (replace with your data)
const myObj = [
    { f1: 10, f2: 12, f3: 15, price: 50 },
    { f1: 10, f2: 12, f3: 15, price: 50 },
    { f1: 10, f2: 12, f3: 15, price: 50 },
    { f1: 10, f2: 12, f3: 15, price: 50 },
    { f1: 10, f2: 12, f3: 15, price: 50 },
    { f1: 10, f2: 12, f3: 15, price: 50 },
    { f1: 12, f2: 16, f3: 14, price: 45 },
    { f1: 10, f2: 13, f3: 15, price: 55 },
    { f1: 10, f2: 15, f3: 15, price: 52 },
    { f1: 10, f2: 14, f3: 17, price: 51 },
    { f1: 13, f2: 20, f3: 19, price: 40 },
    { f1: 12, f2: 11, f3: 15, price: 43 },
    { f1: 11, f2: 10, f3: 16, price: 50 },
    { f1: 10, f2: 14, f3: 17, price: 52 },
    { f1: 13, f2: 20, f3: 19, price: 49 },
    { f1: 12, f2: 11, f3: 15, price: 50 },
    { f1: 11, f2: 10, f3: 16, price: 48 },
  ];

  
const Prediction = () => {


  const [FactorOne, setFactorOne] = useState(0)
  const [FactorTwo, setFactorTwo] = useState()
  const [FactorThree, setFactorThree] = useState()


  const [model, setModel] = useState(null);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [maxValues, setMaxValues] = useState([0, 0, 0]); // Initialize maxValues

  useEffect(() => {
    async function loadModel() {
      const features = [];
      const targets = [];

      // Ensure features are valid numbers and avoid missing data
      for (const dataPoint of myObj) {
        if (isNaN(dataPoint.f1) || isNaN(dataPoint.f2) || isNaN(dataPoint.f3)) {
          console.warn("Skipping data point with invalid features:", dataPoint);
          continue;
        }
        features.push([dataPoint.f1, dataPoint.f2, dataPoint.f3]);
        targets.push(dataPoint.price);
      }

      // Normalize features
      const newMaxValues = features.reduce((acc, point) => {
        acc[0] = Math.max(acc[0], point[0]);
        acc[1] = Math.max(acc[1], point[1]);
        acc[2] = Math.max(acc[2], point[2]);
        return acc;
      }, [0, 0, 0]);

      const normalizedFeatures = features.map(point =>
        point.map((value, index) => value / newMaxValues[index])
      );

      const xs = tf.tensor2d(normalizedFeatures, [normalizedFeatures.length, 3]);
      const ys = tf.tensor1d(targets, 'float32');

      // Model definition
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 10, inputShape: [3] }));
      model.add(tf.layers.dense({ units: 1 }));

      // Model training
      model.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam(0.01) });
      await model.fit(xs, ys, { epochs: 250 });

      setModel(model);
      setMaxValues(newMaxValues);
    }

    loadModel();
  }, []);

  const handlePredict = (newF1, newF2, newF3) => {
    if (!model) {
      console.warn("Model is not yet loaded!");
      return;
    }

    const normalizedInput = [newF1 / maxValues[0], newF2 / maxValues[1], newF3 / maxValues[2]];
    const newFeatures = tf.tensor2d([normalizedInput], [1, 3]);
    const predictedPrice = model.predict(newFeatures).dataSync()[0];
    setPredictedPrice(predictedPrice);
  };

 
  return (
    <div>
      <input type="number" placeholder="f1" value={FactorOne} onChange={(e)=>setFactorOne(e.target.value)}/>
      <input type="number" placeholder="f2" value={FactorTwo} onChange={(e)=>setFactorTwo(e.target.value)}/>
      <input type="number" placeholder="f3" value={FactorThree} onChange={(e)=>setFactorThree(e.target.value)}/>
      <button onClick={() => handlePredict(FactorOne, FactorTwo, FactorThree)}>Predict</button>
      {predictedPrice !== null && <p>Predicted Price: {predictedPrice}</p>}
    </div>
  );
};

export default Prediction;