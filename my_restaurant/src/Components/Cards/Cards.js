import React, { useEffect, useState } from 'react';
import styles from './Cards.module.css';

const Cards = () => {
    const [menudata, setmenudata ]= useState([]);
    const fetchdatamenu =  async ()=>{
        try {
            const res = await fetch('http://localhost:5000/api/menu');
            const data = await res.json();
console.log(data);
setmenudata(data);
            
        } catch (error) {
            
        }



    };

   useEffect(()=>(fetchdatamenu),[])
   const nextpage=async(id)=>{
    const res = await fetch(`http://localhost:5000/api/menu/${id}`)
    console.log(res.json())
   }

  return (
    <>
    <div className={styles.overallcard}>
   {menudata.map((data,index)=>(
     <div className={styles.overall} key={index}>
      <img src='/pizza.png' className={styles.image} alt='pizza' />
      <h1 className={styles.title}>{data.name}</h1>
      <div className={styles.pricecontent}>
        <p>{data.price}</p>
        <p onClick={()=>nextpage(data._id)}>+</p>
      </div>
    </div>
   ))
   
}
</div>
     </>
  );
};

export default Cards;