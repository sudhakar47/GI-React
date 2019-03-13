/**
 *
 * PlpContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import makeSelectPlpContainer from '../../selectors/plpContainer/selectors';
import reducer from '../../reducers/plpContainer/reducer';
import saga from '../../saga/plpContainer/saga';
import PlpComponent from '../../components/PlpComponent/index';
import '../../../public/styles/plpContainer/plpContainer.scss';

/* eslint-disable react/prefer-stateless-function */
export class PlpContainer extends React.Component {
  render() {
    return <PlpComponent />;
  }
}

PlpContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  plpContainer: makeSelectPlpContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'plpContainer', reducer });
const withSaga = injectSaga({ key: 'plpContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PlpContainer);
