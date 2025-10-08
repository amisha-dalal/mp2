import axios from "axios";


//looked at this for reference: https://medium.com/@shruti.latthe/creating-a-centralized-api-client-file-in-react-with-axios-5e69dc27fdb1


const BASE_URL = "https://api.artic.edu/api/v1";


const apiClient = axios.create({
 baseURL: BASE_URL,
 headers: {'Content-Type': 'application/json'}
});


const _get = (url: string, config = {}) => {
 return apiClient.get(url, config);
};


export {_get};