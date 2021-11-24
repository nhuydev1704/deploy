import { notification } from 'antd';
import axios from 'axios';

export const API_URL = 'http://localhost:5000';

export const getDataNotoken = async (url, params) => {
    try {
        const res = await axios.get(url + params);
        return res;
    } catch (error) {
        return error.response;
    }
};

export const delDataNotoken = async (url, id) => {
    try {
        const res = await axios.delete(url + '/' + id);
        notification['success']({
            message: 'Xóa thành công',
            placement: 'bottomRight',
        });
        return res;
    } catch (error) {
        return error.response;
    }
};

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`/api/${url}`, {
        headers: { Authorization: token },
    });
    return res;
};

export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`/api/${url}`, post, {
        headers: { Authorization: token },
    });
    return res;
};

export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`/api/${url}`, post, {
        headers: { Authorization: token },
    });
    return res;
};

export const patchDataAPI = async (url, post, token) => {
    const res = await axios.patch(`/api/${url}`, post, {
        headers: { Authorization: token },
    });
    return res;
};

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`/api/${url}`, {
        headers: { Authorization: token },
    });
    return res;
};
