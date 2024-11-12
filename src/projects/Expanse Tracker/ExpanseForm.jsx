import React from 'react'

function ExpanseForm({handleSubmit,Expanse,setExpanse}) {
  return (
    <div>
      <form onSubmit={(e)=>handleSubmit(e)}>
      <input type="text" placeholder='Name' value={Expanse.text} onChange={(e)=>setExpanse((prev)=>({...prev,text:e.target.value,id:e.target.value}))} />
      <input type="text" placeholder='Category' value={Expanse.category} onChange={(e)=>setExpanse((prev)=>({...prev,category:e.target.value}))} />
      <input type="number" value={Expanse.amount} onChange={(e)=>setExpanse((prev)=>({...prev,amount:e.target.value}))} />
      <button type='submit' >Add</button>
      </form>
    </div>
  )
}

export default ExpanseForm
