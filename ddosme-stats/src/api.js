import axios from "axios";

const backend = 'http://localhost:3456';

export const getStats = async () => {
    try {
        const response = await axios.get(`${backend}/stats`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error };
    }
}

export const stopExperiment = async () => {
    try {
        const response = await axios.get(`${backend}/stop`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error };
    }
}

export const startExperiment = async () => {
    try {
        const response = await axios.get(`${backend}/start`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error };
    }
}

export const toggleAI = async () => {
    try {
        const response = await axios.get(`${backend}/toggleAI`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error };
    }
}

export const toggleAutoReq = async () => {
    try {
        const response = await axios.get(`${backend}/toggleAutoReq`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error };
    }
}

export const setMinReqSpeed = async (speed) => {
    try {
        const response = await axios.post(`${backend}/setMinReqSpeed/${speed}`, {});
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error };
    }
}