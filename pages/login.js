import { useState, React } from 'react'
import axios from 'axios'
import { setCookie } from 'nookies'

function Login() {
    const [userData, setUserData] = useState({
        identifier: '',
        password: '',
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            var res = await axios.post(process.env.API_URL + '/api/auth/local', userData);
            setCookie(null, 'jwt', res.data.jwt, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
            setCookie(null, 'name', res.data.user.username, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })

            setCookie(null, 'is_owner', res.data.user.is_owner, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })

            window.location.href = "/transaksi";

        } catch (err) {
            console.log(err.response.data);
        }
    }

    return (
        <div>
            <img className='w-48 mt-20 mb-10 mx-auto' src='img/logo.svg' />
            <form onSubmit={handleSubmit} className='bg-sky-50 border mb-20 rounded-lg p-5 w-6/12 mx-auto flex flex-col'>

                <input required onChange={(e) => handleChange(e)} type="email" name="identifier" className='bg-white mt-2 p-2 border rounded' placeholder='email' />
                <input required onChange={(e) => handleChange(e)} type="password" name="password" className='bg-white mt-2 p-2 border rounded' placeholder='password' />
                <button type="submit" className='mt-2 p-2 rounded bg-green-500 text-white'>Masuk</button>
            </form>
        </div>
    )
}

export default Login
