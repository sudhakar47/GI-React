import React from 'react';
import CartLogo from '../../components/SVGs/cart';
import WishlistLogo from '../../components/SVGs/wishlist';
import UserLogo from '../../components/SVGs/user';

class SearchBar extends React.Component{
    state = {
        searchData:{},
        isLoading: true,
        errors: null
    };
    render() {
        return (
            <div className='rightSide'>
                <WishlistLogo />
                <CartLogo />
                <UserLogo />
            </div>
        );
    }
} 

export default SearchBar;