import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(()=>{
        getFruits();
    }, [])
    const getFruits = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:4000/fruits/data');
            setData(response.data);
          } catch (error) {
            const response =  await axios.get('https://microservice-fruits-production-d707.up.railway.app/fruits/data');
            setData(response.data);
          }
      }, []);
  return (
    <div className='home grid gap-8 grid-cols-4 p-5'>
        {
            data.map(e=>(
                <div key={e.id} className="card mb-6 bg-gradient-to-bl from-gray-500 to-blue-600 rounded-md p-4">
                    <div className='flex justify-center mb-6'>
                        <img src={e.img} alt="" className='h-[20vh] w-[auto] rounded-md' />
                    </div>
                    <div className='text'>
                       <h2 className="text-2xl font-bold mb-4 text-white">{e.nombre}</h2>
                        <p className="text-gray-700 flex">Tipo: <b className='text-green-300 ml-2'>{e.tipo}</b></p> 
                    </div>
                </div>
            ))
        }
    </div>
  )
}
