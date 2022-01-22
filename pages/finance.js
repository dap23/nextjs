import React from 'react'
import { FaFileInvoiceDollar, FaWallet, FaCoins } from "react-icons/fa"
import Link from 'next/link'


function Finance() {
    return <div className='flex justify-center my-40'>
        <div className="w-28 mr-3">
            <Link href="/opname">
                <div>
                    <div className='text-center rounded-md flex justify-center p-5 cursor-pointer hover:bg-green-500 bg-green-500/90 mb-2'>
                        <FaFileInvoiceDollar className='text-white' size={40} />
                    </div>
                    <div className='text-center font-semibold text-slate-700'>Opname</div>
                </div>
            </Link>
        </div>
        <div className="w-28 mr-3">
            <Link href="/petty">
                <div>
                    <div className='text-center rounded-md flex justify-center items-center p-5 cursor-pointer hover:bg-green-500 bg-green-500/90 mb-2'>
                        <FaWallet className='text-white' size={40} />
                    </div>
                    <div className='text-center font-semibold text-slate-700'>Petty</div>
                </div>
            </Link>

        </div>
        <div className="w-28 mr-3">
            <Link href="/brankas">
                <div>
                    <div className='text-center rounded-md flex justify-center p-5 cursor-pointer hover:bg-green-500 bg-green-500/90 mb-2'>
                        <FaCoins className='text-white' size={40} />
                    </div>
                    <div className='text-center font-semibold text-slate-700'>Brankas</div>
                </div>
            </Link>
        </div>
    </div>
}

export default Finance;
