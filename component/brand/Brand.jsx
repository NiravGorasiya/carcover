import React, { Fragment, useEffect, useState } from 'react'
import styles from "./Brand.module.css"
import Link from 'next/link'
import axios from "axios"
import url from '../../api/Apiservices'

const Brand = () => {
    const [data, setData] = useState([])
    const coverList = () => {
        axios.get(`${url}/category/all`)
            .then((response) => {
                setData(response.data)
            })
            .catch((err) => {

            })
    }

    useEffect(() => {
        coverList()
    }, [])

    return (
        <section className={styles['grid-wrapper']}>
            <div className='container'>
                <div className='row'>
                    {
                        data.map((item) => {
                            if (item.cover_image) {
                                return (
                                    <Fragment key={item._id}>
                                        <div className='col-lg-3 col-sm-4 col-6'>
                                            <Link href={item.name}>
                                                <div className={styles['entry-single']}>
                                                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.cover_image}`}></img>
                                                </div>
                                            </Link>
                                        </div>
                                    </Fragment>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Brand
