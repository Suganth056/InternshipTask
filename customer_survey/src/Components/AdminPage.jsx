import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom';
import '../styles/Admin.css'

const AdminPage = () => {
    const [question,setQuestion]=useState();
    const [questionType,setType]=useState("");
    const [count,setCount]=useState(1);
    // const [obj,setObj]=useState();
    const [datas,setData]=useState("");
    const [countLen, setCountLen] = useState(0);
    console.log(question);

    const postDetails=async(postOptions)=>{
        try{
            let response=await fetch("http://localhost:3500/data",postOptions);
            console.log(response);
        }
        catch(err){
            console.log("Error");
        }
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        
        if(question){
            console.log("Questions filled");
            console.log("Clen=",countLen);
            
            let data={
                id:countLen,
                question,
                questionType,
                ratingCount:count
            }
            setCountLen((prev)=>prev+1);
            const postOptions={
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            }
            postDetails(postOptions);
            console.log("Submitted");
        }

        else{
            alert("please fill the questions")
        }
        
    }
    
    useEffect(()=>{
        const fetchDetails=async()=>{
            try{
                let response=await fetch("http://localhost:3500/data").then(res => res.json());
                console.log(response)
                let len=await response.length;
                console.log(len);
                let res=await setCountLen(len);
                console.log(countLen);
                if(len===0){
                    setCountLen(1);
                }
                else{
                    setCountLen(len);
                    
                }
                console.log(countLen);
                
            }
            catch(err){

            }
        }
        fetchDetails();
    },[])
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
        <main className='create-survey'>
            <p>Create a Survey</p>
            <form action="">
                <div className='container'>
                    <label htmlFor="">Enter Question</label>
                    <textarea placeholder='Enter Question' onChange={(e)=>setQuestion(e.target.value)} value={question} required></textarea>
                </div>
                <div className='container'>
                    <label htmlFor="">Enter Question Type</label>
                    <div  className='box-container'>
                        <div className='box'>
                            <input type="radio" name="Type" value="ratings" onClick={(e)=>setType(e.target.value)}/>
                            <label htmlFor="">Ratings</label>
                        </div>
                        <div className='box'>
                            <input type="radio" name="Type" value="input" onClick={(e)=>setType(e.target.value)}/>
                            <label htmlFor="">Input</label>
                        </div> 
                    </div>  
                </div>
                <div className='container rating'>
                        <label htmlFor="">Rating's Count</label>
                        <input type="number" min={1} max={10} onChange={(e)=>setCount((Number)(e.target.value))} value={count}/>
                </div>
                <div className='btn-container-admin'>
                    <button type='submit' onClick={(e)=>submitHandler(e)}>Submit</button>
                </div>
            </form>
        </main>
    </div>
  )
}

export default AdminPage