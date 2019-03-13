import React from 'react';
import axios from 'axios';
import { guestLoginAPI, storeId, accessToken, accessTokenCookie } from '../../public/constants/constants';

export function registerGuestUser(callback) {
    axios.post(guestLoginAPI, '', { 'headers': { 'store_id': storeId, 'access_token': accessToken } }).then(response => {
        const guestData = response.data.data
        const guestToken = guestData.access_token
        document.cookie = accessTokenCookie + '=' + guestToken;
        callback(guestToken);
    }).catch(error => {
        console.log('guestError--', error);
        callback('');
    });
}

