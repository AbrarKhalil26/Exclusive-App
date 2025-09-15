"use client"
import React from 'react'

export default function error({error}:{error:Error}) {
  return (
    <div className='m-5 pt-15'>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  )
}
