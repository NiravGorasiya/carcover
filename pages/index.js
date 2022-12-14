import React from "react"
import Banner from "../component/banner/Banner";
import Brand from "../component/brand/Brand";
import Center from "../component/center/Center";
import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";
import Lower from "../component/lower/Lower";
import Search from "../component/search/Search";
import Products from "../component/products/Products"
import ReviewWrapper from "../component/ReviewWrapper/ReviewWrapper";

const Home = () => {
    return (
        <>
            <Header />
            <Banner />
            <Search />
            <Brand />
            <Center />
            <Products />
            <Lower />
            <ReviewWrapper />
            <Footer />
        </>
    )
}

export default Home;