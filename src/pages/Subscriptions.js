import { Typography, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext';

const Subscriptions = () => {
    let { setSidebarOpen } = useAppContext()
    const isScreenGreaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

    useEffect(() => {
      setSidebarOpen(false)
    }, [])

  return (
    <div>
      <Typography variant="h1" sx={{color:"white"}}>Subscriptions</Typography>
    </div>
  )
}

export default Subscriptions
