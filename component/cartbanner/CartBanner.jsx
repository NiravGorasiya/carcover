import React from 'react'
import styles from "./CartBanner.module.css"

const CartBanner = () => {
    return (
        <>
            <section className='banner'>
                <div className='container'>
                    <div className={`${styles['page-banner-cart']}`}>
                        <div className={`${styles['entry-content']}`}>
                            <h1 className={`${styles['page-title']}`}>SHOPPING CART</h1>
                            <div className={styles.description}>REVIEW YOUR SHOPPING CART</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CartBanner
