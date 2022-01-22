import nookies from 'nookies'
import { useState, React, useEffect } from 'react'

function TopBar() {

    const [cookies, setCookies] = useState({})

    useEffect(() => {
        const ck = nookies.get(null);
        setCookies(ck);
    }, [])

    function logout() {
        nookies.destroy(null, 'jwt');
        nookies.destroy(null, 'name');
        nookies.destroy(null, 'is_owner');
        window.location.href = "/login";
    }

    return (
        <div className="flex justify-end w-full overflow-hidden rounded-xl">
            <section className="relative">
                <nav className="flex justify-between bg-transparent text-slate-800">
                    <div className="py-6 flex items-center">
                        <div className="flex items-center space-x-5">

                            {cookies.jwt != undefined && <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className='ml-1 font-bold text-sm'>
                                    <span>{cookies.name}({cookies.is_owner == "true" ? "Owner" : "Karyawan"})</span>
                                    <button onClick={() => logout()} className='border border-black rounded py-1 px-2 text-black text-xs ml-1'>LOGOUT</button>
                                </div>
                            </div>}

                        </div>
                    </div>
                </nav>

            </section>
        </div>
    )
}

export default TopBar
