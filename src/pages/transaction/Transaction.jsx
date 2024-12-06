import React from 'react'
import { Container } from 'react-bootstrap'
import Navbar from '../Navbar'
import Content from '../Content'
import TransactionHistory from './TransactionHistory'
import AuthWrapper from '../../routers/AuthWrapper'

const Transaction = () => {
  return (
    <Container>
        <Navbar/>
        <Content/>
        <TransactionHistory/>
    </Container>
  )
}

export default AuthWrapper(Transaction)