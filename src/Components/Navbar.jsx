import React from 'react'
import '../Style/navbar.css'
function Navbar() {
  return (
    <div>
 <nav className="navbar navbar-expand-lg">
    <div className="container-fluid d-flex align-items-center justify-content-between">
      <a className="navbar-brand" href="/">MyBrand</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href='/' >Home</a>
          </li>
          <li className="nav-item">
            {/*  */}
            <a className="nav-link" href='/table' >Table</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/services">Services</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    </div>
  )
}

export default Navbar
