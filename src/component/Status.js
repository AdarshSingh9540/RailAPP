import React, { useEffect, useState } from 'react';
import Typewriter from "typewriter-effect";
const Status = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState(null); // State to hold the fetched data
    const [colorIndex, setColorIndex] = useState(0); // Index to track current color
    const colors = ['text-blue-800', 'text-red-800', 'text-green-800']; // Array of colors
    const intervalTime = 7000;

    const fetchData = async () => {
        const url = 'https://trains.p.rapidapi.com/';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': '39f87651d2mshbbc2e382ae2f354p1734b5jsn84cd98aec020',
                'X-RapidAPI-Host': 'trains.p.rapidapi.com'
            },
            body: JSON.stringify({ search: searchQuery })
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setResult(result); 
            console.log(result)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = () => {
        fetchData();
    }

    const handleQuery = (event) => {
        setSearchQuery(event.target.value)
    }

    useEffect(() => {
        // Set interval to change color
        const interval = setInterval(() => {
            setColorIndex((prevIndex) => (prevIndex + 1) % colors.length); // Increment index circularly
        }, intervalTime);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);
    return (
        <>  <div className="">
        <div className={`font-sans font-extrabold text-4xl absolute top-1/2 left-[6%] ${colors[colorIndex]}`}>
            <Typewriter
                onInit={(typewriter) => {
                    typewriter
                        .typeString('Indian Railway')
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString('Welcomes You !')
                        .start();
                }}
                options={{
                    autoStart: true,
                    loop: true,
                    delay: 100,
                }}
                className="text-green-800"
            />
        </div>
    </div>

        <div className=' status-container height-auto absolute top-1/2 left-[78%] transform -translate-x-1/2 -translate-y-1/2  z-0'>
            <div className='flex'>
                <input value={searchQuery} onChange={handleQuery} type="text" className="bg-gray-200 text-black font-bold p-4 w-[430px] rounded-full shadow-xl" placeholder='Enter train name or number' />
                <button onClick={handleSearch} className=' bg-blue-600 font-semibold font-serif  text-white rounded-2xl px-4 py-3 m-2 hover:bg-green-500'>Search</button>
            </div>
            {result && result.length > 0 && (
  <div className='text-white font-bold mt-6 flex items-center'>
    <div className='border p-4 bg-slate-500 rounded-lg px-8 w-[650px] px-6 font-serif'>
      Train Details: {result[0].train_num} | {result[0].name}
    </div>
  </div>
)}

{result && result.length > 0 && result[0]?.data && (
  <div className='text-white font-semibold mt-4'>
    <div className='flex flex-row m-4 ml-0 p-4 font-semibold text-lg bg-gray-400 text-blue-700'>
      <span className='ml-6 font-serif'>Departure Station: {result[0]?.train_from} </span>
      <hr />
      <hr />
      <span className='ml-20'>|</span>
      <span className='mx-12 font-serif'>Arrival Station: {result[0]?.train_to} </span>
      <hr />
    </div>

    <div className='flex flex-row m-4 ml-0 p-4 font-semibold text-lg bg-gray-400 text-blue-700'>
      <span className='ml-6 font-serif'>Departure Timing : {result[0]?.data?.departTime}</span>
      <hr />
      <hr />
      <span className='ml-20'>|</span>
      <span className='mx-10 font-serif'>Arrival Timing : {result[0]?.data.arriveTime}</span>
      <hr />
    </div>

    <div className='flex flex-row m-4 ml-0 p-4 font-semibold text-lg bg-gray-400 text-blue-700'>
    <span className='ml-6 font-serif'>Classes Available : {result[0]?.data?.classes.join(" , ")}</span>
    </div>
    <div className='bg-gray-400 flex p-4 text-lg text-blue-700'>
      <div className='flex flex-row px-4 font-serif'>
        Running Days:
        <p className='mx-8 font-semibold'>
          {Object.entries(result[0].data.days).map(([day, value]) => (
            value === 1 && <span key={day}>{day}, </span>
          ))}
        </p>
      </div>
    </div>
  </div>
)}</div>
</>

    );
    
}

export default Status;
