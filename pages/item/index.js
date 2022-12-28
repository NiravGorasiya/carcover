import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

const index = () => {
    return (
        <div className="carousel-wrapper">
            <Carousel infiniteLoop useKeyboardArrows autoPlay>
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" style={{ width: "100px", height: "100px" }} />
                </div>
                <div>
                    <img src="https://static.toiimg.com/thumb/msid-58475411,width-748,height-499,resizemode=4,imgsize-142947/.jpg" style={{ width: "100px", height: "100px" }} />
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1589041127168-9b1915731dc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8N3x8fGVufDB8fHx8&w=1000&q=80" style={{ width: "100px", height: "100px" }} />
                </div>
            </Carousel>
        </div>
    );
}

export default index
