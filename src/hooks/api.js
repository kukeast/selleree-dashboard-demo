import axios from 'axios';

export async function getToday() {
    const response = await axios.get(`http://localhost:8080/api/today`);
    return response.data;
}

export async function getTodayChart(name) {
    const response = await axios.get(`http://localhost:8080/api/today-chart/${name}`);
    return response.data;
}

export async function getProduct(limit) {
    const response = await axios.get(`http://localhost:8080/api/products/${limit}`);
    return response.data;
}

export async function getShopggu() {
    const response = await axios.get('http://localhost:8080/api/shopggus');
    return response.data;
}