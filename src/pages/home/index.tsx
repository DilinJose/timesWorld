import React, { use, useEffect } from 'react'
import Body from '../../components/layout'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store/store'
import { getAllCountries } from '../../redux/slice/countrySlice'
import CardWithImage from '../../components/card/cardWithImage'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const countries = useSelector((state: RootState) => state.countries.countries)

  useEffect(() => {
    dispatch(getAllCountries('name'))
  }, [dispatch])

  console.log('countries', countries)

  return (
    <Body>
      <div className="d-flex w-100 my-3 align-items-center">
        <div className="flex-grow-1 border-top bg-black" style={{ marginBottom: '1rem' }}></div>
        <h1 className="mx-3 text-muted">WELCOME</h1>
        <div className="flex-grow-1 border-bottom bg-black" style={{ marginTop: '1rem' }}></div>
      </div>
      <Row>
        {countries.map(({ name, region, flag }, index) => {
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

    </Body>
  )
}

export default Home