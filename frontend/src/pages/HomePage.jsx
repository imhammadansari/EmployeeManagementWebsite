import React from 'react';  
import { Link } from 'react-router-dom';  

const HomePage = () => {  
  return (  
    <>  
      <div className='w-screen h-screen'>  
        <div className='w-full h-1/2 bg-black pb-2 flex items-end justify-center'>  
          <Link to='/adminLogin'>  
            <button className='w-44 h-16 bg-slate-200 rounded text-xl'>Admin Login</button>  
          </Link>  
        </div>  

        <div className='w-full h-1/2 bg-slate-200 flex items-start pt-2 justify-center'>  
          <Link to='/employeeLogin'>  
            <button className='w-44 h-16 text-slate-200 bg-black rounded text-xl'>Employee Login</button>  
          </Link>  
        </div>  
      </div>  
    </>  
  );  
};  

export default HomePage;