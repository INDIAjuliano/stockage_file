
import React from 'react'
import './App.css'

function Button(props) {
  console.log(props);

  return <button className={`btn btn-primary ${props.className || ''}`}>
    {props.text}
  </button>
}


function App() {
  return (
    <>
      <div>
        <h1>Hello</h1>
        <Button className="btn-sm" text="je suis super"/>
      </div>
    </>
  )
}

export default App
