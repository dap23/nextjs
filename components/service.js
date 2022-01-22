import React from 'react'

function Service() {
    return (
        <div className='flex bg-yl text-slate-700 mt-20 w-full px-20 py-10 mx-auto text-left'>
            <img className='w-6/12' src='https://image.freepik.com/free-vector/people-starting-business-project_23-2148866842.jpg' />
            <div className='w-6/12'>
                <div className='text-5xl font-bold mb-3 text-orange-400'>Services</div>
                <p className='text-slate-700 mb-10'>Services Serving more than 6,000 global brands worldwide, Lyngva provides a range of customised, affordable translation and localisation services to suit your multilingual needs, across multiple industries, content types and platforms. We made it our mission to deliver your stories globally on time, in any language.</p>
                <div className='flex'>
                    <div className='mr-10'>
                        <div className='text-5xl font-bold text-purple-400'>200+</div>
                        <p className='text-xs font-bold text-slate-900'>clients worldwide</p>
                    </div>
                    <div>
                        <div className='text-5xl font-bold text-purple-400'>700+</div>
                        <p className='text-xs font-bold text-slate-900'>clients worldwide</p>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Service
