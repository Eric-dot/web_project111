import { useState } from 'react'
import React from 'react'
import { AutoComplete } from "antd";
import axios from 'axios';


const Form = ({ onAdd, onauto }) => {
    const [Keyword, setKeyword] = useState('')
    const [Distance, setDistance] = useState('')
    const [Category, setCategory] = useState('')
    const [Location, setLocation] = useState('')
    const [Autoloc, setAutoloc] = useState(false)
    const [options, setOptions] = useState([]);


    const onClick1 = (e) => {
        e.preventDefault()

        if (!Keyword) {
            alert('Please add a task')
            return
        }

        onAdd({ Keyword, Distance, Category, Location, Autoloc })

    }

    const onClick2 = (e) => {
        setKeyword('')
        setDistance('')
        setCategory('')
        setLocation('')
        setAutoloc(false)
      
    }

    const onSearch = async (searchText) => {
        if (searchText === '')
            return setOptions([])
        const res = await axios({

            method: 'get',
            url: 'http://localhost:8081/autocomplete',
            params: {
                text: searchText,
            },
            headers: {
                Authorization:
                    'Bearer DB9-K_wTi80GDUBskr3tsjfOHYpqTg9TBTS8lHBhqA-IE_0oc-BAyACbyGlK-2YPUBwC5ExYq2g0FUpkIBmTwTv_tzm58qW-EvwXhEVLXVYrPXBtMIr8_2GbJF6kX3Yx',
            },
        })
        console.log(res)
        const { terms, businesses, categories } = res.data;

        const allData = [
            ...terms.map((item) => ({ lable: item.text, value: item.text })),
            ...businesses.map((item) => ({ lable: item.name, value: item.name })),
            ...categories.map((item) => ({ lable: item.title, value: item.title }))
        ];
        setOptions(
            allData
        );
        console.log(allData);

    };
 


    return (
        <div className='row'>
            <div className="col">
            </div>

            <div className='col-6'>

                <div className='card mx-5 my-5 '>
                    <div>
                        <h3 className='text-center mt-4 md-4'>Business Search</h3>
                    </div>
                    <div className="form-group mx-4 my-3">
                        <label htmlFor="Keyword" className="form-label">Keyword*</label>
                        <AutoComplete
                            className="form-control"
                            popupClassName = "auto-complete-list"
                            options={options}
                            onChange={(value) => setKeyword(value)}
                            onSearch={onSearch}
                        />
                    </div>

                    <div className="row">
                        <div className="col-6 ms-4 my-3">
                            <label htmlFor="inputDistance">Distance</label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputDistance"
                                placeholder="10"
                                value={Distance}
                                onChange={(e) => setDistance(e.target.value)}
                                required />
                        </div>
                        <div className="col-4 me-4 my-3">
                            <label htmlFor="inputCategory">Category*</label>
                            <select className="form-select" aria-label="Default select example" id="inputCategory" name='inputCategory' value={Category} onChange={(e) => setCategory(e.target.value)} >
                                <option value="Default" defaultValue>Default</option>
                                <option value="Arts & Entertainment">Arts & Entertainment</option>
                                <option value="Health & Medical">Health & Medical</option>
                                <option value="Hotels & Travel">Hotels & Travel</option>
                                <option value="Food">Food</option>
                                <option value="Professional Services">Professional Services</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group mx-4 my-3">
                        <label htmlFor="Location" className="form-label">Location*</label>
                        <input type="text"
                            className="form-control"
                            id="Location"
                            name='Location'
                            value={Location}
                            onChange={(e) => setLocation(e.target.value)} required />
                    </div>
                    <div className="form-check mx-4 my-1">
                        <label className="form-check-label" htmlFor="flexCheckDefault">  Auto-detect my location </label>
                        <input className="form-check-input"
                            type="checkbox"
                            value={Autoloc}
                            id="flexCheckDefault"
                            onChange={(e) => setAutoloc(e.currentTarget.checked)}
                        />


                    </div>
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

                </div>
            </div>
            <div className="col">
            </div>
        </div>
    )
}

export default Form
