import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
const initialState = {
  companies: [],
  company: ''
};

function rootReducer(state, action) {
  console.log(action.type)
  switch(action.type) {
    case 'GET_COMPANIES_SUCCESS':
      return { companies: action.json }
    case 'GET_COMPANY_SUCCESS':
      return { company: action.json }
    case 'EDIT_COMPANY_SUCCESS':
      return { company: action.json }
    case 'UPDATE_COMPANY_SUCCESS':
      return { company: action.json, updated: true}
    case 'DELETE_COMPANY_SUCCESS':
      return { companies: state.companies.filter((company) => company.id !== action.id) }
    default:
      return state
  }
}

export default function configureStore() {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
  return store
}
