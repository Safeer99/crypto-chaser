import { LinearProgress, styled, Typography } from '@mui/material'
import axios from 'axios'
import HTMLReactParser from 'html-react-parser'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { numberWithCommas } from '../components/Carousel'
import CoinInfo from '../components/CoinInfo'
import { SingleCoin } from '../config/api'
import { CryptoState } from '../CryptoContext'

const CoinPage = () => {
  const { id } = useParams()
  const [coin, setCoin] = useState()
  const { currency, symbol } = CryptoState()

  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id))
      setCoin(data)
    }
    fetchCoin()
  }, [id])

  const styles = {
    heading: {
      fontWeight: 'bold',
      mb: '20px',
      fontFamily: 'Montserrat',
    },
    description: {
      width: '100%',
      fontFamily: 'Montserrat',
      p: '25px',
      pb: '15px',
      pt: 0,
      textAlign: 'justify',
    },
  }

  const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  }))

  const Sidebar = styled('div')(({ theme }) => ({
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    borderRight: '2px solid grey',
  }))

  const MarketData = styled('div')(({ theme }) => ({
    alignSelf: 'start',
    padding: 25,
    paddingTop: 10,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    [theme.breakpoints.down('700')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      alignItems: 'start',
    },
  }))

  if (!coin) return <LinearProgress style={{ backgroundColor: 'gold' }} />

  return (
    <Container>
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" sx={styles.heading}>
          {coin?.name}
        </Typography>
        <Typography sx={styles.description}>
          {coin && HTMLReactParser(coin?.description.en.split('. ')[0])}.
        </Typography>
        <MarketData>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" sx={styles.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: 'Montserrat' }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" sx={styles.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: 'Montserrat' }}>
              {symbol}{' '}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()],
              )}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" sx={styles.heading}>
              Market Cap:{' '}
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: 'Montserrat' }}>
              {symbol}{' '}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6),
              )}
              M
            </Typography>
          </span>
        </MarketData>
      </Sidebar>
      <CoinInfo coin={coin} />
    </Container>
  )
}

export default CoinPage
