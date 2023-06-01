import axios from "axios";

const BASE_URL = "https://apigw.kubekkp.coofis.com/policy/"

export const getCategory = async () => {
    try {
        const respon = await axios.get(`${BASE_URL}category/`, { headers: { Authorization: 'e828c5d0-b1f6-4796-a74a-fe648cb04c8a' } })
        return respon.data
    } catch (error) {
        return error
    }
}

export const getCategoryId = async (id) => {
    try {
        const respon = await axios.get(`${BASE_URL}category/${id}/`, { headers: { Authorization: 'e828c5d0-b1f6-4796-a74a-fe648cb04c8a' } })
        return respon.data
    } catch (error) {
        return error
    }
}

export const getCategoryIdPage = async (id, page) => {
    try {
        const respon = await axios.get(`${BASE_URL}category/${id}/?page=${page}`, { headers: { Authorization: 'e828c5d0-b1f6-4796-a74a-fe648cb04c8a' } })
        return respon.data
    } catch (error) {
        return error
    }
}