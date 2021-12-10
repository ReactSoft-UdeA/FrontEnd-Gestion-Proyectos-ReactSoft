import React from 'react'

const Carousel = () => {
    return (
        <div className='flex flex-col h-full w-full items-center justify-center'>
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="./images/01.png" className="d-block w-90 " alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="./images/02.png" className="d-block w-90" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="./images/03.png" className="d-block w-90" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="./images/04.png" className="d-block w-90" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="./images/05.png" className="d-block w-90" alt="..." />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel;