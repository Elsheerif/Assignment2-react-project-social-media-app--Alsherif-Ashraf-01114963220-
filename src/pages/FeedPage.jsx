import React from 'react'
import { useContext } from 'react'
import { CounterContext } from '../contexts/CounterContext'
export default function FeedPage() {
  const {counter,setCounter}=useContext(CounterContext)
  return (
    <div>
      <h1>feedpage {counter}</h1>
      <button onClick={()=> setCounter(counter+1)} >inc</button>
    </div>
  )
}
