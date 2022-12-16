import React, { Fragment, useEffect, useState } from 'react'
import Link from "next/link"
import axios from "axios"
import Styles from "./Product.module.css"
import url from '../../api/Apiservices'
import Cart from '../../pages/cart'
import { ADD } from '../../redux/action/Action'


const Products = (product) => {
    console.log(product);
    const [data, setData] = useState([])
    const [cartdata, setCartData] = useState([])
    const [mdata, setMData] = useState([])


    // const addtocart = (item) => {
    //     console.log(item);
    //     axios.post(`${url}/cart/add/${item._id}/Truck/2022/bmw/118d/3-door-hatchback`, item)
    //         .then((response) => {
    //             console.log(response);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    useEffect(() => {

    }, [])

    return (
        <>
            <section className={`page-content ${Styles['single-wrapper']}`}>
                <div className='container'>
                    <div className={`no-padding ${Styles['inner-wrap']}`}>
                        <nav aria-label='breadcrumb'>
                            <ol className="breadcrumb">
                                <li className='breadcrumb-item'>
                                    <Link href="https://www.carcoversfactory.com/car-covers">Car Covers</Link>
                                </li>
                                <li className='breadcrumb-item'>
                                    <Link href="https://www.carcoversfactory.com/car-covers/2022">2017</Link>
                                </li>
                                <li className='breadcrumb-item'>Fiat</li>
                                <li className='breadcrumb-item'>Doblo</li>
                                <li className='breadcrumb-item'>cargo van</li>
                            </ol>
                        </nav>
                        <div className={`${Styles['pricing-page-wrap']}`}>
                            <h3 style={{ textAlign: "center" }}>{product?.category} cover for {product?.year} {product?.make} {product?.model}-{product?.body}</h3>
                            <div className={`${Styles['pricing-page-inner-wrap']} table-responsive`}>
                                <table style={{ textAlign: "center" }} className={`table table-striped table-responsive ${Styles['table-product-variation']} table-row-item5`}>
                                    <tbody>

                                        <tr>
                                            <td style={{ width: "140px", borderTop: "none", borderBottom: "none", borderLeft: "none" }}> </td>
                                            <td>
                                                <Link href="https://www.carcoversfactory.com/car-covers/2022/aston-martin/db9-gt/coupe/premium-edition-car-cover">
                                                    <img src='https://d68my205fyswa.cloudfront.net/fit-in/300x300/filters:upscale()/car-cover-premium-edition-usa.jpg?v=1'
                                                        title='title="Car Cover for 2022 Aston Martin DB9 GT - Premium Edition'
                                                        alt="Car Cover for 2022 Aston Martin DB9 GT - Premium Edition" style={{ width: "100%", maxWidth: '300px' }}
                                                    ></img>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link href="https://www.carcoversfactory.com/car-covers/2022/aston-martin/db9-gt/coupe/premium-edition-car-cover">
                                                    <img src='https://d68my205fyswa.cloudfront.net/fit-in/300x300/filters:upscale()/car-cover-premium-edition-usa.jpg?v=1'
                                                        title='title="Car Cover for 2022 Aston Martin DB9 GT - Premium Edition'
                                                        alt="Car Cover for 2022 Aston Martin DB9 GT - Premium Edition" style={{ width: "100%", maxWidth: '300px' }}
                                                    ></img>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link href="https://www.carcoversfactory.com/car-covers/2022/aston-martin/db9-gt/coupe/premium-edition-car-cover">
                                                    <img src='https://d68my205fyswa.cloudfront.net/fit-in/300x300/filters:upscale()/car-cover-premium-edition-usa.jpg?v=1'
                                                        title='title="Car Cover for 2022 Aston Martin DB9 GT - Premium Edition'
                                                        alt="Car Cover for 2022 Aston Martin DB9 GT - Premium Edition" style={{ width: "100%", maxWidth: '300px' }}
                                                    ></img>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr className='bg-white'>
                                            <td style={{ width: "140px", border: "none" }}></td>
                                            <td style={{ border: "none", paddingBottom: "3px", paddingLeft: 0, paddingRight: 0 }}> <div className='bestseller-tab-header'>Bestseller</div></td>
                                            <td style={{ border: "none", paddingBottom: "3px", paddingLeft: 0, paddingRight: 0 }}> </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "140px", borderTop: "none", borderBottom: "none", borderLeft: "none" }}></td>
                                            <td className="">
                                                <h4 className=''>
                                                    <a></a>
                                                </h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            {/* {
                                                productData.map((item) => (
                                                    <Fragment key={item._id}>
                                                        <td style={{ background: "green", color: "white" }}>{item.title}</td>
                                                    </Fragment>
                                                ))
                                            } */}
                                        </tr>
                                        <tr>
                                            <td>Type</td>
                                            {
                                                product.props.map((item) => (
                                                    item.attributes.map((item1) => {
                                                        if (item1.Name == "Material") {
                                                            return (
                                                                <td>{item1.Value}</td>
                                                            )
                                                        }
                                                    })
                                                ))
                                            }
                                        </tr>
                                        <tr>
                                            <td>Warranty</td>
                                            {
                                                product.props.map((item) => (
                                                    item.attributes.map((item1) => {
                                                        if (item1.Name == "Warranty") {
                                                            return (
                                                                <td>{item1.Value}</td>
                                                            )
                                                        }
                                                    })
                                                ))
                                            }
                                        </tr>
                                        <tr>
                                            <td>Price</td>
                                            {
                                                product.props.map((item) => (
                                                    <Fragment key={item.id}>
                                                        <td>
                                                            <div className='price1'>
                                                                Regular price
                                                                <b style={{ textDecorationLine: "line-through" }}>{item.current_Price}</b>
                                                                <span>
                                                                    <br></br>
                                                                    you save
                                                                    <b>${item.regular_price}</b>
                                                                </span>
                                                            </div>
                                                            <br></br>
                                                            <Link href="https://www.carcoversfactory.com/car-covers/2012/citroen/c3-picasso-mpv/5-door-estate/premium-edition-car-cover" className='btn btn-primary w-100 mb-2'>
                                                                view details
                                                            </Link>
                                                            <br></br>
                                                            <Link href="#">
                                                                <button className='btn btn-success w-100 mb-2'>
                                                                    Add to cart
                                                                </button>
                                                            </Link>

                                                        </td>
                                                    </Fragment>
                                                ))
                                            }

                                        </tr>
                                        <tr>
                                            <td>Breathable</td>
                                            <td><i className='fa fa-check fa-lg text-success'></i></td>
                                            <td><i className='fa fa-check fa-lg text-success'></i></td>
                                            <td><i className='fa fa-check fa-lg text-success'></i></td>
                                        </tr>
                                        <tr>
                                            <td>Layers</td>
                                            {
                                                product.props.map((item) => (
                                                    item.attributes.map((item1) => {
                                                        if (item1.Name == "Material") {
                                                            return (
                                                                <td>{item1.Value}</td>
                                                            )
                                                        }
                                                    })
                                                ))
                                            }
                                        </tr>
                                        <tr>
                                            <td>Material</td>
                                            {
                                                product.props.map((item) => (
                                                    item.attributes.map((item1) => {
                                                        if (item1.Name == "Material") {
                                                            return (
                                                                <td>{item1.Value}</td>
                                                            )
                                                        }
                                                    })
                                                ))
                                            }


                                        </tr>
                                        <tr>
                                            <td>Soft Fleece</td>
                                            <td><i className='fa fa-check fa-lg text-success'></i></td>
                                            <td><i className='fa fa-check fa-lg text-success'></i></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Water</td>
                                            <td>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                            </td>
                                            <td>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                            </td>
                                            <td>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                show
                                            </td>
                                            <td>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                            </td>
                                            <td>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                            </td>
                                            <td>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td>
                                                UV Protection
                                            </td>
                                            <td>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                            </td>
                                            <td>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                            </td>
                                            <td>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Dirt & Dust Protection
                                            </td>
                                            <td>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                            </td>
                                            <td>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                            </td>
                                            <td>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Hail
                                            </td>
                                            <td>

                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                            </td>
                                            <td>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                            </td>
                                            <td>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                                <span className='fa fa-star'></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                <ul className='price-features'>
                                                    <li>
                                                        <span>
                                                            <i className='colorgreen fa fa-check-square' style={{ color: "green" }}></i>
                                                            &nbsp;free Shipping
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <i className='colorgreen fa fa-check-square' style={{ color: "green" }}></i>
                                                            &nbsp;free Shipping
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <i className='fa fa-check-square' style={{ color: "green" }}></i>
                                                            &nbsp;free Shipping
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <i className='colorgreen fa fa-check-square' style={{ color: "green" }}></i>
                                                            &nbsp;free Shipping
                                                        </span>
                                                    </li>
                                                </ul>
                                            </td>
                                            <td>
                                                <ul className='price-features'>
                                                    <li>
                                                        <span>
                                                            <i className='colorgreen fa fa-check-square' style={{ color: "green" }}></i>
                                                            &nbsp;free Shipping
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <i className='colorgreen fa fa-check-square' style={{ color: "green" }}></i>
                                                            &nbsp;free Shipping
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <i className='fa fa-check-square' style={{ color: "green" }}></i>
                                                            &nbsp;free Shipping
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <i className='colorgreen fa fa-check-square' style={{ color: "green" }}></i>
                                                            &nbsp;free Shipping
                                                        </span>
                                                    </li>
                                                </ul>
                                            </td>
                                            <td>
                                                <ul className='price-features'>
                                                    <li>
                                                        <span>
                                                            <i className='colorgreen fa fa-check-square' style={{ color: "green" }}></i>
                                                            &nbsp;free Shipping
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <i className='colorgreen fa fa-check-square' style={{ color: "green" }}></i>
                                                            &nbsp;free Shipping
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <i className='fa fa-check-square' style={{ color: "green" }}></i>
                                                            &nbsp;free Shipping
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <i className='colorgreen fa fa-check-square' style={{ color: "green" }}></i>
                                                            &nbsp;free Shipping
                                                        </span>
                                                    </li>
                                                </ul>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                                <div className='div-product-variation'>
                                    <div className='col-sm-12 col-md-12'>
                                        <div className='panel panel-default'>
                                            <div className="panel-body product-list1">
                                                <div className='container-fluid'>
                                                    <div className='row'>
                                                        <div className='col-sm-12 p-0 mb-20 pt-1'>
                                                            <div className='col-12 p-0'>

                                                            </div>
                                                            <div className='row'>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Products

