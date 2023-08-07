import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://apigw.kubekkp.coofis.com/policy/"

export const getCategory = createAsyncThunk("kebijakan/getCategory", async () => {
    const respon = await axios.get(`${BASE_URL}category/`, { headers: { Authorization: 'cf50a5b6-d640-49df-a45d-29f3e7ca1f1c' } })
    return respon?.data.result
})


export const getCategoryId = createAsyncThunk("kebijakan/getCategoryId", async (id) => {
    const respon = await axios.get(`${BASE_URL}category/${id}/`, { headers: { Authorization: 'cf50a5b6-d640-49df-a45d-29f3e7ca1f1c' } })
    return respon?.data
})

export const getCategoryIdPage = async (id, page) => {
    console.log(id, page)
    try {
        const respon = await axios.get(`${BASE_URL}category/${id}/?page=${page}`, { headers: { Authorization: 'cf50a5b6-d640-49df-a45d-29f3e7ca1f1c' } })
        return respon.data
    } catch (error) {
        return error
    }
}