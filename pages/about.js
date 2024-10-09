import React from 'react';
import Header from '../components/Header';

const About = () => {
    return (
        <div>
            <Header title={''}/>
            <div className='container p-10 space-y-3 font-mono text-lg text-gray-500'>
                <p>
                    - This App Disigned By BI & Solution unit Team At October 2024
                </p>               
                 <p>
                    - The Model Can Predict Chicken Final Live Weight At The Day 21 of Broiler Cycle,
                        Regarding Recorded Weights Form Zero Day Age to 21 Day Age.
                </p>                
                <p>
                    - The Model Has Been Traing At More Than 4,000 Records To Optain Accurate Prediction.
                </p>                

            </div>
        </div>
    );
}

export default About;
