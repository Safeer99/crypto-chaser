import { Container, styled, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'

const Background = styled('div')({
  backgroundImage: 'url(./banner2.jpg)',
  '.bannerContent': {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around',
    '.tagline': {
      display: 'flex',
      height: '40%',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
})

const Banner = () => {
  return (
    <Background>
      <Container className="bannerContent">
        <div className="tagline">
          <Typography
            variant="h2"
            style={{
              fontWeight: 'bold',
              marginBottom: 15,
              fontFamily: 'Montserrat',
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: 'darkgrey',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat',
            }}
          >
            Get all the info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </Background>
  )
}

export default Banner
