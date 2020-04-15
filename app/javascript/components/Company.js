import React from "react"
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router'
const GET_COMPANIES_REQUEST = 'GET_COMPANIES_REQUEST';
const GET_COMPANIES_SUCCESS = 'GET_COMPANIES_SUCCESS';
const DELETE_COMPANY = 'DELETE_COMPANY';
const DELETE_COMPANY_SUCCESS = 'DELETE_COMPANY_SUCCESS';


function getCompanies() {
  console.log("getCompanies() action")
  return dispatch => {
    dispatch({ type: GET_COMPANIES_REQUEST});
    return fetch('api/v1/companies')
      .then(response => response.json())
      .then(json => dispatch(getCompaniesSuccess(json)))
      .catch(err => console.log(err));
  }
}

function deleteCompany(companyId) {
  console.log("Delete Company() action in Companies")
  return dispatch => {
    dispatch({ type: DELETE_COMPANY});
    return fetch(`api/v1/companies/${companyId}`, { method: 'DELETE'})
      .then(response => response.json())
      .then(json => dispatch(deleteCompanySuccess(companyId)))
      .catch(err => console.log(err));
  }
  return {
    type: DELETE_COMPANY,
    id: companyId
  }

}

export function deleteCompanySuccess(companyId) {
  return {
    type: DELETE_COMPANY_SUCCESS,
    id: companyId
  };
};


export function getCompaniesSuccess(json) {
  return {
    type: GET_COMPANIES_SUCCESS,
    json
  };
};

class Company extends React.Component {
  componentDidMount() {
    this.props.getCompanies()
  }

  renderCompanies(companies) {
    return companies.map(com => {
      return <tr key={com.id}>
        <td>{com.identity}</td>
        <td>{com.name}</td>
        <td>{com.employees_amount}</td>
        <td>{com.contractors_amount}</td>
        <td>{com.clients_amount}</td>
        <td>
          <Link to={`/companies/${com.id}`} className="index-button">
          Show
          </Link>
        </td>
        <td><Link to={`/companies/${com.id}/edit`} className="index-button">
          Edit
          </Link></td>
        <td><button onClick={() => this.props.deleteCompany(com.id)}>Destroy</button></td>


      </tr>
    })
  }

  render () {
    const { companies } = this.props;
    console.log("render companies", companies && companies.length)
    return (
      <React.Fragment>
        <h1>Companies</h1>
        <table>
          <thead>
            <tr>
              <th>Identity</th>
              <th>Name</th>
              <th>Employees</th>
              <th>Contractors</th>
              <th>Clients</th>
              <th colSpan='3'></th>
            </tr>
          </thead>
          <tbody>
            {companies && this.renderCompanies(companies)}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  companies: state => state.companies
});

const mapDispatchToProps = { getCompanies, deleteCompany };

export default connect(structuredSelector, mapDispatchToProps)(Company);
