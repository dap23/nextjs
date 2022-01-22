import React from 'react'
import Link from 'next/link'
import { FaUserClock, FaFileSignature, FaExchangeAlt, FaAddressBook, FaMoneyBill, FaExpandAlt, FaClipboardCheck, FaFileInvoiceDollar, FaCompressAlt } from "react-icons/fa"


function Karyawan() {
    return (
        <div>
            <div className='flex justify-center my-40'>
                <div className="w-28 mr-3 cursor-not-allowed">
                    <Link href="/karyawan">
                        <div>
                            <div className='text-center cursor-not-allowed rounded-md flex justify-center p-5  hover:bg-green-500 bg-green-500/90 mb-2'>
                                <FaAddressBook className='text-white' size={40} />
                            </div>
                            <div className='text-center font-semibold text-slate-700'>Data</div>
                        </div>
                    </Link>
                </div>
                <div className="w-28 mr-3 cursor-not-allowed">
                    <Link href="/karyawan">
                        <div>
                            <div className='text-center cursor-not-allowed rounded-md flex justify-center items-center p-5  hover:bg-green-500 bg-green-500/90 mb-2'>
                                <FaMoneyBill className='text-white' size={40} />
                            </div>
                            <div className='text-center font-semibold text-slate-700'>Gaji</div>
                        </div>
                    </Link>

                </div>
                <div className="w-28 mr-3 cursor-not-allowed">
                    <Link href="/karyawan">
                        <div>
                            <div className='text-center cursor-not-allowed rounded-md flex justify-center p-5  hover:bg-green-500 bg-green-500/90 mb-2'>
                                <FaUserClock className='text-white' size={40} />
                            </div>
                            <div className='text-center font-semibold text-slate-700'>Absensi</div>
                        </div>
                    </Link>
                </div>
                <div className="w-28 mr-3 cursor-not-allowed">
                    <Link href="/karyawan">
                        <div>
                            <div className='text-center cursor-not-allowed rounded-md flex justify-center p-5  hover:bg-green-500 bg-green-500/90 mb-2'>
                                <FaFileSignature className='text-white' size={40} />
                            </div>
                            <div className='text-center font-semibold text-slate-700'>Hutang</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Karyawan
