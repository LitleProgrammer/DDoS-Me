import axios from "axios";
import Cookies from "js-cookie";
import { generateIp, getRandomEndpoint } from "./mathUtils";
const sessionStorage = window.sessionStorage;

const local = false;

const backend = local ? 'http://localhost:3456' : 'http://192.168.10.100:3456';

const storeIp = () => {
    const ip = generateIp();

    Cookies.set('fake-ip', ip);

    return ip;
}

export const getIp = () => {
    return Cookies.get('fake-ip') || storeIp();
}

export const getAmountRequests = () => {
    return sessionStorage.getItem('amountRequests') || 0;
}

export const getRequestsGoneThrough = () => {
    return sessionStorage.getItem('requestsGoneThrough') || 0;
}

export const doAttack = async () => {
    sessionStorage.setItem('amountRequests', (parseInt(sessionStorage.getItem('amountRequests') || 0) || 0) + 1);
    const endpoint = getRandomEndpoint();
    try {
        const res = await axios.post(`${backend}/${endpoint}`, { test: "testString" }, { withCredentials: true });

        sessionStorage.setItem('requestsGoneThrough', (parseInt(sessionStorage.getItem('requestsGoneThrough') || 0) || 0) + 1);
        return {
            success: true,
            message: res.data.message
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const getMinReq = async () => {
    try {
        const res = await axios.get(`${backend}/getMinReqSpeed`, { withCredentials: true });
        return res?.data?.minReqSpeed || 2;
    } catch (error) {
        return 2;
    }
}