import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { Image } from 'react-bootstrap'
import type { CountryTypes } from '../../redux/slice/countrySlice'
import { ICONS } from '../../utils/common/icons'

interface CardWithImageTypes {
    countries: CountryTypes[]
}

const CustomCarousel: React.FC<CardWithImageTypes> = ({ countries }) => {
    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex)
    }

    return (
        <div className="position-relative w-100 " style={{ border: "1px solid black" }}>
            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                controls={false}
                indicators={false}
                slide={false}
                touch={false}
                keyboard={false}
            >
                {countries.map(({ name, region, flag }, idx) => (
                    <Carousel.Item key={idx}>
                        <div style={{ width: '100%', height: '500px', position: 'relative' }}>
                            <Image
                                src={flag}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)' }}
                                fluid
                            />

                            <div
                                className="my-3 position-absolute bottom-0 start-50 translate-middle-x d-flex align-items-center justify-content-center"
                            >
                                <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => { setIndex((index - 1 + countries.length) % countries.length) }}
                                >
                                    <ICONS.LEFTARROW />
                                </div>


                                {countries.map((_, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setIndex(idx)}
                                        style={{
                                            width: '10px',
                                            height: '10px',
                                            margin: '0 4px',
                                            borderRadius: '50%',
                                            backgroundColor: idx === index ? 'black' : 'white',
                                            cursor: 'pointer'
                                        }}
                                    />
                                ))}
                                <div
                                    style={{ cursor: 'pointer' }}

                                    onClick={() => { setIndex((index - 1 + countries.length) % countries.length) }}
                                > <ICONS.RIGHTARROW
                                    /></div>

                            </div>
                        </div>

                        <Carousel.Caption>
                            <h5>{name}</h5>
                            <p>{region}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    )
}

export default CustomCarousel
