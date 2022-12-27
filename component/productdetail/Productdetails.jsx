import React, { Fragment } from 'react'
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Styles from "./ProductDetails.module.css"
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import url from '../../api/Apiservices';

const Productdetails = () => {
    const [prodetail, setProductDetail] = useState({})
    const [title, setTitle] = useState("")
    const [regularPrice, setRegularPrice] = useState("")
    const [currentPrice, setCurrentPrice] = useState("")
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
                        console.log(value, "value");
                        setTitle(value?.title)
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
                console.log(res);
            })
    }

    useEffect(() => {
        producrtdetail()
    }, [categoryid])
    console.log(title, "title");
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
                                    <div className="featured-thumb slick-slider-main-image" id="zoomimg" itemScope itemType="http://schema.org/ImageObject">
                                        <img className="custom-lazy loading" src="catalog/view/images/lazyload-placeholder.svg" data-src="https://d68my205fyswa.cloudfront.net/fit-in/1024x1024/filters:upscale()/car-cover-premium-edition-usa.jpg?v=1" title="Car Cover for 2008 Daihatsu Charade 4 Door Hatchback - Premium Edition" alt="Car Cover for 2008 Daihatsu Charade 4 Door Hatchback - Premium Edition" id="image" />
                                        <img data-src="https://d68my205fyswa.cloudfront.net/fit-in/1024x1024/filters:upscale()/ccf-20191223owaur1zkgr4fo2mnitui4ogw9dq1.jpg" className="custom-lazy" />
                                        <img data-src="https://d68my205fyswa.cloudfront.net/fit-in/1024x1024/filters:upscale()/ccf-20191218hems6b1138dqkck52m320uqn8jcy.jpg" className="custom-lazy" />
                                        <img data-src="https://d68my205fyswa.cloudfront.net/fit-in/1024x1024/filters:upscale()/ccf-20191218hjymt5qd0a7gv9rhvzenm04bjr2m.jpg" className="custom-lazy" />
                                        <img data-src="https://d68my205fyswa.cloudfront.net/fit-in/1024x1024/filters:upscale()/ccf-20191218a08oo53z9frpmj0l5zjiywe5ekm4.jpg" className="custom-lazy" />
                                        <img data-src="https://d68my205fyswa.cloudfront.net/fit-in/1024x1024/filters:upscale()/ccf-201912188vkr0m9lu4qtvtmofvr9v2wgffde.jpg" className="custom-lazy" />
                                        <img data-src="https://d68my205fyswa.cloudfront.net/fit-in/1024x1024/filters:upscale()/ccf-20191218mu6b0ab9p4zdnzzszjbygp3vbp0i.jpg" className="custom-lazy" />
                                        <img data-src="https://d68my205fyswa.cloudfront.net/fit-in/1024x1024/filters:upscale()/ccf-20191218odv3ag3arqkil6ysbhkcvi6l0ig3.jpg" className="custom-lazy" />
                                        <img data-src="https://d68my205fyswa.cloudfront.net/fit-in/1024x1024/filters:upscale()/ccf-201912189hky8h2wcq15zlwj573qwrj4ge6v.jpg" className="custom-lazy" />
                                        <img data-src="https://d68my205fyswa.cloudfront.net/fit-in/1024x1024/filters:upscale()/ccf-20191218wjayroar41iu357mszsmqien0uwe.jpg" className="custom-lazy" />
                                    </div>
                                    <ul className="thumb-list slick-slider-thumb-images">
                                        <li><img data-src="https://d68my205fyswa.cloudfront.net/fit-in/100x100/filters:upscale()/car-cover-premium-edition-usa.jpg?v=1" className="custom-lazy loading" src="catalog/view/images/lazyload-placeholder.svg" /></li>
                                        <li><img data-src="https://d68my205fyswa.cloudfront.net/fit-in/100x100/filters:upscale()/ccf-20191223owaur1zkgr4fo2mnitui4ogw9dq1.jpg" className="custom-lazy loading" src="catalog/view/images/lazyload-placeholder.svg" /></li>
                                        <li><img data-src="https://d68my205fyswa.cloudfront.net/fit-in/100x100/filters:upscale()/ccf-20191218hems6b1138dqkck52m320uqn8jcy.jpg" className="custom-lazy loading" src="catalog/view/images/lazyload-placeholder.svg" /></li>
                                        <li><img data-src="https://d68my205fyswa.cloudfront.net/fit-in/100x100/filters:upscale()/ccf-20191218hjymt5qd0a7gv9rhvzenm04bjr2m.jpg" className="custom-lazy loading" src="catalog/view/images/lazyload-placeholder.svg" /></li>
                                        <li><img data-src="https://d68my205fyswa.cloudfront.net/fit-in/100x100/filters:upscale()/ccf-20191218a08oo53z9frpmj0l5zjiywe5ekm4.jpg" className="custom-lazy loading" src="catalog/view/images/lazyload-placeholder.svg" /></li>
                                        <li><img data-src="https://d68my205fyswa.cloudfront.net/fit-in/100x100/filters:upscale()/ccf-201912188vkr0m9lu4qtvtmofvr9v2wgffde.jpg" className="custom-lazy loading" src="catalog/view/images/lazyload-placeholder.svg" /></li>
                                        <li><img data-src="https://d68my205fyswa.cloudfront.net/fit-in/100x100/filters:upscale()/ccf-20191218mu6b0ab9p4zdnzzszjbygp3vbp0i.jpg" className="custom-lazy loading" src="catalog/view/images/lazyload-placeholder.svg" /></li>
                                        <li><img data-src="https://d68my205fyswa.cloudfront.net/fit-in/100x100/filters:upscale()/ccf-20191218odv3ag3arqkil6ysbhkcvi6l0ig3.jpg" className="custom-lazy loading" src="catalog/view/images/lazyload-placeholder.svg" /></li>
                                        <li><img data-src="https://d68my205fyswa.cloudfront.net/fit-in/100x100/filters:upscale()/ccf-201912189hky8h2wcq15zlwj573qwrj4ge6v.jpg" className="custom-lazy loading" src="catalog/view/images/lazyload-placeholder.svg" /></li>
                                        <li><img data-src="https://d68my205fyswa.cloudfront.net/fit-in/100x100/filters:upscale()/ccf-20191218wjayroar41iu357mszsmqien0uwe.jpg" className="custom-lazy loading" src="catalog/view/images/lazyload-placeholder.svg" /></li>
                                    </ul>
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
                                    <nav>
                                        <ul className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <li><a className="nav-item nav-link active" id="nav-description-tab" data-toggle="tab" href="#nav-description" role="tab" aria-controls="nav-details" aria-selected="true">Description</a></li>
                                            <li><a className="nav-item nav-link " id="nav-faqs-tab" data-toggle="tab" href="#nav-faqs" role="tab" aria-controls="nav-faqs" aria-selected="false">FAQs</a></li>
                                            <li><a className="nav-item nav-link " id="nav-warranty-tab" data-toggle="tab" href="#nav-warranty" role="tab" aria-controls="nav-warranty" aria-selected="false">Warranty</a></li>
                                            <li><a className="nav-item nav-link " id="nav-shipping-tab" data-toggle="tab" href="#nav-shipping" role="tab" aria-controls="nav-shipping" aria-selected="false">Shipping</a></li>
                                            <li><a className="nav-item nav-link" id="nav-site_review-tab" data-toggle="tab" href="#nav-site_review" role="tab" aria-controls="nav-site_review" aria-selected="false">Customer Reviews</a></li>
                                            <li><a className="nav-item nav-link" id="nav-product_review-tab" data-toggle="tab" href="#nav-product_review" role="tab" aria-controls="nav-product_review" aria-selected="false">Product Reviews</a></li>
                                        </ul>
                                    </nav>
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade show active" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab">
                                            <p>Our Premium Edition is our Top of the Line Cover that is heavy duty made of Polypropylene, and outperforms 7-layer material that offers maximum level of protection. It does not only protect both the inside and outside of a vehicle, but it also acts as a theft-deterrent by keeping your vehicle out of view from potential thieves.</p>
                                            <p>Features:</p>
                                            <ul>
                                                <li>100% Waterproof and Breathable due to micro-porous oil based materials.</li>
                                                <li>Inner Fleece lining material ensuring vehicle's paint is not compromised.</li>
                                                <li>Ultrasonic double stitched welding on the cover prevents water from going through.</li>
                                                <li>High Quality UV resistant chemicals coated on the outer layer of this cover, ensuring vehicle paint never fades.</li>
                                                <li>Reinforced grommet; lanyard on both sides of the cover.</li>
                                                <li>Guaranteed to fit perfectly.</li>
                                                <li>Protects your vehicle from: Ice, Rain, Snow, High Winds, Strong UV Ray, and smallest pea sized Hail.</li>
                                                <li>Elastic hem in the front and rear allowing tuck fit.</li>
                                                <li>Material resists mildew, mold, rot, bird droppings, tree sap, dirt, and acid rain</li>
                                            </ul>
                                        </div>
                                        <div className="tab-pane fade " id="nav-faqs" role="tabpanel" aria-labelledby="nav-faqs-tab">
                                            <div className="entry-single">
                                                <h4 className="title mt-4">Does your cover has a place for my antenna?</h4>
                                                Our covers don t come with a built in hole because we think that it will damage the cover. We give a free adhesive antenna patch with your cover. So you can simply stick your antenna through your cover and apply the antenna patch over the antenna and stick it onto the cover. This way, the hole doesn’t spread. This is an industry standard for all vehicles with antennas.											</div>
                                            <div className="entry-single">
                                                <h4 className="title mt-4">Does your car covers come with mirror pockets?</h4>
                                                No. Because, having mirror pockets on a car cover will cause it to rip over the years. Installing and removing the cover with mirror pockets, will loosen the seams around the mirror pocket areas. And we want to make sure that our customers have the highest quality and most durable cover which is why we have engineered our covers to not have mirror pockets which is also a huge customer preference.											</div>
                                            <div className="entry-single">
                                                <h4 className="title mt-4">What size of Hail does your cover protect?</h4>
                                                There s no cover in the market that guarantees protection from hail. Our Premium Edition covers are the highest quality and sturdiest in the market but we do not guarantee a specific hail size, hence, we are confident our Premium Edition Cover can get the job done against smallest  pea sized hail.											</div>
                                            <div className="entry-single">
                                                <h4 className="title mt-4">What is the difference between your Premium Edition Cover versus the Standard Edition?</h4>
                                                Our Premium Edition cover is made of heavy duty Polypropylene material that can outperform 7-layer cover too which can withstand any weather conditions including normal hail. while the Standard Edition cover is made of 5-layer Polypropylene material; also doesn’t have much protection from hail. While both covers are of high quality, both can withstand any type of weather conditions and simply lasts longer due to the thick fibers.											</div>
                                            <div className="entry-single">
                                                <h4 className="title mt-4">How does your warranty works?</h4>
                                                Every cover is backed up by its warranty, so if anything happens to the cover including rips, fading, or tears, we will replace your cover with a brand new one for FREE, and you can only pay for the shipping and handling accordingly. If for any reason the quality control of our cover fails, please feel free to contact us.											</div>
                                            <div className="entry-single">
                                                <h4 className="title mt-4">My Model doesn’t show on your Drop-Down List?</h4>
                                                If you cannot find your model, then you can initiate chat with our customer service or you can always call our hotline listed on upper right of our website and we’ll surely help you find your right cover.											</div>
                                        </div>
                                        <div className="tab-pane fade " id="nav-warranty" role="tabpanel" aria-labelledby="nav-warranty-tab">
                                            <div className="alert alert-primary">
                                                At CarCoversFactory.com, we’re confident that we have one of the highest quality covers in the industry while it is also backed up by its warranty according to its edition. If anything happens to the cover including rips, fading, or tears, we will replace your cover with a brand new one for FREE, and you can only pay for the shipping and handling accordingly. Feel free to contact us and we will absolutely help you.										</div>
                                        </div>
                                        <div className="tab-pane fade " id="nav-shipping" role="tabpanel" aria-labelledby="nav-shipping-tab">
                                            <div className="alert alert-primary">At CarCoversFactory.com, we offer FREE standard shipping on all orders. That is our promise to you. We also ship all orders same day as long as they are placed before 5 PM. We have expedited options such as overnight or 2 day for those who need their covers quicker. Please allow 24 hours for tracking numbers to be sent to you.</div>
                                        </div>
                                        <div className="tab-pane fade" id="nav-site_review" role="tabpanel" aria-labelledby="nav-site_review-tab">
                                            <div className="entry-single">
                                                <div id="shopper_review_page">
                                                    <div id="review_header"></div>
                                                    <div id="merchant_page"></div>
                                                    <div id="review_image"><a href="https://www.shopperapproved.com/reviews/carcoversfactory.com/" target="_blank" rel="nofollow"></a></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="nav-product_review" role="tabpanel" aria-labelledby="nav-product_review-tab">
                                            <div id="total_review">

                                            </div>
                                            <div id="review">
                                                <i className="fa fa-spinner fa-spin"></i>  Loading.....
                                            </div>
                                        </div>
                                    </div>
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
                        <div className="container product-customer-images max-auto mt-4 p-0">
                            <div className="row m-0">
                                <div className="line-title">
                                    <h2 className="title theme-color both-side-line">Our Customer's Vehicle Covers</h2>
                                </div>
                            </div>
                            <div className="text-center" style={{ border: "2px solid #ebebeb", padding: "10px", borderRadius: "10px", maxHeight: "300px" }}>
                                <div className="ginn">
                                    <div className="gallery-image"></div>
                                    <div className="gallery-image"></div>
                                    <div className="gallery-image"></div>
                                    <div className="gallery-image"></div>
                                    <div className="gallery-image"></div>
                                    <div className="gallery-image"></div>
                                    <div className="gallery-image"></div>
                                    <div className="gallery-image"></div>
                                    <div className="gallery-image"></div>
                                    <div className="gallery-image"></div>
                                </div>
                            </div>
                            <div className="w-100 text-center mt-2 mb-3">
                                <a href="gallery" className="btn btn-lg btn-warning text-light" style={{ borderRadius: "15px" }}>View Entire Gallery</a>
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


