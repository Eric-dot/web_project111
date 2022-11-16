import React from 'react'

const Location = () => {
    return (
        <>
            <div className="form-group mx-4 my-3">
                <label htmlFor="Location" className="form-label">Location*</label>
                <input type="text" className="form-control" id="Location" name='Location' required />
            </div>
            <div className="form-check mx-4 my-1">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Auto-detect my location
                </label>
            </div>
        </>
    )
}

export default Location
