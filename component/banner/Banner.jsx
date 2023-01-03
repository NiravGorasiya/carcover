import React, { Fragment, useEffect, useState } from 'react'
import styles from "./Banner.module.css"
import Link from "next/link"
import axios from "axios"
import url from '../../api/Apiservices'

const Banner = ({ props }) => {
    const [banner, setBanner] = useState({})
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

    const bannner = () => {
        let cat;
        if (props) {
            cat = props
        } else {
            cat = "Car"
        }
        axios.get(`${url}/category/banner/${cat}`)
            .then((response) => {
                setBanner(response.data);
            })
            .catch((err) => {
                console.log(err, "err");
            })

    }
    useEffect(() => {
        categoryList()
        bannner()
    }, [props])

    return (
        <>
            <div className='container'>
                <nav className={`navbar navbar-expand-lg navbar-light bg-light ${styles['navbar-style']}`}>
                    <div className={`collapse navbar-collapse ${styles['navbar-collapse-style']}`}>
                        <ul className="navbar-nav mr-auto" style={{ width: "100%" }}>
                            {categoryData.map((item) => {
                                return (
                                    <Fragment key={item._id}>
                                        <li className='nav-item active' style={{ width: "7.6923076923077%" }}>
                                            <Link href={`/${item.name}`}>
                                                <div>
                                                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.image}`} style={{ maxWidth: "100%", height: "40px" }} alt='car cover' />
                                                </div>
                                                <div>{item.name}</div>
                                            </Link>
                                        </li>
                                    </Fragment>
                                )
                            })}
                        </ul>
                    </div>
                </nav>
                <section className={styles['banner-wrap']}>

                    <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${banner?.banner}`}
                        className='img-fluid w-100 d-none d-md-block'
                    />
                </section>
            </div>
        </>
    )
}

export default Banner
