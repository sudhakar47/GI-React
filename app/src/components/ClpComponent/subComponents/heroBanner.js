import React from 'react';

class HeroBanner extends React.Component {
  render() {
    return (
      <div className='slider'>
        <img className='img-fullwidth' src={require('../../../../public/images/slider.jpg')} 
        alt='slider' />
      </div>
    )
  }
}

export default HeroBanner;