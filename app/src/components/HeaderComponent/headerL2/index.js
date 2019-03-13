/**
 *
 * HeaderL2
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class HeaderL2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // API vars
      headerL2Data: [],

      items: [],
      logoItem: [],
      searchItem: [],
      wishlistItem: [],
      cartItem: [],
      profileItem: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.fetchHeaderL2Data(nextProps)
  }

  fetchHeaderL2Data(nextProps) {
    if (nextProps.headerL2Data) {
      var logoJSX;
      var searchJSX;
      var wishlistJSX;
      var cartJSX;
      var profileJSX;
      const itemsArr = nextProps.headerL2Data.map((item, index) => {
        var name = item.name;
        if (name == 'logo') {
          logoJSX = <a href='#'><img src={item.imagepath} className='img-responsive' alt='logo' /></a>
        }
        else if (name == 'search') {
          searchJSX = <>
            <li>
              <div className='searchBox'>
                <button className='search' type='button'>
                  <i className={item.classname} aria-hidden='true'></i>
                </button>
                <input type='search' className='form-control' placeholder={item.placeholder} />
                <button className='imgupload' type='button'>
                  <i className={item.cameraclassname} aria-hidden='true'></i>
                </button>
              </div>
            </li>
            <li className='search-mob dropdown'><a href='#' className='dropdown-toggle' data-toggle='dropdown'><i className={item.searchbarclassname}></i></a>
              <div className='searchBox  dropdown-menu'>
                <button className='search' type='button'><i className={item.classname} aria-hidden='true'></i></button>
                <input type='search' className='form-control' placeholder={item.placeholder} />
                <button className='imgupload' type='button'><i className={item.cameraclassname} aria-hidden='true'></i></button>
              </div>
            </li>
          </>
        }
        else if (name == 'wishlist') {
          wishlistJSX = <li><a href='#'><i className={item.classname}></i></a></li>
        }
        else if (name == 'cart') {
          cartJSX = <li><a href='#'><i className={item.classname}></i></a></li>
        }
        else if (name == 'profile') {
          profileJSX = <>
            <li className='dropdown userDropdown'><a className='dropdown-toggle' data-toggle='dropdown' href='#'><i
              className={item.classname}></i></a>
              <ul className='dropdown-menu dropdown-user'>
                <li><a href='#'> Log in</a></li>
                <li><a href='#'> Register</a></li>
                <li className='divider'></li>
                <li><a href='#'><i className='fa fa-sign-out fa-fw'></i> Logout</a></li>
              </ul>
            </li>
          </>
        }
      })
      this.setState({
        logoItem: logoJSX,
        searchItem: searchJSX,
        wishlistItem: wishlistJSX,
        cartItem: cartJSX,
        profileItem: profileJSX,
      })
    }
  }

  render() {
    const { logoItem, searchItem, wishlistItem, cartItem, profileItem } = this.state;
    return (
      <div className='logoMenuwrp'>
        <div className='container'>
          <div className='row'>
            <div className='col-6 col-xl-2 col-lg-2 col-md-3 col-sm-5'>
              <div className='logohamburgerWrap clearfix'>
                <button id='wsnavtoggle' className='hamburger' type='button'>
                  <span className='hamburger-box'>
                    <span className='hamburger-inner'></span>
                  </span>
                </button>
                <div className='logo'>
                  {logoItem}
                </div>
              </div>
            </div>

            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 categoryNavcol-hidemob'>

              <div className='categoryNav'>
                <div className=''>

                  <div className='wsmenucontainer clearfix'>
                    <div className='overlapblackbg'></div>


                    <div className='wsmain'>
                      <nav className='wsmenu clearfix'>
                        <ul className='mobile-sub wsmenu-list'>
                          <li className='Homelink'><a href='#'><span>Home</span> </a></li>
                          <li><a href='#'>Rooms <span className='arrow'></span></a>
                            <div className='wsmenu-submenu clearfix'>
                              <ul className='col link-list'>
                                <li className='title'><a href='#'>Sofas</a></li>
                                <li><a href='#'>Recliners</a></li>
                                <li><a href='#'>Chairs</a></li>
                                <li><a href='#'>Stools</a></li>
                                <li><a href='#'>Dining set</a></li>
                              </ul>
                            </div>
                          </li>

                          <li><a href='#'>Products <span className='arrow'></span></a>
                            <div className='megamenu clearfix'>
                              <div className='row'>
                                <ul className='col link-list'>
                                  <li className='title'><a href='#'>Sofas</a></li>
                                  <li><a href='#'>Recliners</a></li>
                                  <li><a href='#'>Chairs</a></li>
                                  <li><a href='#'>Stools</a></li>
                                  <li><a href='#'>Dining set</a></li>
                                </ul>

                                <ul className='col link-list'>
                                  <li className='title'><a href='#'>Tables</a></li>
                                  <li><a href='#'>Display Units</a></li>
                                  <li><a href='#'>Modular Kitchen</a></li>
                                  <li><a href='#'>Bed</a></li>
                                  <li><a href='#'>Mattress</a></li>
                                </ul>

                                <ul className='col link-list'>
                                  <li className='title'><a href='#'>Cupboard</a></li>
                                  <li><a href='#'>Wardrobe</a></li>
                                  <li><a href='#'>Accessories</a></li>
                                </ul>
                              </div>

                            </div>
                          </li>

                          <li><a href='#'>Collection <span className='arrow'></span></a>
                            <div className='megamenu clearfix'>
                              <div className='row'>
                                <ul className='col link-list'>
                                  <li className='title'><a href='#'>Curated Collection</a></li>
                                  <li><a href='#'>Contemporary</a></li>
                                  <li><a href='#'>Modern</a></li>
                                  <li><a href='#'>Studio Collection</a></li>
                                  <li><a href='#'>Heritage</a></li>

                                </ul>
                                <ul className='col link-list'>
                                  <li className='title'><a href='#'>Style</a></li>
                                  <li><a href='#'>Art Deco</a></li>
                                  <li><a href='#'>Art Nouveau</a></li>
                                  <li><a href='#'>Scandinavian Modern</a></li>
                                  <li><a href='#'>Rococo</a></li>

                                </ul>

                              </div>

                            </div>
                          </li>
                          <li><a href='#'>Inspiration <span className='arrow'></span></a>
                            <div className='wsmenu-submenu clearfix'>
                              <ul className='col link-list'>

                                <li><a href='#'>Lookbooks</a></li>
                                <li><a href='#'>Blogs</a></li>

                              </ul>
                            </div>

                          </li>

                          <li><a href='#'>Sale <span className='arrow'></span></a></li>


                        </ul>
                      </nav>

                    </div>

                  </div>

                </div>
              </div>

            </div>

            <div className='col-4 col-xl-4 col-lg-4 col-md-3 col-sm-3 headerIconlistwid'>
              <ul className='headerIconlist'>
                {searchItem}
                {wishlistItem}
                {cartItem}
                {profileItem}



              </ul>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

HeaderL2.propTypes = {};

export default HeaderL2;
