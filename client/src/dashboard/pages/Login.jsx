import React, { useContext, useState } from 'react';
import { base_url } from '../../config/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import storeContext from '../../context/storeContext';

const Login = () => {
console.log("Login -> base_url", base_url);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const { dispatch } = useContext(storeContext);

    const [state, setState] = useState({
        email: "",
        password: ''
    });

    const handleRoleNavigation = (role) => {
        switch(role) {
            case 'admin':
                return navigate('/dashboard/admin');
            case 'yazar':
                return navigate('/dashboard/writer');
            default:
                return navigate('/dashboard');
        }
    };

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const { data } = await axios.post(`${base_url}/api/login`, state);
            localStorage.setItem('newsToken', data.token);
            dispatch({
                type: "login_success",
                payload: {
                    token: data.token,
                    userInfo: data.userInfo
                }
            });
            toast.success(data.message);
            handleRoleNavigation(data.userInfo.role);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Giriş başarısız');
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center'>
            <div className='bg-white shadow-2xl rounded-lg w-[400px]'>
                <div className='p-8'>
                    <div className='flex justify-center mb-8'>
                        <img 
                            className='w-[150px] transition-transform duration-300 hover:scale-110 drop-shadow-lg' 
                            src='/src/assets/mainlogo.png' 
                            alt='logo' 
                        />
                    </div>

                    <form onSubmit={submit} className='space-y-6'>
                        <div className='relative'>
                            <label htmlFor='email' className='block text-lg font-bold text-gray-700 mb-2'>Email</label>
                            <input 
                                value={state.email} 
                                onChange={inputHandle} 
                                type='email' 
                                name='email' 
                                id='email' 
                                placeholder='Email adresinizi girin' 
                                className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm text-gray-700'
                            />
                            <div className='absolute right-3 top-10 text-blue-400'><i className='fas fa-envelope'></i></div>
                        </div>

                        <div className='relative'>
                            <label htmlFor='password' className='block text-lg font-bold text-gray-700 mb-2'>Şifre</label>
                            <input 
                                onChange={inputHandle} 
                                value={state.password} 
                                type='password' 
                                name='password' 
                                id='password' 
                                placeholder='Şifrenizi girin' 
                                className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm text-gray-700'
                            />
                            <div className='absolute right-3 top-10 text-blue-400'><i className='fas fa-lock'></i></div>
                        </div>

                        <div>
                            <button 
                                type='submit' 
                                disabled={loader} 
                                className={`w-full py-3 text-white rounded-md font-semibold transition-all ${loader ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 shadow-lg'}`}
                            >
                                {loader ? 'Loading...' : 'Giriş Yap'} 
                            </button>
                        </div>
                    </form>

                 
                </div>
            </div>
        </div>
    );
};

export default Login;
