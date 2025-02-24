import React, { useState,useEffect } from 'react'
import '../styles/RatingQuestion.css'
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
const RatingQuestion = () => {
    
    let {id}=useParams();
    const [questions,setQuestion]=useState([]);
    const [len,setLen]=useState(0);
    const nav=useNavigate();
    const [numbers, setNumbers] = useState([]);
    const [remarks,setRemarks]=useState("");
    
    let temp=[];
    const [activeCount,setActiveCount]=useState(1);
    // console.log(activeCount)
    console.log(id);

    const [valueDetector,setValueDetector]=useState([]);
    const [prevValue,setPrevValue]=useState(null);


    useEffect(()=>{

        const fetchItems=async()=>{


            try{
                console.log("Ok")
                let response=await fetch("http://localhost:3500/data").then(res => res.json());
                console.log(response);
                setLen(response.length);
                let r=await response.filter(data => data.id == id);
                // console.log("ERE",r,len);
                setQuestion(r);
                console.log(questions)
                
            }
            catch(err){
                console.log(err);
            }
            
        }
        fetchItems();
        
    },[id])

    useEffect(()=>{
        const fetchArray=()=>{
            if(questions.length){
                setNumbers(() => {
                    let temp = [];
                    for (let i = 1; i <= questions[0].ratingCount; i++) {
                        temp.push(i);
                    }
                    console.log("Generated Numbers:", temp);
                    return temp; // Correctly updates state
                });
        
            }
        }
            
        fetchArray();
    },[questions,activeCount])

    const postDetail=async(obj)=>{
        try{
            console.log("Entered into Details customer")
            const res=await axios.post('http://localhost:3501/rating',obj);
            console.log("res_______",res);
        }
        catch(err){
            console.log("error",err);
        }
    }

    useEffect(()=>{
        console.log("______++++",valueDetector);
        let arr=valueDetector.filter((data)=>(
            data.id==id
        ))
        setPrevValue(arr);
        console.log("_____arr____",arr,prevValue);
        
    },[valueDetector])
    const fetchCustomerRating=async()=>{
        try{
            console.log("Entered into getting customer");
            const res=await axios.get(`http://localhost:3501/rating/`);
            console.log("res_______",res);
            let count=await res.data[id-1].activeCount;
            setActiveCount(count);
            
            setValueDetector((prev)=>res.data);
            
            console.log("Value Detector",valueDetector);
        }
        catch(err){
            console.log("error",err);
        }
    }

    const updateValue= async(obj)=>{
        try{
            
            const res=await axios.patch(`http://localhost:3501/rating/${id}`,{activeCount});
            console.log(res);

        }
        catch(err){
            console.log("error",err);
        }
    }

    const nextBtn=()=>{


        if(prevValue.length){
            setPrevValue(prev=>[]);
            console.log("Into the PrevValue");
            let obj={id,activeCount,remarks}
            console.log(obj);
            updateValue(obj);
        }
        else{
            let obj={id,activeCount,remarks}
            console.log(obj);
            postDetail(obj);
            setRemarks("");
        }
        
        nav(`/rating/${++id}`);
    }

    const prevBtn=()=>{
        let obj={id:(Number)(id),activeCount}
        fetchCustomerRating(obj);
        nav(`/rating/${--id}`);
    }

    const handleSubmit=()=>{
        console.log("Submit")
        let ok=confirm("Are you sure want to submit");
        if(ok){
            if(activeCount){
                let obj={id:(Number)(id),activeCount,remarks}
                console.log(obj);
                postDetail(obj);
                setActiveCount(null);
            }
            else{
                let obj={id:(Number)(id),remarks};
                console.log(obj);
                 postDetail(obj);
                 setActiveCount(null);
            }
            
            setRemarks("");
            alert("Form Submitted");
            nav(`/`);
        }
    }

    
  return (
    <div className='Rating-component'>
        {/* <div className='rating-container'>
            <h1>Customer Survey</h1>
            <div className='inner-container'>
                <p className='right'>1/5</p>
                <p className='question'>1.How satiesfied are you with our Products?</p>
                <div className='input-container'>
                    <input type="text" value="1" placeholder='1' readOnly/>
                    <input type="text" value="2" placeholder='2' readOnly/>
                    <input type="text" value="3" placeholder='3' readOnly/>
                    <input type="text" value="4" placeholder='4' readOnly/>
                    <input type="text" value="5" placeholder='5' readOnly/>
                </div>
                <div className='btn-container'>
                    <button type="button">Prev</button>
                    <button type='button'>Next</button>
                </div>
            </div>
        </div> */}
        {
            questions.length>=1?
            questions.map((data,key)=>(
                <div className='rating-container'>
                    <h1>Customer Survey</h1>
                    <div className='inner-container'>
                        <p className='right'>{id}/{len}</p>
                        <p className='question'>{id}. {data.question}</p>

                        <div className='input-container'>
                            {
                                data.questionType=="ratings" ? numbers.map(element => (
                                    element===activeCount?<input type="text" value={element} placeholder={element} readOnly className='active' onClick={(e)=>setActiveCount((Number)(e.target.value))}/>
                                    :<input type="text" value={element} placeholder={element} readOnly onClick={(e)=>setActiveCount((Number)(e.target.value))}/>
                                )) : <textarea className='textarea' placeholder='Enter Remarks' value={remarks} onChange={(e)=>setRemarks(e.target.value)}></textarea>
                                
                            }
                            

                        </div>
                        <div className='btn-container'>
                            {id>1?<button type="button" onClick={(e)=>prevBtn()}>Prev</button>:""}
                            {id==len?<button type='button' onClick={(e)=>handleSubmit()}>Submit</button>:<button type='button' onClick={(e)=>nextBtn()}>Next</button>}
                        </div>
                    </div>
                </div>
            ))
            :"No Data"
        }
    </div>
  )
}

export default RatingQuestion