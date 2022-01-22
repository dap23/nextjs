import TopBar from '../components/topbar'
import nookies from 'nookies'
import { useState, React, useEffect } from 'react'


function Content(props) {

    return (
        <div className="w-10/12 bg-transparent rounded-xl p-5 h-max">
            <TopBar />
            <div className='p-5 w-full h-full bg-white/90 rounded-lg'>
                {props.content}
            </div>

        </div>
    )
}

export default Content
