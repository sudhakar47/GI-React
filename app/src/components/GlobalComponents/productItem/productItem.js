import React from 'react';

class ProductItem extends React.Component {
    render() {
        return (
            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6'>
                <div className='productBox'>
                    <div className='imgBox'>
                        <img className='img-fullwidth' src={require('../../../../public/images/plp-1.png')} alt='sofa' />
                        <div className='featurepro-like'>
                            <div className='fa fa-heart-o wishlist'></div>
                        </div>
                        <div className='overlay-comparequick'>
                            <div className='inner-overlay'>
                                <ul className='colortheme clearfix'>
                                    <li className='colortheme-list yellow'></li>
                                    <li className='colortheme-list red-dirt'></li>
                                    <li className='colortheme-list grey'></li>
                                    <li className='colortheme-list blue'></li>
                                </ul>
                                <div className='btn-wrapper'>
                                    <button className='btnborder-line'>Compare +</button>
                                    <button className='btnborder-line'>Quick View</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='featured-texttop'>Featured Product</div>
                    <div className='product-text'>
                        <p className='paragraph'>Fantasia Similine</p>
                        <p className='price paragraph'>Rs 23,000 <span className='priceno-discount'>26,000</span> <span className='offerpercent'>(30%
                            off)</span></p>
                        <p className='paragraph'>Get free chairs with this</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductItem;