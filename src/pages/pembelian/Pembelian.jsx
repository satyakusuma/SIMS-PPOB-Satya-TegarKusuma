import React from 'react'
import { Container } from 'react-bootstrap'
import ServiceTransaction from '../ServiceTransaction'
import Content from '../Content'
import Navbar from '../Navbar'
import AuthWrapper from '../../routers/AuthWrapper'

const Pembelian = () => {
  return (
    <Container>
        <Navbar/>
        <Content/>
        <ServiceTransaction/>
    </Container>
  )
}

export default AuthWrapper(Pembelian);