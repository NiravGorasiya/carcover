import React, { useEffect, useState } from 'react'
import Footer from '../../../../../../component/Footer/Footer'
import Header from '../../../../../../component/Header/Header'
import ReviewWrapper from "../../../../../../component/ReviewWrapper/ReviewWrapper"
import Banner from "../../../../../../component/banner/Banner"
import Brand from '../../../../../../component/brand/Brand'
import Search from '../../../../../../component/search/Search'
import { useRouter } from 'next/router'
import Products from '../../../../../../component/products/Products'
import axios from "axios"
import url from '../../../../../../api/Apiservices'

const index = () => {
    const [productData, setProductData] = useState([])
    const router = useRouter();
    const cat = router.query.category;
    const year = router.query.year;
    const make = router.query.make
    const model = router.query.model
    const body = router.query.body

    const productList = () => {
        axios.get(`${url}/product/${cat}`)
            .then((response) => {
                setProductData(response.data)
            })
    }

    useEffect(() => {
        productList()
    }, [])

    return (
        <>
            <Header />
            <Banner />
            <Search props={cat} />
            <Products props={productData} category={cat} year={year} make={make} model={model} body={body} />
            <ReviewWrapper />
            <Footer />
        </>
    )
}

export default index
