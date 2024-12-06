import React from 'react'
import { Container } from 'react-bootstrap'
import Navbar from '../Navbar'
import EditAkun from './EditAkun'

const Akun = () => {
  return (
    <Container>
        <Navbar/>
        <EditAkun/>
    </Container>
  )
}

export default Akun