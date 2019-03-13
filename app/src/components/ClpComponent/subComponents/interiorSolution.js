import React from 'react';

class InteriorSolution extends React.Component {
    render() {
        return (
            <section className='godrejInterior'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-sm-6'>
                            <div className='godrejInteriontext'>
                                <h4 className='heading'>Godrej interior Solutions</h4>
                                <p className='paragraph'>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which don't look
                                    even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be
                          sure there isn't anything embarrassing hidden in the middle of text. </p>
                                <button className='btn-bg'>Find out more</button>
                            </div>
                        </div>

                        <div className='col-12 col-md-6 col-sm-6'>
                            <div className='godrejiteriorImgbox'>
                                <img className='img-fullwidth' src={require('../../../../public/images/interior.jpg')} alt='interior' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default InteriorSolution;