import React from "react"
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link, Redirect } from 'react-router-dom';
const API_HOST ='http://localhost:3000/api/v1'
const EDIT_COMPANY_REQUEST = 'EDIT_COMPANY_REQUEST';
const EDIT_COMPANY_SUCCESS = 'EDIT_COMPANY_SUCCESS';
const UPDATE_COMPANY = 'UPDATE_COMPANY';
const UPDATE_COMPANY_SUCCESS = 'UPDATE_COMPANY_SUCCESS';

function editCompany(companyId) {
  console.log("editCompany() action")
  return dispatch => {
    dispatch({ type: EDIT_COMPANY_REQUEST});
    return fetch(`${API_HOST}/companies/${companyId}/edit`)
      .then(response => response.json())
      .then(json => dispatch(editCompanySuccess(json)))
      .catch(err => console.log(err));
  }
}

function updateCompany(companyId, data) {
  console.log("updateCompany() action")
  return dispatch => {
    dispatch({ type: UPDATE_COMPANY});
    return fetch(`${API_HOST}/companies/${companyId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => dispatch(updateCompanySuccess(json)))
      .catch(err => console.log(err));
  }
}

export function editCompanySuccess(json) {
  return {
    type: EDIT_COMPANY_SUCCESS,
    json
  };
};

export function updateCompanySuccess(json) {
  return {
    type: UPDATE_COMPANY_SUCCESS,
    json
  };
};

class CompanyFormEdit extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    let companyId = this.props.match.params.id
    this.props.editCompany(companyId)
  }

  handleChange(e){
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.updateCompany(this.props.company.id, {name: this.state.name})
  }

  renderForm(company) {
    return <div>
      <form onSubmit={this.handleSubmit}>
        <label> Name
        <input type="text" onChange={this.handleChange} defaultValue={company.name}/>
        </label>
        <input type="submit" />
      </form>
      <Link to="/" className="index-button">
        Back
      </Link>
    </div>
  }

  render () {
    const { company, updated } = this.props;
    console.log(this.props)

    if (updated) {

      return <Redirect to={`/companies/${company.id}/`} />
    } else {
      return (
        <React.Fragment>
          <h1>Edit Company</h1>
          {company && this.renderForm(company)}
        </React.Fragment>
      );
    }
  }
}

const structuredSelector = createStructuredSelector({
  company: state => state.company,
  updated: state => state.updated
});

const mapDispatchToProps = { editCompany, updateCompany };

export default connect(structuredSelector, mapDispatchToProps)(CompanyFormEdit);
