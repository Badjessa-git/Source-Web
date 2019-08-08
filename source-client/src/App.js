import React from 'react';
import PropTypes from 'prop-types';
import About from './components/About';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import SourceBody from './components/SourceBody';
import SourceHeader from './components/SourceHeader';
import EmployeeHub from './components/EmployeeHub';
import PrivateRoute from './components/PrivateRoute';

const App = ({ isAuthenticated }) => {
  return (
    <div className="App">
      <SourceHeader inDevelopment={false} />
      <Switch>
        <Route exact path="/" component={SourceBody} />
        <Route path="/about" component={About} />
        <PrivateRoute path="/dashboard" component={EmployeeHub} authenticated={isAuthenticated} />
      </Switch>
    </div>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.page.isAuthenticated,
});
export default connect(mapStateToProps, {})(App);
