import { useEffect, React } from 'react'

function Navbar() {

    const handleScroll = () => {
        if (window.scrollY > 150) {
            document.querySelector(".navbar").className = "transition duration-300 navbar flex justify-between w-screen fixed left-0 right-0 backdrop-blur-lg bg-white/50 z-50 text-slate-800 shadow";
            document.querySelector(".logo-img").src = "img/develofirst.png";
        } else {
            document.querySelector(".navbar").className = "transition navbar flex justify-between w-screen fixed left-0 right-0 bg-transparent z-50 text-white";
            document.querySelector(".logo-img").src = "img/develofirst-white.png";
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])


    return (
        <nav className="navbar flex justify-between w-screen fixed left-0 right-0 bg-transparent z-50 text-white">
            <div className="px-5 xl:px-12 py-3 flex w-full items-center">
                <a className="text-3xl font-bold font-heading" href="#">
                    <img className="h-12 logo-img" src="img/develofirst-white.png" alt="logo" />
                </a>
                <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-4">
                    <li className='hover:bg-white hover:bg-opacity-50 transition py-1 rounded px-4 hover:text-purple-900'><a className="" href="#">Home</a></li>
                    <li className='hover:bg-white hover:bg-opacity-50 transition py-1 rounded px-4 hover:text-purple-900'><a className="" href="#">Service</a></li>
                    <li className='hover:bg-white hover:bg-opacity-50 transition py-1 rounded px-4 hover:text-purple-900'><a className="" href="#">Portofolio</a></li>
                    <li className='hover:bg-white hover:bg-opacity-50 transition py-1 rounded px-4 hover:text-purple-900'><a className="" href="#">Contact Us</a></li>

                </ul>
                <div className="hidden xl:flex space-x-5 items-center">
                    <a className="flex items-center hover:text-gray-200" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="flex absolute -mt-5 ml-4">
                            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                            </span>
                        </span>
                    </a>

                    <button className='rounded bg-orange-400 border-orange-400 border-2 px-4 py-1 font-semibold text-white'>Get Quote</button>

                </div>
            </div>
            <a className="xl:hidden flex mr-6 items-center" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                    </span>
                </span>
            </a>
            <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </a>
        </nav>
    )
}

export default Navbar
