import React from 'react'
import Feature from '../components/feature'

function FeatureContainer() {
    return (
        <div className='mt-10'>
            <div className='text-4xl font-bold text-center'>Benefits for <span className='text-purple-500'>you</span></div>
            <p className='text-slate-500 text-center text-sm w-6/12 mx-auto mt-5'>Services Serving more than 6,000 global brands worldwide, Lyngva provides a range of customised, affordable translation and localisation services to </p>
            <div className='grid grid-cols-4 gap-5 w-10/12 mx-auto mt-10'>
                <Feature />
                <Feature />
                <Feature />
                <Feature />
            </div>
        </div>

    )
}

export default FeatureContainer
