import React from 'react'
import styles from "./Lower.module.css"

const Lower = () => {
    return (
        <>
            <section className={styles['lower-banner']}>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <img src='https://d68my205fyswa.cloudfront.net/ccf-static-jqwswjmf8azgj81lovc03am45nhmj4ift042oajbo3vftqka5cgz5l.jpg' className='img-fluid' />
                        </div>
                        <div className='col'>
                            <img src='https://d68my205fyswa.cloudfront.net/ccf-static-1h4572dpfnodmqtlc5jtp7b385i8l1prj8brphqop1ldrn9gzif3oq.jpg' className='img-fluid' />
                        </div>
                        <div className='col'>
                            <img src='https://d68my205fyswa.cloudfront.net/ccf-static-rbzcs6cmgjdy610vi6nll1ofrea6f0lzeseh85co56nkeorgv8hljy.jpg' className='img-fluid' />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Lower
