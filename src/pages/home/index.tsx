import React, {  useEffect } from 'react'
import Body from '../../components/layout'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store/store'
import { getAllCountries } from '../../redux/slice/countrySlice'
import CardWithImage from '../../components/card/cardWithImage'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Image } from 'react-bootstrap'
import Carousal from '../../components/carousel/carousal'
import { getRandomPair } from '../../utils/getRandomNumber'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { countries, loading } = useSelector((state: RootState) => state.countries)
  const [min = 0, max = 4] = getRandomPair(countries.length - 1)
  const carousalCountries = countries.slice(min, max)
  const countryFlag = countries[6]

  const [showCountries, setShoeCountries] = React.useState(12)

  useEffect(() => {
    dispatch(getAllCountries('name'))
  }, [dispatch])

  const handleLoadMore = () => {
    setShoeCountries((prev) => prev + 12)
  }
  return (
    <Body>
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 1050,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <>
        {
          !loading && !countries.length ?
            <div>No Data</div> :
            <>      <div className='my-5'>
              <div className="d-flex flex-column flex-sm-row  justify-content-center gap-2">
                <div className="bg-dark w-100" style={{ height: " 2px", marginTop: '0.5rem' }}></div>
                <div className="fw-bold text-center fs-4">WELCOME</div>
                <div className="bg-dark w-100" style={{ height: "2px", marginTop: '1.5rem' }}></div>
              </div>

              <Row className="d-flex flex-column-reverse flex-md-row align-items-center justify-content-between my-5">
                <Col md={8}>
                  <Carousal countries={carousalCountries} />
                </Col>

                <Col className="ms-md-3 mt-4 mt-md-0">
                  <Image
                    className='border border-dark'
                    style={{ height: '500px', width: '100%', objectFit: 'cover' }}
                    src={countryFlag?.flag ?? ""}
                    fluid
                  />
                </Col>
              </Row>
              <Row>
                {countries.slice(0, showCountries).map(({ name, region, flag }, index) => {
                  return (
                    <Col xs={12} md={6} key={index} className="mb-4">
                      <CardWithImage
                        key={index}
                        name={name}
                        region={region}
                        flag={flag}
                      />
                    </Col>
                  )
                })}
              </Row>

              {showCountries < countries.length && (
                <div className="text-center">
                  <Button style={{ borderRadius: 0 }} onClick={handleLoadMore} variant={'dark'}>Load More</Button>
                </div>
              )}
            </div>
            </>
        }
      </>

    </Body>
  )
}

export default Home