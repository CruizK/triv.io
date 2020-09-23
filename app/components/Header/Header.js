import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function Header({title, color}) {
  
  
  
  /*
  const getCSS = () => {
    if(switchColor != null) {
      let css = `
        background-position-x: 
      `
      setSwitchColor(null);
    }
  }*/
  return (
    <Head>
      
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <style>{`
        html {
          background-color: ${color};
          transition: background-color 500ms ease-out !important; 
        }
        `}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    </Head>
  )
}