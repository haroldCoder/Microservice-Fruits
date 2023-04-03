import axios from 'axios';
import React, { useState } from 'react'
import {AiFillCloseCircle} from 'react-icons/ai';

export default function Login(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [log, setLog] = useState(false);

    const apiUrl = 'https://microservice-fruits-production-d707.up.railway.app'; // URL de la API

    const createUser = async (e) => {
    e.preventDefault();
    try {
        if (log) {
            await axios.post(`${apiUrl}/users`, {
                "name": name,
                "password": password
            });
            alert('Usuario creado con éxito');
            setName('');
            setPassword('');
        } 
        else {
            const response = await axios.get(`${apiUrl}/users/validate/${name}/${password}`);
            if (response.data == 'error') {
                alert('El usuario no existe');
            } 
            else {
                console.log(response.data);
                alert('Bienvenido');
            }
        }
    } 
    catch (error) {
        console.error(error);
        alert('Hubo un error al hacer la petición a la API');
    }
    };
  return (
    <div className="main bg-slate-900 h-[70vh] p-3 rounded-lg opacity-95">
        <div className="head flex justify-between">
            <h2 className='text-lg text-white'>Login</h2>
            <AiFillCloseCircle onClick={()=>{props.setLogin(false)}} color='#bd002c' className='text-[30px] cursor-pointer'/>
        </div>
        <div className='h-[100%] mt-24 p-10'>
            <form action="" onSubmit={createUser} className='grid grid-cols-1 gap-1 h-[70%]'>
                <div>
                    <i className='text-white '>Name of user</i>
                    <input type="text" className='w-[100%]  h-[30px] rounded-md mt-3 p-2' required onChange={(e)=>{setName(e.target.value)}} value={name} />  
                </div>
                <div>
                    <i className='text-white mb-3'>Password of user</i>
                    <input type="password" className='w-[100%]  h-[30px] rounded-md mt-3 p-2' required onChange={(e)=>{setPassword(e.target.value)}} value={password} />  
                </div>
                <div className='flex flex-col relative left-[10%] top-[60%] items-end'>
                    <button className='bg-blue-600 hover:bg-blue-500 w-[40%] h-[40px] rounded-md mb-4'>{!log ? 'Login' : 'Sign up'}</button>
                    <i className='text-blue-700 cursor-pointer hover:text-blue-500' onClick={()=>setLog(!log)}>{!log ? 'you already have an account' : 'Sign up'}</i>
                </div>
            </form>
        </div>
    </div>
  )
}
