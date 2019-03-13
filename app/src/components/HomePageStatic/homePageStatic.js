import React from 'react';
import axios from "axios";
import '../../../public/styles/homePageStatic.scss';
/* HomePage API */
const secureHttp = 'https';
const port2 = '8002';
const host = 'localhost';
const homePageApi = `${secureHttp}://${host}:${port2}/api/v1/homebody`;
const homePageHeaders = {
    'store_id': '10151',
    'access_token': 'U2FsdGVkX1+vnmZvnMILdPXiFhcmYPrI+DxL1fa4SuV5wkC9fSD6l8/nK69wde6aK4+VWf86qkjPTojE+hsZu5cHwEMoILVb9kDqiXYZ8BtdRPW5dhtHhm/oytSpJfi52USBVNODq89mfyENFC7FddTuhH546lwVdGxuhBwyd0fGUr7y50+aI88PY7bMQ4OM+L4YdePeBzDL4pNabGnzh3rVt+gcKwm0X9rPz4SfDjxqOuCgSoZfSrodjX41LColT2IQL49zPS8XtY2PtA4cl3NX845RKZxsefzFfZFK940lQWSuhTgEqiQZa9HfXKTrHGusX9BwCxfG/TnbyvVnrPG7/CnFpSr5chx6OvhjicPNAEhmmJ634SZm5x3/KoKFpLmhAzjJ3bN4+im26yLU8e9GORzwR35vZ1ssQ7bZ+CkO2Mm0Ma6aVepkxfIrgnE7QkmOKsGdor5AWNA+w8HHyRf8Bf+RCZtEWPjlm22kRb7+V0kd/MKncwZYxG1qFZlVbnBm+5n7V4iatverlTQOoIl/JYpfV5lFT/0whdQ+vXTIEeeC0XfqyadwhsiWFOqFFM5ysQbqm7wwCXs0xT1JqkYQ+0xUsrw2gK5rJ9nQzw94oGYQxhaMwB7nH6pllAShwLTKxlrdtmafsJolRLwW9VoW/QZVTAG0d2RuneOc0jYzE5w++UveMf3IWKRuQKs9hcpSGC8QDzWcTUHcl2IJc8Q1nUMVPCCWuL1m8dl5MmFp+NT+Z71FQOW6UP0q4QbSee7JWhka2X2ROb1KKeSfbV92XagmRFpviXX3fvW9QObUZPgGoUjn3xNT69qMoAhnml18lcrWA7MYh9TpnQKJ2Cqm59g66SMC60T7z1cmHcefY68aF1/JYIxJGde39VvzDfJkApRgY3nksvuOLbKzFfBBXqsyEGQUIuha1jOrf2jNQN7UOG0jZGk749nyYxVmPRN6vi+q1zRa0CtRI9YByg==' 
}

class HomePageStatic extends React.Component{
    state = {
        homePageData:{},
        isLoading: true,
        errors: null
    };

    getHomePageData() {
        axios
            .get(homePageApi, {headers:homePageHeaders})
            .then(response => {
                this.setState({
                    homePageData: response.data.data.GI_Homepage_Static_Content,
                    isLoading: false
                });
                console.log('########$$$$#', response.data.data.GI_Homepage_Static_Content);
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        this.getHomePageData();
    }

    render() {
        const { isLoading, homePageData } = this.state;
        return (
            <div className='homePageStatic'>
                {!isLoading ? <div dangerouslySetInnerHTML={{ __html: homePageData.content }} />
                : (
                    <div>Something Went Wrong</div>
                )}
            </div>
        );
    }
}  

export default HomePageStatic;
