import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(()=>{
        getFruits();
    }, [])
    const getFruits = useCallback(async () => {
        const res = await axios.get('http://localhost:4000/fruits/data');
        setData(res.data);
      }, []);
  return (
    <div className='home grid gap-6 grid-cols-4 p-5'>
        {
            data.map(e=>(
                <div key={e.id} className="bg-gradient-to-bl from-white to-blue-600 rounded-md p-4">
                    <div className='flex justify-center mb-6'>
                        <img src={e.img} alt="" className='h-[20vh] w-[auto] rounded-md' />
                    </div>
                    <div className='text'>
                       <h2 className="text-2xl font-bold mb-4 text-white">{e.nombre}</h2>
                        <p className="text-gray-700 flex">Tipo: <p className='text-green-300 ml-2'>{e.tipo}</p></p> 
                    </div>
                </div>
            ))
        }
    </div>
  )
}
