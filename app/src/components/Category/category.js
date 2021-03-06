import React from 'react';
import axios from "axios";
import '../../../public/styles/headerContainer/category.scss';
import SearchBar from '../Search/search';
import HeaderRight from '../HeaderRight/headerRight';
import { navigationApi, storeId, accessToken } from '../../../public/constants/constants';
import SubCategoriesData from '../SubCategories/subCategories';

class Category extends React.Component{
    state = {
        category:{},
        isLoading: true,
        errors: null
    };

    getHeaderLayer2() {
        axios
		.get(navigationApi, { 'headers': { 'store_id': storeId, 'access_token': accessToken } })
		.then(response => {
			this.setState({
                category: response.data.data.categoryArray,
				isLoading: false
			});
				console.log('@@@@@@@@@@@@@@', response.data.data.categoryArray);
		})
		.catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        this.getHeaderLayer2();
    }

    render() {
        const { isLoading, category = [] } = this.state;
        return (
            <div className='category'>
                <ul className='categoryList'>
                    {!isLoading ? (
                        category.map((categoryData, index) => {
                            return (
                                <li className='listItems' key={`category-${index}`}>
									<a className='action' href={categoryData.onClickUrl}>
										{categoryData.categoryName}
									</a>
                                    {!!categoryData.subCategoryArray && <SubCategoriesData
                                        subCategoryArray={categoryData.subCategoryArray}
                                    />}
								</li>
                            );
                        })
                    ) : (
                        <p className='error'>No Category Found</p>
                    )}
                </ul>
                <SearchBar />
                <HeaderRight />
            </div>
        );
    }
}  

export default Category;
