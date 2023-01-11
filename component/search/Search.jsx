import React, { useEffect, useState } from 'react'
import styles from './Search.module.css'
import url from '../../api/Apiservices'
import axios from "axios"
import { useRouter } from 'next/router'

const Search = ({ props }) => {
    const router = useRouter();
    const [yearData, setYearData] = useState([])
    const [makeData, setMakeData] = useState([])
    const [modelData, setModelData] = useState([])
    const [bodyData, setBodyData] = useState([])
    const [component, setComponent] = useState(false)
    const [year, setYear] = useState('')
    const [make, setMake] = useState('')
    const [model, setModal] = useState('')
    const [body, setBody] = useState('')

    const yearList = () => {
        if (props != undefined) {
            axios.get(`${url}/vehicle/${props}`)
                .then((response) => {
                    setYearData(response.data)
                })
        }
    }

    const handleMake = (year) => {
        setYear(year)
        const data = { year: parseInt(year), name: props }
        axios.post(`${url}/vehicle/all/make`, data)
            .then((response) => {
                setMakeData(response.data)
            })
    }

    const handleModel = (value) => {
        setMake(value)
        const data = { name: value }
        axios.post(`${url}/vehicle/all/model`, data)
            .then((response) => {
                setModelData(response.data)
            })
    }

    const handleBody = (value) => {
        setModal(value)
        const data = { name: value }
        axios.post(`${url}/vehicle/all/body`, data)
            .then((response) => {
                setBodyData(response.data)
            })
    }

    const searchProduct = (e) => {
        e.preventDefault();
        if (year && make && model && body) {
            router?.push(`${props}/${year}/${make}/${model}/${body}`);
            setComponent(true)
        }
    }

    useEffect(() => {
        yearList()
    }, [props])

    return (
        <>
            <section className={styles['form-wrapper']}>
                <div className='container'>
                    <div className={`${styles['form-inline']} ${styles['cover-search']}`} id="moveTop">
                        <h3 className={styles['search-title']}>
                            {props}
                            <br></br>
                            search
                        </h3>
                        <div className={`${styles['form-group']} text-center`}>
                            <label className="select-label">{props} year</label>
                            <select value={year} className={`form-control  required-border ${styles['select-create']}`} name="drop1" onChange={(e) => handleMake(e.target.value)}>
                                <option value="">Select Year</option>
                                {
                                    yearData.map((item) => (
                                        <option key={item.year} value={item.year}>{item.year}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className={`${styles['form-group']} text-center`}>
                            <label className='select-label'>{props} Make</label>
                            <select className={`form-control  required-border ${styles['select-create']}`} value={make} name="drop1" onChange={(e) => handleModel(e.target.value)}>
                                <option value="">Select Make</option>
                                {
                                    makeData.map((item) => (
                                        <option value={item.make_id.name} key={item.make_id.name}>{item.make_id.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className={`${styles['form-group']} text-center`} >
                            <label className='select-label'>{props} model</label>
                            <select className={`form-control  required-border ${styles['select-create']}`} value={model} name="drop1" onChange={(e) => handleBody(e.target.value)}>
                                <option value="">Select Model</option>
                                {
                                    modelData.map((item) => {
                                        return (
                                            <option value={item.model_id.name} key={item._id}>{item.model_id.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className={`${styles['form-group']} text-center`} style={{ position: "relative" }}>
                            <label className='select-label'>{props} body</label>
                            <select className={`form-control  required-border ${styles['select-create']}`} name="drop1" value={body} onChange={(e) => setBody(e.target.value)}>
                                <option>Select Body</option>
                                {
                                    bodyData.map((item) => {
                                        return (
                                            <React.Fragment key={item._id}>
                                                <option value={item.body_id.name}>{item.body_id.name}</option>
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <button className={`btn btn-primary ${styles['btn-style']}`} onClick={searchProduct}>Search</button>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Search






