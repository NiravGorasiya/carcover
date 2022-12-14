import React, { Fragment, useEffect, useState } from 'react'
import styles from "./Banner.module.css"
import Link from "next/link"
import axios from "axios"
import url from '../../api/Apiservices'

const Banner = () => {
    const [categoryData, setCategoryData] = useState([])
    const categoryList = () => {
        axios.get(`${url}/category/all`)
            .then((response) => {
                setCategoryData(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        categoryList()
    }, [])

    return (
        <>
            <div className='container'>
                <nav className={`navbar navbar-expand-lg navbar-light bg-light ${styles['navbar-style']}`}>
                    <div className={`collapse navbar-collapse ${styles['navbar-collapse-style']}`}>
                        <ul className="navbar-nav mr-auto" style={{ width: "100%" }}>
                            {categoryData.map((item) => (
                                <Fragment key={item._id}>
                                    <li className='nav-item active' style={{ width: "7.6923076923077%" }}>
                                        <Link href={`http://localhost:3000/${item.name}`}>
                                            <div>
                                                <img src={`http://localhost:5500/${item.image}`} style={{ maxWidth: "100%", height: "40px" }} alt='car cover' />
                                            </div>
                                            <div>{item.name}</div>
                                        </Link>
                                    </li>
                                </Fragment>
                            ))}
                        </ul>
                    </div>
                </nav>
                <section className={styles['banner-wrap']}>
                    <img
                        src='https://d68my205fyswa.cloudfront.net/fit-in/1270x287/carcoversfactory-cyber-monday-car-covers.jpg?v=134'
                        className='img-fluid w-100 d-none d-md-block'
                    />
                </section>
            </div>
        </>
    )
}


export default Banner
