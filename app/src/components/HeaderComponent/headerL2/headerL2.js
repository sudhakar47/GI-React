import React from 'react';
import Category from '../../Category/category';
/* Header API */
// const secureHttp = 'https';
// const port2 = '8002';
// const host = 'localhost';
// const heaerApi2 = `${secureHttp}://${host}:${port2}/api/v1/categories/navigation`;
// const headers2 = {
//     'store_id': '10151',
//     'access_token': '' 
// }

class HeaderL2 extends React.Component{
    state = {
        layer2Data:{},
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
            // <nav>
            //     <ul className='layer2'>
            //         {!isLoading ? (
            //             layer2Data.map((linkData, index) => {
            //                 return (
            //                     <li className='listItems' key={index}>
			// 						<a className='action' href={linkData.url}>
			// 							{linkData.name}
			// 						</a>
			// 					</li>
            //                 );
            //             })
            //         ) : (
            //             <p className='error'>Result not found</p>
			// 		)}
			// 		{/* Write Something */}
            //         {/* <WelcomeBack /> */}
            //     </ul>
            // </nav>
            <Category />
        );
    }
}  

export default HeaderL2;
