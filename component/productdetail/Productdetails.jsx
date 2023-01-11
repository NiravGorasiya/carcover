import React, { Fragment } from 'react'
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Styles from "./ProductDetails.module.css"
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import url from '../../api/Apiservices';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

const Productdetails = () => {
    const [prodetail, setProductDetail] = useState({})
    const [title, setTitle] = useState("")
    const [regularPrice, setRegularPrice] = useState("")
    const [currentPrice, setCurrentPrice] = useState("")
    const [image, setImage] = useState([])
    const router = useRouter()
    const categoryid = router.query.slug
    const category = router.query.category;
    const year = router.query.year;
    const make = router.query.make;
    const model = router.query.model;
    const body = router.query.body


    const producrtdetail = async () => {
        try {
            await axios.get(`${url}/product/one/${categoryid}`)
                .then((response) => {
                    response?.data?.result?.product?.map((value) => {
                        setTitle(value?.title)
                        setImage(value?.image)
                        setProductDetail(value)
                        setRegularPrice(value?.regular_price)
                        setCurrentPrice(value?.current_Price)

                    })
                })
        } catch (error) {

        }
    }


    const addtoCart = (item) => {
        const data = { product_id: item }
        axios.post(`${url}/cart/add/${category}/${year}/${make}/${model}/${body}`, data, {
            withCredentials: true
        })
            .then((res) => {
                router?.push("/cart")
            })
    }

    useEffect(() => {
        producrtdetail()
    }, [categoryid])

    return (
        <>
            <Header />
            <section className={` ${Styles['page-content']} ${Styles['single-wrapper']}`}>
                <div className="container">
                    <div className={`${Styles['inner-wrap']} ${Styles['p-info']}`}>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="https://www.carcoversfactory.com/">Home</a></li>
                                <li className="breadcrumb-item"><a href="https://www.carcoversfactory.com/car-covers/">{category} Covers</a></li>
                                <li className="breadcrumb-item"><a href="https://www.carcoversfactory.com/car-covers/2008">{year}</a></li>
                                <li className="breadcrumb-item"><a href="https://www.carcoversfactory.com/car-covers/2008/daihatsu">{make}</a></li>
                                <li className="breadcrumb-item"><a href="https://www.carcoversfactory.com/car-covers/2008/daihatsu/charade">{model}</a></li>
                                <li className="breadcrumb-item"><a href="https://www.carcoversfactory.com/car-covers/2008/daihatsu/charade/4-door-hatchback">{body}</a></li>
                                <li className="breadcrumb-item"><a>{title}</a></li>
                            </ol>
                        </nav>
                        <div id="notification"></div>
                        <h1 className="product-title">Car Cover for 2008 Daihatsu Charade 4 Door Hatchback - Premium Edition</h1>
                        <div className="product-content">
                            <div className="row">
                                <div className="col-sm entry-thumbnail">
                                    <div className="carousel-wrapper">
                                        <Carousel infiniteLoop useKeyboardArrows>
                                            {
                                                image.map((item) => (
                                                    <div>
                                                        <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item}`} />
                                                    </div>
                                                ))
                                            }
                                        </Carousel>
                                    </div>
                                </div>
                                <div className="col-sm entry-content">
                                    <div className="price-wrap">
                                        <span className="price">${regularPrice}</span>
                                        <div className="price-row">Regular Price: {regularPrice}<span className="red" style={{ textDecorationLine: "line-through" }}>${currentPrice}</span> </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="price-wrap">
                                        <mark><i className="fa fa-check-square"></i> Order In The Next 13 Hr 21 Min & Get Free Guaranteed Delivery By <span className="font-weight-bold d-inline-block" >Monday 26 December <i className='fa fa-clock-o'></i></span></mark>
                                    </div>
                                    <input type="hidden" name="option[1]" value="" />
                                    <input type="hidden" name="option[167]" value="" />
                                    <input type="hidden" name="option[168]" value="" />
                                    <input type="hidden" name="option[169]" value="" />
                                    <input type="hidden" name="option[170]" value="" />
                                    <input type="hidden" name="path_id" value="2:4880" />
                                    <ul style={{ paddingLeft: "15px" }} className="product-attr	">
                                        {
                                            prodetail?.attributes?.map((item) => (
                                                <Fragment key={prodetail._id}>
                                                    <li><span>{item.Name}</span><b>{item.Value}</b></li>
                                                </Fragment>
                                            ))
                                        }
                                    </ul>
                                    <ul className="product-star-p-page">
                                        <li>
                                            <div className="star-rating" style={{ width: "100%" }}>
                                                <span className="d-inline-block text-left" style={{ minWidth: "145px" }}> Water</span>
                                                <span className="d-inline-block star-value text-left" style={{ marginRight: "-5px" }}>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-plus-square text-seagreen"></span>
                                                </span>
                                            </div>
                                            <div className="star-rating" style={{ width: "100%" }}>
                                                <span className="d-inline-block text-left" style={{ minWidth: "145px" }}> Snow</span>
                                                <span className="d-inline-block star-value text-left" style={{ marginRight: "-5px" }}>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-plus-square text-seagreen"></span>
                                                </span>
                                            </div>
                                            <div className="star-rating" style={{ width: "100%" }}>
                                                <span className="d-inline-block text-left" style={{ minWidth: "145px" }}> UV Protection</span>
                                                <span className="d-inline-block star-value text-left" style={{ marginRight: " -5px" }}>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-plus-square text-seagreen"></span>
                                                </span>
                                            </div>
                                            <div className="star-rating" style={{ width: "100%" }}>
                                                <span className="d-inline-block text-left" style={{ minWidth: "145px" }}> Dirt & Dust Protection</span>
                                                <span className="d-inline-block star-value text-left" style={{ marginRight: "-5px" }}>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-plus-square text-seagreen"></span>
                                                </span>
                                            </div>
                                            <div className="star-rating" style={{ width: "100%" }}>
                                                <span className="d-inline-block text-left" style={{ minWidth: "145px" }}> Hail</span>
                                                <span className="d-inline-block star-value text-left" style={{ marginRight: "-5px" }}>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star-o"></span>
                                                    <span className="fa fa-star-o"></span>
                                                    <span className="fa fa-star-o"></span>
                                                </span>
                                            </div>
                                        </li>
                                    </ul>
                                    QTY : <input type="text" id="quantity" inputMode="decimal" pattern="\d*" name="quantity" value="1" className="form-control qty-txtbox" size="5" />
                                    <div className="clearfix"></div>
                                    <br />
                                    More than 100 available
                                    <div className="clearfix"></div>
                                    <input type="hidden" id="product_id" name="product_id" size="2" value="1" />
                                    <a id="button-cart" className="cart-btn">
                                        <img src="https://d68my205fyswa.cloudfront.net/ccf-static-5vowu7p8kuts75c2podstmjlw0s0vo5mlgnecl67uvwlv7vfquymjw.png" onClick={() => addtoCart(prodetail._id)} />
                                    </a>
                                </div>

                                <div className="col-md extra-attr">
                                    <div className="">
                                        <img className="custom-lazy loading" src="catalog/view/images/lazyload-placeholder.svg" data-src="https://d68my205fyswa.cloudfront.net/ccf-car-freebie.gif?v=45" alt="CarCoversFactory" style={{ width: "400px", maxWidth: "100%" }} />
                                    </div>
                                    <div className="feature-wrap">
                                        <ul className="entry-list">
                                            <li>FREE SHIPPING</li>
                                            <li>IN STOCK</li>
                                            <li>SHIPS SAME BUSINESS DAY</li>
                                            <li>GUARANTEED FIT</li>
                                        </ul>
                                    </div>
                                    <div className="col-md text-center">
                                        <a className="affirm-learn-more" data-toggle="modal" data-target="#affirmInfoModal" style={{ cursor: "pointer" }}>
                                            <img src="https://d68my205fyswa.cloudfront.net/ccf-202208241661356804zl8.png" style={{ maxWidth: "100%" }} />
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="product-description">
                            <div className="row">
                                <div className="col-md-12 col-lg-8">
                                    <Tabs
                                        defaultActiveKey="description"
                                        id="uncontrolled-tab-example"
                                        className="mb-3"
                                    >
                                        <Tab eventKey="description" title="description">
                                            <p>Our Premium Edition is our Top of the Line Cover that is heavy duty made of Polypropylene, and outperforms 7-layer material that offers maximum level of protection. It does not only protect both the inside and outside of a vehicle, but it also acts as a theft-deterrent by keeping your vehicle out of view from potential thieves.</p>

                                            <p>Features:</p>

                                            <ul>
                                                <li>100% Waterproof and Breathable due to micro-porous oil based materials.</li>
                                                <li>Inner Fleece lining material ensuring vehicle's paint is not compromised.</li>
                                                <li>Ultrasonic double stitched welding on the cover prevents water from going through.</li>
                                                <li>High Quality UV resistant chemicals coated on the outer layer of this cover, ensuring vehicle paint never fades.</li>
                                                <li>Reinforced grommet &amp; lanyard on both sides of the cover.</li>
                                                <li>Guaranteed to fit perfectly.</li>
                                                <li>Protects your vehicle from: Ice, Rain, Snow, High Winds, Strong UV Ray, and normal size of Hail.</li>
                                                <li>Elastic hem in the front and rear allowing tuck fit.</li>
                                                <li>Material resists mildew, mold, rot, bird droppings, tree sap, dirt, and acid rain</li>
                                            </ul>
                                        </Tab>
                                        <Tab eventKey="FAQs" title="FAQs">
                                            My vehicle has an antenna. How will it work with your covers?
                                            Our covers don’t come with a built in hole because we think that it will damage the cover.
                                            We give a free adhesive antenna patch with your cover.
                                            So you can simply stick your antenna through your cover and apply the antenna patch over the antenna and stick it onto the cover.
                                            This way, the hole doesn’t spread. This is an industry standard for all vehicles with antennas.
                                        </Tab>
                                        <Tab eventKey="contact" title="Warranty">
                                            At CarCoversFactory.com, we’re confident that we have one of the highest quality covers in
                                            the industry while it is also backed up by its warranty according to its edition.
                                            If anything happens to the cover including rips, fading, or tears, we will replace your cover with a brand new one for FREE,
                                            and you can only pay for the shipping and handling accordingly. Feel free to contact us and we will absolutely help you.
                                        </Tab>
                                        <Tab eventKey="shipping" title="shipping">
                                            At CarCoversFactory.com, we offer FREE standard shipping on all orders. That is our promise to you.
                                            We also ship all orders same day as long as they are placed before 5 PM.
                                            We have expedited options such as overnight or 2 day for those who need their covers quicker.
                                            Please allow 24 hours for tracking numbers to be sent to you.
                                        </Tab>
                                        <Tab eventKey="customerreview" title="customerreview">
                                            At CarCoversFactory.com, we offer FREE standard shipping on all orders. That is our promise to you.
                                            We also ship all orders same day as long as they are placed before 5 PM.
                                            We have expedited options such as overnight or 2 day for those who need their covers quicker.
                                            Please allow 24 hours for tracking numbers to be sent to you.
                                        </Tab>
                                        <Tab eventKey="productReview" title="productReview">
                                            At CarCoversFactory.com, we offer FREE standard shipping on all orders. That is our promise to you.
                                            We also ship all orders same day as long as they are placed before 5 PM.
                                            We have expedited options such as overnight or 2 day for those who need their covers quicker.
                                            Please allow 24 hours for tracking numbers to be sent to you.
                                        </Tab>
                                    </Tabs>
                                </div>
                                <div className="col-md-12 col-lg-4 text-center mt-5">
                                    <div className="entry-right">
                                        <img className="custom-lazy loading" src="catalog/view/images/lazyload-placeholder.svg" data-src="https://d68my205fyswa.cloudfront.net/ccf-static-pbt8v1h4ylzmth7k1rh45rz34grcn5s4h6vy02oqylpisbombgefsy.png" alt="Satisfaction CarCoversFactory" />
                                        <ul>
                                            <li><span>Protects against:</span></li>
                                            <li>RAIN</li>
                                            <li>UV SUNLIGHT</li>
                                            <li>MOLD </li>
                                            <li>MILDEW </li>
                                            <li>RUST </li>
                                            <li>BIRD DROPPINGS </li>
                                            <li>ACID RAIN </li>
                                            <li>TREE SAP </li>
                                            <li>DUST</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Productdetails

