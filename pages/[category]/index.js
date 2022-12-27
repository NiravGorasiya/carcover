import React from 'react'
import { useRouter } from "next/router"
import Search from "../../component/search/Search"
import Header from "../../component/Header/Header"
import Brand from '../../component/brand/Brand'
import Banner from "../../component/banner/Banner"
import ReviewWrapper from '../../component/ReviewWrapper/ReviewWrapper'
import Footer from '../../component/Footer/Footer'


const category = () => {
    const router = useRouter();
    const pageno = router.query.category



    return (
        <>
            <Header />
            <Banner props={pageno} />
            <Search props={pageno} />
            <Brand />
            <ReviewWrapper />
            <Footer />
        </>
    )
}

export default category
