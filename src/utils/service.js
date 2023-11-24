import axios from 'axios'

const service = axios.create({
    baseURL: '/',
    headers: {
       "Content-Type": "application/json"
    },
    timeout: 10000,
    withCredentials: true
});

// 请求拦截
service.interceptors.request.use(config => {
    let JWT = localStorage.getItem('JWT');
    if(JWT){
        config.headers["Authorization"] =  `Bearer ${localStorage.getItem('JWT')}`;
    }
    return config;
});

// 返回拦截
service.interceptors.response.use((res)=>{
    if(res.status === 200){
        return res.data;
    } else {
        console.error(res);
        return res
    }
}, (err)=>{
    const message = err.response.data && err.response.data.message || 'unknown error';

    if(err.response.status === 403){
        localStorage.removeItem('JWT');
    }

    return Promise.reject(message);
});
export default service;