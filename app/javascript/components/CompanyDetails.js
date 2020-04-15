import React from "react"
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom';
//const API_HOST = process.env.API_HOST || 'http://localhost:3000'
const API_HOST = 'https://infinite-atoll-62055.herokuapp.com'
const GET_COMPANY_REQUEST = 'GET_COMPANY_REQUEST';
const GET_COMPANY_SUCCESS = 'GET_COMPANY_SUCCESS';


function getCompany(companyId) {
  console.log("getCompany() action")
  return dispatch => {
    dispatch({ type: GET_COMPANY_REQUEST});
    return fetch(`${API_HOST}/api/v1/companies/${companyId}`)
      .then(response => response.json())
      .then(json => dispatch(getCompanySuccess(json)))
      .catch(err => console.log(err));
  }
}

export function getCompanySuccess(json) {
  return {
    type: GET_COMPANY_SUCCESS,
    json
  };
};

class CompanyDetails extends React.Component {
  componentDidMount() {
    let companyId = this.props.match.params.id
    console.log(this.props)
    this.props.getCompany(companyId)
  }

  renderCompany(company) {
    return <div>
      <h3>Indentity: {company.identity}</h3>
      <h3>Company: {company.name}</h3>
      <Link to={`/companies/${company.id}/edit`} className="index-button">
        Edit
      </Link>
      <br />
      <Link to="/" className="index-button">
        Back
      </Link>
    </div>
  }

  render () {
    const { company } = this.props;
    return (
      <React.Fragment>
        {company && this.renderCompany(company)}
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  company: state => state.company
});

const mapDispatchToProps = { getCompany };

export default connect(structuredSelector, mapDispatchToProps)(CompanyDetails);

