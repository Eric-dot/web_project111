import React, { useState } from 'react'
import axios from 'axios';
import { Tabs } from 'antd';
const Table = ({ tasks }) => {
    const [showdetail, setshowdetail] = useState(false)
    const [detail, setdetail] = useState({
        categories: [], display_phone: '', hours: [],
        location: [], name: '', coordinates: [], photos: [], price: '', rating: 0, id: ''
    })
    const { businesses } = tasks;
    const onclick1 = async (id) => {
        const res = await axios({

            method: 'get',
            url: 'http://localhost:8081/detail',
            params: {
                text: id,
            },
            headers: {
                Authorization:
                    'Bearer DB9-K_wTi80GDUBskr3tsjfOHYpqTg9TBTS8lHBhqA-IE_0oc-BAyACbyGlK-2YPUBwC5ExYq2g0FUpkIBmTwTv_tzm58qW-EvwXhEVLXVYrPXBtMIr8_2GbJF6kX3Yx',
            },
        })
        setdetail(res.data)
        console.log(res.data)
        // setshowdetail(true)


    }

    const data = [
        ...businesses.map((item) => ({ name: item.name, img: item.image_url, rating: item.rating, distance: item.distance, id: item.id })),
    ];


    return (
        <>
            {!showdetail && (
                <div className='row'>
                    <div className='row col-md-10 offset-md-1'>
                        <table className='table table-striped table-light'>
                            <thead>
                                <tr>
                                    <th className='col-md-1' style={{ width: "3%" }}>
                                        #

                                    </th>
                                    <th className='col-md-1 text-center'>
                                        Image
                                    </th>
                                    <th className='col-md-2 text-center'>
                                        Business Name
                                    </th>
                                    <th className='col-md-1 text-center'>
                                        Rating
                                    </th>
                                    <th className='col-md-1 text-center'>
                                        Distance(mile)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (


                                    <tr key={index} onClick={() => onclick1(item.id)}>
                                        <th>{index + 1}</th>
                                        <td className='text-center'><img src={item.img} alt='' className='"img-fluid" ' width="100" height="100" />

                                        </td>
                                        <td className='col-md-2 text-center'>{item.name}</td>
                                        <td className='col-md-1 text-center'>{item.rating}</td>
                                        <td className='col-md-1 text-center'>{parseInt(item.distance / 1600)}</td>
                                    </tr>

                                )
                                )

                                }
                            </tbody>

                        </table>

                    </div>

                </div>

            )

            }
            {!showdetail && (
                <div className='row'>
                    <div className="col">
                    </div>
                    <div className='col-10'>
                        <div className='card mx-5 my-5 '>
                            <h1 className='text-center' >
                                {detail.name}
                            </h1>
                            <Tabs
                                defaultActiveKey="1"
                                centered
                                items={[{
                                    key: 1,
                                    label: 'Bussiness details',
                                    children: 
                                    <>
                                    <div className='row'>
                                        <div className='col-6 text-center'>
                                            <h2>Address</h2>
                                            <p>{detail.location.address1 + detail.location.address2 + detail.location.address3 + ' ' + 
                                                detail.location.city + ' ' + detail.location.state + ' ' + detail.location.zip_code}</p>
                                        </div>
                                        <div className='col-6 text-center' >
                                            <h2>Category</h2>
                                           <p>{detail.categories.map((items)=>items.title).join(' | ')}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6 text-center'>
                                            <h2>Phone</h2>
                                            <p>{detail.display_phone}</p>
                                        </div>
                                        <div className='col-6 text-center' >
                                            <h2>Price range</h2>
                                           <p>{detail.price}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6 text-center'>
                                            <h2>Status</h2>
                                            <p>{detail.hours.map((items)=>items.is_open_now) ? <span className='text1'>Closed</span>:<span  className='text2'>Open</span>}</p>
                                        </div>
                                        <div className='col-6 text-center' >
                                            <h2>Visit ylep for more</h2>
                                            <a href={detail.url}>Business link</a>
                                        </div>
                                    </div>
                                    </>

                                },
                                {
                                    key: 2,
                                    label: 'Map location',
                                    children: 
                                    <div>
                                    </div>
                                },
                                {
                                    key: 3,
                                    label: 'Reviews',
                                    children: 
                                    <div>
                                    </div>

                                }]}
                            />
                        </div>

                    </div>
                    <div className="col">
                    </div>
                </div>


            )

            }

        </>
    )
}

export default Table

