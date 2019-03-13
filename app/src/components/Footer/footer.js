import React from 'react';
import Footerlinks  from './footerLinks';
import Newsletter  from './newsletter';
import Socialicon  from './socialicons';
import { Grid, Row, Col } from 'react-bootstrap';

const FooterComponent = (props) => (
  <Grid>
    <Row>
      <Col md={8} sm={12} xs={12}>
        <Footerlinks name={props.links} />
      </Col>
      <Col md={4} sm={12} xs={12}>
        <Newsletter name={props.newsletter} />
      </Col>
    </Row>
    <Row className='social-Link clearfix'>
      <ul className='clearfix'>
        <Socialicon name={props.socialicons} />
      </ul>
    </Row>
  </Grid>
);


export default FooterComponent;
