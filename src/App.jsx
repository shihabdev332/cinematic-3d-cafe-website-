import React from 'react'
import Navbar from './page/Navbar'
import Hero from './page/Hero'
import MenuCarousel from './page/MenuCarousel'
import PromoSection from './page/PromoSection'
import Area from './page/Area'
import PromoCards from './page/PromoCards'
import Footer from './page/Footer'
import SpecialFeature from './page/SpecialFeature'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <SpecialFeature/>
      <MenuCarousel/>
      <PromoSection/>
      <Area/>
      <PromoCards/>
      <Footer/>
    </div>
  )
}

export default App