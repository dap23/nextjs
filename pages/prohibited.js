import React from 'react'
import { FaExclamationTriangle } from "react-icons/fa"

function Prohibited() {
    return (
        <div className='flex items-center text-orange-500'>
            <FaExclamationTriangle className='mr-2' /> Halaman tidak dapat diakses
        </div>
    )
}

export default Prohibited
