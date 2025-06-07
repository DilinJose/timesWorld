import React from 'react'
import Footer from './footer';
import Header from './header';

interface BodyProps {
  children?: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='container'>
        {children}
      </div>
      <Footer />
    </div>

  )
}

export default Body