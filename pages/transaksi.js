import React from 'react'
import { FaExchangeAlt, FaExpandAlt, FaClipboardCheck, FaFileInvoiceDollar, FaCompressAlt } from "react-icons/fa"
import Link from 'next/link'

function Transaksi() {
    return (
        <div className='flex justify-center my-40'>
            <div className="w-28 mr-3">
                <Link href="/penjualan">
                    <div>
                        <div className='text-center rounded-md flex justify-center p-5 cursor-pointer hover:bg-green-500 bg-green-500/90 mb-2'>
                            <FaExpandAlt className='text-white' size={40} />
                        </div>
                        <div className='text-center font-semibold text-slate-700'>Penjualan</div>
                    </div>
                </Link>
            </div>
            <div className="w-28 mr-3">
                <Link href="/pembelian">
                    <div>
                        <div className='text-center rounded-md flex justify-center items-center p-5 cursor-pointer hover:bg-green-500 bg-green-500/90 mb-2'>
                            <FaCompressAlt className='text-white' size={40} />
                        </div>
                        <div className='text-center font-semibold text-slate-700'>Pembelian</div>
                    </div>
                </Link>

            </div>
            <div className="w-28 mr-3">
                <Link href="/pesanan">
                    <div>
                        <div className='text-center rounded-md flex justify-center p-5 cursor-pointer hover:bg-green-500 bg-green-500/90 mb-2'>
                            <FaClipboardCheck className='text-white' size={40} />
                        </div>
                        <div className='text-center font-semibold text-slate-700'>Pesanan</div>
                    </div>
                </Link>
            </div>
            <div className="w-28 mr-3">
                <Link href="/pelunasan">
                    <div>
                        <div className='text-center rounded-md flex justify-center p-5 cursor-pointer hover:bg-green-500 bg-green-500/90 mb-2'>
                            <FaFileInvoiceDollar className='text-white' size={40} />
                        </div>
                        <div className='text-center font-semibold text-slate-700'>Pelunasan</div>
                    </div>
                </Link>

            </div>
            <div className="w-28 mr-3">
                <div className='text-center rounded-md flex justify-center p-5 cursor-pointer  bg-gray-500/90 mb-2 cursor-not-allowed'>
                    <FaExchangeAlt className='text-white' size={40} />
                </div>
                <div className='text-center font-semibold text-slate-700'>Tukar</div>
            </div>
        </div>
    )
}

export default Transaksi
