import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-6 d-flex align-items-center">
      <span className="text-muted" style={{textAlign:'center',marginLeft:'15px'}}>© 2024 Online Food, <spna className="text-muted"></spna> Developed & Designed By <a  className="text-muted" href='https://github.com/surendragt19' style={{textDecoration:'none',color:'black'}} target='_blank'>Surendra</a></span>
    </div>
  </footer>
    </>
  )
}

export default Footer