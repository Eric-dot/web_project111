import React from 'react'
const Button = () => {
  const onClick1 = () => {
    console.log("click")
  }
  const onClick2 = () => {
    console.log("click")
  }

  return (
    <div className='row'>
      <div className="col-4">
      </div>
      <div className="col-1 my-2">
        <button onClick={onClick1} type="button" className="btn btn-danger">Submit</button>

      </div>
      <div className="col-1 ms-5 my-2">

        <button onClick={onClick2} type="button" className="btn btn-primary">Clear</button>
      </div>
      <div className="col">
      </div>

    </div>
  )
}

export default Button
