import React from 'react';
import {useState, useEffect, useRef} from "react"
export default function App() {
  
  const ref = useRef()

  // for Box properties
  const [div_prop, setDiv_prop] = useState([])

  // for the initial loading, as single useRef cant be used on multiple div boxes,
  const [count, setCount] = useState(true)


  useEffect(() => {
    // getting the initial window / box properties
    let resizableElement = ref.current
    let current_prop = window.getComputedStyle(resizableElement)
    let first_height = parseInt(current_prop.height, 10)
    let first_Width = parseInt(current_prop.width, 10)

    // setting initial state
    setDiv_prop([{
      height: first_height,
      width: first_Width,
      color: '111111',
    }])
    // for changing the condition after first loading
    setCount(false)
  }, [])


  const handleClick = (name, prop, ind) => {

    // intermediate variable 
    let interim_var = div_prop
    // for generating random color
    let color_value = Math.floor(Math.random() * 1000000)

    interim_var.forEach((org_obj, index) => {
      // for changing only height / Horizontaly
      if (name == 'height') {
        if (index == ind) {
          let new_Height = prop.height / 2
          // for changing the original div height
          let old_div = {
            height: new_Height,
            width: prop.width,
            color: prop.color
          }
          interim_var[index] = old_div

          // for defining the new div 
          let new_div = {
            height: new_Height,
            width: prop.width,
            color: color_value,
          }
          interim_var.push(new_div)
        }
      }
      // for changing only width/ Vertically
      if (name == 'width') {
        if (index == ind) {
          let new_width = prop.width / 2
          // for changing the original div width
          let old_div = {
            height: prop.height,
            width: new_width,
            color: prop.color,
          }
          interim_var[index] = old_div

          // for defining the new div 
          let new_div = {
            height: prop.height,
            width: new_width,
            color: color_value,
          }
          interim_var.push(new_div)
        }
      }
      // for delete operation
      if (name == 'delete') {
        if (index == ind) {  
          interim_var.splice(ind, 1); 
        }}
    })
    // updating the state after the H/V/D operation
    setDiv_prop([...interim_var])
  };


  console.log(div_prop)
  return (
    <div className='App'>{
      // initial loading condition
      count ? <div className="main_div" ref={ref}> 
        <button className='btn'>H</button>
        <button className='btn'>V</button>
      </div> : 
      // condtion after first loading
      <div className='master_div'>
        {div_prop.map((prop) => {
          return <div className="main_div" style={{height: `${prop.height}px`, width: `${prop.height}px`, backgroundColor: `#${prop.color}`}}>
            <button className='btn' onClick={() => handleClick('height', prop, div_prop.indexOf(prop))} >H</button>
            <button className='btn' onClick={() => handleClick('width', prop, div_prop.indexOf(prop))} >V</button>
            <button className='btn' onClick={() => handleClick('delete', prop, div_prop.indexOf(prop))} >-</button>
          </div>
        })}
      </div>
    }
    </div>
  );
}