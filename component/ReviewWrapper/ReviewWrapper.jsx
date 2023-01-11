import React from 'react'
import styles from "./ReviewWrapper.module.css"

const ReviewWrapper = () => {
    return (
        <>
            <section className={styles['review-wrapper']}>
                <div className='container'>
                    <h2 className={styles['section-title']}>More than 5000+ customer reviews support us!</h2>
                    <div className='row'>
                        <div className={styles['inner-wrap']}>
                            <div className={styles['entry-single']}>
                                <div className={styles['entry-img']}>
                                    <img src="https://d68my205fyswa.cloudfront.net/ccf-static-9i0p682lo7dg6nrwpmhvartzv87lelh4cggh478uenb0owbfoglbkp.png" />
                                </div>
                                <div className={styles['entry-content']}>
                                    <div className={styles['content']}>
                                        They had the exact car cover I needed and only took less than 5 minutes for me to order through their chat system. Great service and speedy delivery!
                                    </div>
                                    <div className='rating'>
                                        <span className='fa fa-star checked'></span>
                                        <span className='fa fa-star checked'></span>
                                        <span className='fa fa-star checked'></span>
                                        <span className='fa fa-star checked'></span>
                                        <span className='fa fa-star checked'></span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['entry-single']}>
                                <div className={styles['entry-img']}>
                                    <img src="https://d68my205fyswa.cloudfront.net/ccf-static-wf25ney28guiy4n2lyg4sjv0raqzy0sf0oq3bvcbt8f3gryjkle881.png" />
                                </div>
                                <div className={styles['entry-content']}>
                                    <div className={styles['content']}>
                                        The cover arrived earlier than expected and it was a perfect fit on my car. Really liked the soft inner material that came with the cover. Highly recommended!
                                    </div>
                                    <div className='rating'>
                                        <span className='fa fa-star checked'></span>
                                        <span className='fa fa-star checked'></span>
                                        <span className='fa fa-star checked'></span>
                                        <span className='fa fa-star checked'></span>
                                        <span className='fa fa-star checked'></span>
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

export default ReviewWrapper

