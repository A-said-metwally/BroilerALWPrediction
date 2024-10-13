import React from 'react';
import Header from '../components/Header';

const About = () => {
    return (
        <div>
            <Header title={''}/>
            <div className='container p-10 space-y-3 font-mono text-lg text-gray-500'>
                <p>
                    - This App Disigned By BI & Solutions Unit Team At October 2024
                </p>               
                <p>
                    - The Model Can Predict Chicken Final Live Weight At The Day 21 of Broiler Cycle,
                        Regarding Recorded Weights Form Zero Day Age to 21 Day Age and Expected Catching Age.
                </p> 
                <p>
                    - This Model Was Built Using Sequential Neural Network Model.
                </p>               
                <p>
                    - It Can Approximate any continuous function given sufficient complexity, so they may capture intricate patterns in the data better than some traditional models.
                </p>
                <p>
                    - It Can handle a large number of features and complex relationships between them, especially when the dataset is large and high-dimensional.
                </p>
                <p>
                    - The Model Has Been Trained At More Than 4,000 Records To Optain Accurate Prediction.
                </p>                

            </div>
        </div>
    );
}

export default About;
