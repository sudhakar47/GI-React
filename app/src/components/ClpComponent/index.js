/**
 *
 * ClpComponent
 *
 */

import React from 'react';
import HeroBanner from './subComponents/heroBanner';
import SubCategories from '../GlobalComponents/productSubcategories/subCategories';
import TrendingCategories from './subComponents/trendingCategories';
import LivingInspiration from './subComponents/livingInspiration';
import FreshContent from './subComponents/freshContent';
import InteriorSolution from './subComponents/interiorSolution';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class ClpComponent extends React.Component {
  render() {
    return (
      <>
        <HeroBanner />
        <section className='tablecarousel'>
          <div className='container'>           
            <SubCategories />
          </div>
        </section>
        <TrendingCategories />
        <LivingInspiration />
        <FreshContent />
        <InteriorSolution />
      </>
    );
  }
}

ClpComponent.propTypes = {};

export default ClpComponent;
