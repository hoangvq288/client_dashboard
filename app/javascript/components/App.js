import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Company from './Company'
import CompanyDetails from './CompanyDetails'
import CompanyFormEdit from './CompanyFormEdit'
import Employee from './Employee'
import NavBar from './NavBar'
import configureStore from '../configureStore'
const store = configureStore()
class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Company} />
            <Route exact path="/companies/:id" component={CompanyDetails} />
            <Route exact path="/companies/:id/edit" component={CompanyFormEdit} />
            <Route exact path="/employees" component={Employee} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App
