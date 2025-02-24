import React from 'react'
import {NavLink} from 'react-router-dom';

const CustomerPage = () => {
  return (
    <div>
        <header>
            <nav>
                <div>
                    <p>ABC</p>
                </div>
                <div className='list-container'>
                    <NavLink to='/customer' className="link">Customer Login</NavLink>
                    <NavLink to='/admin' className="link">Admin Login</NavLink>
                </div>  
            </nav>
        </header>
        <main className='customer-page'>
            <NavLink to='/rating/1' className="link-survey">Rate US!!!</NavLink>
        </main>
    </div>
  )
}

export default CustomerPage