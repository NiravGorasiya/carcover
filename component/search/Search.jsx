import React, { useEffect, useState } from 'react'
import styles from './Search.module.css'
import url from '../../api/Apiservices'
import axios from "axios"

const Search = () => {
    const [yearData, setYearData] = useState([])
    const [makeData, setMakeData] = useState([])
    const [modelData, setModelData] = useState([])
    const [bodyData, setBodyData] = useState([])

    const yearList = () => {
        axios.get(`${url}/vehicle/car`)
            .then((response) => {
                setYearData(response.data)
            })
    }

    const handleMake = (year) => {
        console.log(year);

        const data = { year: parseInt(year), name: "car" }
        axios.post(`http://localhost:5500/api/vehicle/all/make`, data)
            .then((response) => {
                console.log(response, "response");
                setMakeData(response.data)
            })
    }

    const handleModel = (value) => {
        const data = { name: value }
        axios.post(`${url}/vehicle/all/model`, data)
            .then((response) => {
                setModelData(response.data)
            })
    }

    const handleBody = (value) => {
        const data = { name: value }
        axios.post(`${url}/vehicle/all/body`, data)
            .then((response) => {
                setBodyData(response.data)
            })
    }

    // const searchProduct = (e) => {
    //     e.preventDefault();
    //     axios.get(`${url}/cart/add/car/2022/bmw/118d/3-door-hatchback`)
    //         .then((response) => {
    //             console.log(response, "response");
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    useEffect(() => {
        yearList()
    }, [])
    return (
        <>
            <section className={styles['form-wrapper']}>
                <div className='container'>
                    <div className={`form - inline ${styles['cover-search']}`} id="moveTop">
                        <h3 className={styles['search-title']}>
                            vehicle
                            <br></br>
                            search
                        </h3>
                        <div className='form-group text-center'>
                            <label>vehicle year</label>
                            <select className={`form - control  required - border ${styles['select-create']}`} name="drop1" onChange={(e) => handleMake(e.target.value)}>
                                <option value="">Select Year</option>
                                {
                                    yearData.map((item) => (
                                        <option key={item.year} value={item.year}>{item.year}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='form-group text-center'>
                            <label className='select-label'>Vehicle Make</label>
                            <select className={`form - control  required - border ${styles['select-create']}`} name="drop1" onChange={(e) => handleModel(e.target.value)}>
                                <option value="">Select Make</option>
                                {
                                    makeData.map((item) => (
                                        <option value={item.make_id.name} key={item.make_id.name}>{item.make_id.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='form-group text-center'>
                            <label className='select-label'>Vehicle model</label>
                            <select className={`form - control  required - border ${styles['select-create']}`} name="drop1" onChange={(e) => handleBody(e.target.value)}>
                                <option value="">Select Model</option>
                                {
                                    modelData.map((item) => {
                                        return (
                                            <option value={item.model_id.name} key={item.model_id.nmae}>{item.model_id.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='form-group text-center' style={{ position: "relative" }}>
                            <label className='select-label'>Vehicle body</label>
                            <select className={`form - control  required - border ${styles['select-create']}`} name="drop1">
                                <option>select car Body</option>
                                {
                                    bodyData.map((item) => (
                                        <React.Fragment key={item.name}>
                                            <option value={item.body_id.name} key={item.body_id.name}>{item.body_id.name}</option>
                                        </React.Fragment>
                                    )
                                    )
                                }
                            </select>
                        </div>
                        <input type="hidden" value="2" />
                        <input type="hidden" value="2" />
                        <input type="hidden" value="2" />
                        <button className={`btn btn - primary ${styles['btn-style']}`} onClick={searchProduct}>Search</button>

                    </div>
                </div>
            </section>
        </>
    )
}


export default Search
