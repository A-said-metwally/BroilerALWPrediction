import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { PlusCircleIcon, SearchIcon, CogIcon, CalculatorIcon, } from '@heroicons/react/outline'
import * as XLSX from 'xlsx'
import PredFactorsInputs from '../components/PredFactorsInputs';
import Loading from '../components/Loading';
import InputsTable from '../components/InputsTable';
import { broilerDf } from '../data/broilerDf';
import  {broilerDf2}  from '../data/broilerDf2';
import * as tf from '@tensorflow/tfjs';
import PredictionTable from '../components/PredictionTable';
import Link from 'next/link';


const ML = () => {


    const [Inputs, setInputs] = useState([])
    const [PredictedResults, setPredictedResults] = useState([])

    const addInputs = (e)=>{
        setInputs([...Inputs, {"Sr":Inputs.length + 1, ...e}])
    }

    const clearInput = (e)=>{
        const updatedArray = Inputs.filter((obj) => obj.Sr !== e);
        setInputs(updatedArray)
    }

// prediction fucntion
  
const [model, setModel] = useState(null);
const [maxValues, setMaxValues] = useState([0, 0, 0, 0, 0, 0]);

useEffect(() => {
  async function loadModel() {
    const features = [];
    const targets = [];
  
    for (const dataPoint of broilerDf2) {
      const { wt0, wt4, wt7, wt14, wt21, age, alwt } = dataPoint;
      if ([wt0, wt4, wt7, wt14, wt21, age].some(isNaN)) {
        console.warn("Skipping data point with invalid features:", dataPoint);
        continue;
      }
      features.push([wt0, wt4, wt7, wt14, wt21, age]);
      targets.push(alwt);
    }

    // Calculate max values for normalization
    const newMaxValues = features.reduce((acc, point) => {
      for (let i = 0; i < point.length; i++) {
        acc[i] = Math.max(acc[i], point[i]);
      }
      return acc;
    }, Array(6).fill(0));

    // Normalize features
    const normalizedFeatures = features.map(point =>
      point.map((value, index) => value / newMaxValues[index])
    );

    const xs = tf.tensor2d(normalizedFeatures, [normalizedFeatures.length, 6]);
    const ys = tf.tensor1d(targets, 'float32');

    const model = tf.sequential(); // neural network
    model.add(tf.layers.dense({ units: 10, inputShape: [6] }));
    model.add(tf.layers.dense({ units: 1 }));

    // Model training with reduced epochs
    model.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam(0.01) });
    await model.fit(xs, ys, { epochs: 200, batchSize: 32 }); // Use batchSize

    setModel(model);
    setMaxValues(newMaxValues);
  }

  loadModel();
}, []);



    const handlePredict = () => {
        setPredictedResults([])
        let x = []
        for(let i = 0; i < Inputs.length; i++){
            const normalizedInput = [Inputs[i].wt0 / maxValues[0], Inputs[i].wt4 / maxValues[1], 
                Inputs[i].wt7 / maxValues[2], Inputs[i].wt14 / maxValues[3], Inputs[i].wt21 / maxValues[4], Inputs[i].age / maxValues[5]];
            const newFeatures = tf.tensor2d([normalizedInput], [1, 6]);
            const predictedAvgWt = model.predict(newFeatures).dataSync()[0];
            x = [...x, {...Inputs[i], 'predictedAvgWt': predictedAvgWt }]
        }
        setPredictedResults([...x])
    }

    // add new inputs and predict fn
    useEffect(()=>{
        if(PredictedResults.length > 0){
            handlePredict()
     }
    },[Inputs])
 

    // export excel
    const handleExportExcel = ()=>{
        var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(PredictedResults);
    
        XLSX.utils.book_append_sheet(wb, ws, 'worksheet' )
            XLSX.writeFile(wb, `Predicted_data.xlsx` )
    }

    return (
        <div className='flex flex-col items-center justify-center mb-10'>
            <Header title={''}/>

            {model != null && <div className='flex flex-col items-center justify-center p-3 mt-10 space-y-3 sm:space-x-3 sm:flex-row sm:items-center sm:justify-between'>
                <img src='./ml2.jpg' alt="" className='h-[100px] w-[100px] rounded-full hover:scale-125'/>
                <h1 className='font-serif text-3xl text-center text-gray-600 duration-100 ease-in-out animate-pulse'
                    >Broiler Avg Live Weight Predection ML Model v1
                     <Link href='/about' >
                        <span className="text-sm text-red-500 hover:cursor-pointer"> Learn More</span>
                    </Link></h1>
            </div>
            }
            <div className='container relative'>
                {model == null && <Loading Icon = {CogIcon} title={"Please Wait One Minute Until Preparing Model"}/>}

                {model != null && <PredFactorsInputs addInputs = {addInputs} PredictedResults = {PredictedResults}/>}

                <div className=' min-h-[300px] mt-10 '>

                    {/* Controls Section */}
                    {Inputs.length > 0 && 
                        <div className='flex items-center justify-end w-full p-2 space-x-4 border-b border-gray-400'>
                            <button 
                                className='px-4 py-1 bg-red-300 rounded-md hover:bg-red-600 hover:text-white hover:cursor-pointer'
                                onClick={()=>{if(confirm("Confirm Clear Results")){
                                    setInputs([])
                                    setPredictedResults([])
                                }}}
                            >Clear</button>
                            <button 
                                className='px-4 py-1 bg-gray-300 rounded-md hover:bg-green-500 hover:text-white hover:cursor-pointer'
                                onClick={()=>handleExportExcel()}
                            >Xlsx</button>
                            <button 
                                className='px-4 py-1 bg-gray-300 rounded-md hover:bg-green-500 hover:text-white hover:cursor-pointer'
                                onClick={()=>handlePredict()} 
                            >Predict</button> 
                        </div>
                    }
                    
                    {Inputs.length > 0 && PredictedResults.length == 0 && <InputsTable data = {Inputs} clearInput = {clearInput}/>}
                    {PredictedResults.length > 0 && <PredictionTable data = {PredictedResults}/>}

                </div>

            </div>

        </div>
    );
}

export default ML;
