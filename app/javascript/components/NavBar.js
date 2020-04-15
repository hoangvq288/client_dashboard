import React from "react"
import { Link } from 'react-router-dom';
class NavBar extends React.Component {
  render () {
    return (
      <React.Fragment>
        Dashboard
        <Link to="/" className="index-button">
         Companies
        </Link>

        <Link to="/employees" className="index-button">
         Employees
        </Link>
      </React.Fragment>
    );
  }
}

export default NavBar
