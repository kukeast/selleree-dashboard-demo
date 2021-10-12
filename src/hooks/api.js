import axios from 'axios';

const url = "sellereeback.ngrok.io"
// const url = window.location.hostname
// const url = "localhost"

export async function logIn(values) {
    const response = await axios.post(`https://${url}/api/login`, values);
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
    const response = await axios.get(`https://${url}/api/products/${limit}`);
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