import React from 'react';
import Input from '../Input/input';
import SearchLogo from '../../components/SVGs/search';
import CartLogo from '../../components/SVGs/cart';
import WishlistLogo from '../../components/SVGs/wishlist';
import UserLogo from '../../components/SVGs/user';
import '../../../public/styles/headerContainer/search.scss';

class SearchBar extends React.Component{
    state = {
        searchData:{},
        isLoading: true,
        errors: null
    };

    // getHeaderLayer2() {
    //     axios
	// 	.get(heaerApi2, {headers:headers2})
	// 	.then(response => {
	// 		this.setState({
	// 			layer2Data: response.data.data.categoryArray,
	// 			isLoading: false
	// 		});
	// 			console.log('@@@@@@@@@@@@@@', response.data.data.categoryArray);
	// 	})
	// 	.catch(error => this.setState({ error, isLoading: false }));
    // }

    // componentDidMount() {
    //     this.getHeaderLayer2();
    // }

    render() {
        // const { isLoading, layer2Data } = this.state;
        return (
            <div className='searchBar'>
                <SearchLogo />
                <input className='searchInput' type='text' placeholder='search for products' />
            </div>
        );
    }
} 

export default SearchBar;