import axios from 'axios';
// import { ValidToken } from './token';

const Api = axios.create()
// const config = {
//     headers: { "Authorization": `Bearer ${JSON.parse(window.localStorage.getItem("access-token"))}` },
// }
// Api.interceptors.request.use(
//     (config) => {
// 		//AccessToken이 만료됬고, RefreshToken이 유효하다면
//         console.log("refresh " + ValidToken("refresh-token"))
//         console.log("access " + ValidToken("access-token"))
// 		if(ValidToken("refresh-token") &&!ValidToken("access-token")){
// 			// Refreshtoken을 통해 Accesstoken을 재발급한다.
// 			refresh()
//             .then(res => {
//                 // Response가 정상이라면
//                 window.localStorage.setItem("access-token", JSON.stringify(res.access_token))
//                 window.localStorage.setItem("refresh-token", JSON.stringify(res.refresh_token))
//                 config.headers = { "Authorization" : `Bearer ${JSON.parse(window.localStorage.getItem("access-token"))}`}
//                 console.log( "localstorage ", window.localStorage.getItem("access-token"))
//                 console.log( "data ", JSON.stringify(res.access_token))
//                 // config.header.common = {'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem("access-token"))}`}
//                 // 실패했던 요청을 다시 수행한다.
//                 return config
//             })
// 		} else if (!ValidToken("refresh-token")){
// 			localStorage.clear();
//             const history = useHistory()
//             history.push("/login")
// 		}
//         // config.header.common = {'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem("access-token"))}`}
//         // config.header.Authorization = `Bearer ${JSON.parse(window.localStorage.getItem("access-token"))}`
//         // config.header = { 'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem("access-token"))}`}
//         // config.headers = { "Authorization" : `Bearer ${JSON.parse(window.localStorage.getItem("access-token"))}`}
//         return config
//     },
//     (err) => {
//         return Promise.reject(err);
//     }
// );


Api.interceptors.request.use(
    (config) => {
        config.headers = { "Authorization" : `Bearer ${JSON.parse(window.localStorage.getItem("access-token"))}`}
        return config
    },
    (err) => {
        return Promise.reject(err);
    }
);
Api.interceptors.response.use(
    (config) => {
        return config
    },
    (err) => {
        // console.log(err.response.data)
        // console.log("refresh " + ValidToken("refresh-token"))
        // console.log("access " + ValidToken("access-token"))
        if(err.response.data === "Token is expired"){
            refresh()
            .then(res => {
                localStorage.setItem("access-token", JSON.stringify(res.access_token))
                localStorage.setItem("refresh-token", JSON.stringify(res.refresh_token))
                err.config.headers = { "Authorization" : `Bearer ${JSON.parse(window.localStorage.getItem("access-token"))}`}
                // console.log(JSON.parse(window.localStorage.getItem("access-token")))
                window.location.reload()
            })
        }
        return Promise.reject(err);
    }
);


const url = "sellereeback.ngrok.io"

export async function test() {
    const response = await Api.get(`https://${url}/api/test`)
    return response.data;
}

export async function refresh() {
    const response = await axios.post(`https://${url}/api/refresh`, {
        "refresh-token" : JSON.parse(window.localStorage.getItem("refresh-token"))
    });
    return response.data;
}

export async function logIn(user) {
    const response = await axios.post(`https://${url}/api/login`, user);
    return response.data;
}

export async function getToday() {
    const response = await axios.get(`https://${url}/api/today`);
    return response.data;
}

export async function getTodayChart(name) {
    const response = await axios.get(`https://${url}/api/today-chart/${name}`);
    return response.data;
}

export async function getProducts(limit) {
    const response = await Api.get(`https://${url}/api/products/${limit}`);
    return response.data;
}

export async function getOrders(limit, sortBy) {
    const response = await axios.post(`https://${url}/api/orders/${limit}`, {
        sortBy : sortBy
    });
    return response.data;
}

export async function getShopggu() {
    const response = await axios.get(`https://${url}/api/shopggus`);
    return response.data;
}