import React from 'react';
import '../styles/Main.css'
import {NavLink} from 'react-router-dom';

const Main = () => {
  return (
    <div>
        <header>
            <nav>
                <div>
                    <p>ABC</p>
                </div>
                <div className='list-container'>
                    <NavLink to='./customer' className="link">Customer Login</NavLink>
                    <NavLink to='./admin' className="link">Admin Login</NavLink>
                </div>  
            </nav>
        </header>
        <main>
            <p>Welcome to our site</p>
        </main>
    </div>
  )
}

export default Main