import React from 'react';

class LivingInspiration extends React.Component {
  render() {
    return (
      <section className='livingRoom'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 col-sm-6'>
              <h3 className='living-heading padding-bottom'>Living Room<br />Inspiration</h3>
              <div className='boxImg'>
                <img className='img-fullwidth' src={require('../../../../public/images/1.jpg')} alt='1' />
              </div>
            </div>

            <div className='col-md-6 col-sm-6'>
              <h3 className='ourcoll-heading padding-bottom'>See our Collection of<br />Products here</h3>
              <div className='boxImg'>
                <img className='img-fullwidth' src={require('../../../../public/images/2.jpg')} alt='1' />
              </div>
            </div>

            <div className='col-md-6 col-sm-6'>
              <div className='boxImg'>
                <img className='img-fullwidth' src={require('../../../../public/images/2.jpg')} alt='1' />
              </div>
            </div>

            <div className='col-md-6 col-sm-6'>
              <div className='boxImg'>
                <img className='img-fullwidth' src={require('../../../../public/images/2.jpg')} alt='1' />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-12 col-sm-12'>
              <div className='text-center'>
                <a href='#' className='btn-border'>See More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default LivingInspiration;