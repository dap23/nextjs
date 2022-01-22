import React from 'react'

function Feature() {
    return (
        <div className='bg-gradient-to-r from-purple-700 to-purple-400 shadow-lg rounded-lg p-4 flex justify-items-between items-center hover:bg-purple-800 group transition duration-700 text-left'>
            <img src='https://cdn-icons-png.flaticon.com/512/1055/1055666.png' className='w-10 mr-5' />
            <div className='flex flex-col'>
                <div className='text-white transition duration-700 group-hover:text-white font-bold'>Feature One</div>
                <p className='text-white text-sm transition duration-700 group-hover:text-white mt-2'>Services Serving more than 6,000 global brands</p>
            </div>

        </div>
    )
}

export default Feature
