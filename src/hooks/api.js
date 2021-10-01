import axios from 'axios';

const url = window.location.hostname

export async function getToday() {
    const response = await axios.get(`http://${url}:8080/api/today`);
    return response.data;
}

export async function getTodayChart(name) {
    const response = await axios.get(`http://${url}:8080/api/today-chart/${name}`);
    return response.data;
}

export async function getProducts(limit) {
    const response = await axios.get(`http://${url}:8080/api/products/${limit}`);
    return response.data;
}

export async function getOrders(limit) {
    const response = await axios.get(`http://${url}:8080/api/orders/${limit}`);
    return response.data;
}

export async function getShopggu() {
    const response = await axios.get(`http://${url}:8080/api/shopggus`);
    return response.data;
}