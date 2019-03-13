/**
 *
 * HeaderL1
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Register from '../../RegisterComponent/joinUs';
/* eslint-disable react/prefer-stateless-function */
class HeaderL1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // API vars
      headerL1Data: [],

      items: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.fetchHeaderL1Data(nextProps)
  }

  fetchHeaderL1Data(nextProps) {
    if (nextProps.headerL1Data) {
      const itemsArr = nextProps.headerL1Data.map((item, index) => {
        return (
          <li key={index}><a href='#'>{item.label}</a></li>
        )
      })
      this.setState({
        items: itemsArr
      })
    }
  }

  render() {
    const {items} = this.state;
    return (
      <div className='topHeader'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
              <div className='left-link'>
                <ul>
                  {/*items*/}
                  <Register />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HeaderL1.propTypes = {};

export default HeaderL1;
