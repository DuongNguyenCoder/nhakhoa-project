import { apiGetDirectory } from '@/apis/DirectoryAPI';
import React, { useEffect, useState } from 'react'

const Home = () => {

   const [dataDirectory, setDataDirectory] = useState([]);
    useEffect(() => {
      const getDirectory = async () => {
        const response = await apiGetDirectory();
        console.log("FULL RESPONSE", response);
        console.log("TYPEOF response.data:", typeof response.data.data);
        console.log("IS ARRAY?", Array.isArray(response.data.data));
        setDataDirectory(response.data.data);
      }
      getDirectory();
    }, [])



  return (
    <div>
      {dataDirectory.map((d) => (
        <div key={d._id}>
          <div className='text-black'>{d.title}</div>
          {d.category.map((c) => (
            <div key={c._id}>{c.title}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Home
