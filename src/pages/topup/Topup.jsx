import React from 'react'
import { Container } from 'react-bootstrap'
import Content from '../Content'
import Navbar from '../Navbar'
import TopupContent from './TopupContent'
import AuthWrapper from '../../routers/AuthWrapper';

const Topup = () => {
  return (
    <Container>
        <Navbar/>
        <Content/>
        <TopupContent/>
    </Container>
  )
}

export default AuthWrapper(Topup);