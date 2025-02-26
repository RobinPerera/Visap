import axios from 'axios';

// Environment configuration (adjust based on your React setup)
const API_BASE_URL = "localhost/ViSAP/api";

const CommonService = {
    // Generic POST request
    postRequest: async (apiName, data = {}) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/${apiName}`, data, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            });
            return response.data;
        } catch (error) {
            console.error('POST Request Error:', error);
            throw error;
        }
    },

    // Generic GET request
    getRequest: async (apiName) => {
        try {
            console.log(API_BASE_URL, apiName);
            const response = await axios.get(`//${API_BASE_URL}/${apiName}`);
            return response.data;
        } catch (error) {
            console.error('GET Request Error:', error);
            throw error;
        }
    },
};

export default CommonService;
