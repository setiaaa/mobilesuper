import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://apigw.kubekkp.coofis.com/"
const kebijakan = BASE_URL + 'policy/'
const kalender = BASE_URL + 'calendar/'
const addressbook = BASE_URL + 'bridge/'
const repository = BASE_URL + 'repository/'


// kebijakan
export const getCategory = createAsyncThunk("kebijakan/getCategory", async (token) => {
    const respon = await axios.get(`${kebijakan}category/`, { headers: { Authorization: token } })
    return respon?.data.result
})


export const getCategoryId = createAsyncThunk("kebijakan/getCategoryId", async (id) => {
    const respon = await axios.get(`${kebijakan}category/${id}/`, { headers: { Authorization: 'cf50a5b6-d640-49df-a45d-29f3e7ca1f1c' } })
    return respon?.data
})

export const getCategoryIdPage = async (id, page) => {
    console.log(id, page)
    try {
        const respon = await axios.get(`${kebijakan}category/${id}/?page=${page}`, { headers: { Authorization: 'cf50a5b6-d640-49df-a45d-29f3e7ca1f1c' } })
        return respon.data
    } catch (error) {
        return error
    }
}

// event
export const getEvent = createAsyncThunk("calendar/getEvent", async (token) => {
    const respon = await axios.get(`${kalender}event/?limit=9999`, { headers: { Authorization: token } })
    return respon?.data.results
})

export const getEventToday = createAsyncThunk("calendar/getEventToday", async (token) => {
    const respon = await axios.get(`${kalender}event/today/?limit=9999`, { headers: { Authorization: token } })
    return respon?.data.results
})

export const getEventProgress = createAsyncThunk("calendar/getEventProgress", async (token) => {
    const respon = await axios.get(`${kalender}event/progress/?limit=9999`, { headers: { Authorization: token } })
    return respon?.data.results
})

export const getEventDetail = createAsyncThunk("calendar/getEventDetail", async ({ token, id }) => {
    const respon = await axios.get(`${kalender}event/${id}/retrieve/`, { headers: { Authorization: token } })
    return respon?.data.result
})

export const getEventAgenda = createAsyncThunk("calendar/getEventAgenda", async (data) => {
    const respon = await axios.get(`${kalender}event/${data.id}/agenda/`, { headers: { Authorization: data.token } })
    return respon?.data.results
})

export const getEventAgendaDetail = createAsyncThunk("calendar/getEventAgendaDetail", async ({ token, id }) => {
    const respon = await axios.get(`${kalender}event/agenda/${id}/retrieve/`, { headers: { Authorization: token } })
    return respon?.data.result
})

export const getlistApprover = createAsyncThunk("calendar/getlistApprover", async ({ token, id }) => {
    const respon = await axios.get(`${kalender}event/agenda/notulensi/${id}/approver/`, { headers: { Authorization: token } })
    return respon?.data.results
})

export const getlistNotulensi = createAsyncThunk("calendar/getlistNotulensi", async ({ token, idagenda }) => {
    const respon = await axios.get(`${kalender}event/agenda/${idagenda}/notulensi/`, { headers: { Authorization: token } })
    return respon?.data.results
})

export const getDetailNotulensi = createAsyncThunk("calendar/getDetailNotulensi", async ({ token, idnotu }) => {
    const respon = await axios.get(`${kalender}event/agenda/notulensi/${idnotu}/retrieve/`, { headers: { Authorization: token } })
    return respon?.data.result
})

export const getlistTodo = createAsyncThunk("calendar/getlistTodo", async ({ token, id }) => {
    const respon = await axios.get(`${kalender}event/agenda/notulensi/${id}/task/?name=`, { headers: { Authorization: token } })
    return respon?.data.results
})

export const getDetailTodo = createAsyncThunk("calendar/getDetailTodo", async ({ token, id }) => {
    const respon = await axios.get(`${kalender}event/agenda/notulensi/task/${id}/retrieve/`, { headers: { Authorization: token } })
    return respon?.data.result
})

export const getlistAbsen = createAsyncThunk("calendar/getlistAbsen", async ({ token, idagenda }) => {
    const respon = await axios.get(`${kalender}event/agenda/${idagenda}/presensi/?user=`, { headers: { Authorization: token } })
    return respon?.data.results
})

export const getDetailAbsen = createAsyncThunk("calendar/getDetailAbsen", async ({ token, idabsen }) => {
    const respon = await axios.get(`${kalender}event/agenda/presensi/${idabsen}/retrieve/`, { headers: { Authorization: token } })
    return respon?.data.results
})

export const putAbsen = createAsyncThunk("calendar/putAbsen", async (data) => {
    const respon = await axios.put(`${kalender}event/agenda/presensi/${data.idabsen}/update/`, { status: data.status, is_scan: data.is_scan }, { headers: { Authorization: data.token } })
    return respon?.data.result
})

//Kalender
export const getlistKalender = createAsyncThunk("calendar/getlistKalender", async (token) => {
    const respon = await axios.get(`${kalender}calendar/?limit=10`, { headers: { Authorization: token } })
    return respon?.data.results
})

//komentar
export const postKomenTodo = createAsyncThunk("calendar/postKomenTodo", async (data) => {
    const respon = await axios.post(`${kalender}event/agenda/notulensi/task/comment/create/`, {
        "task_id": data.task_id,
        "parent_id": data.parent_id,
        "message": data.message,
    }, {
        headers:
        {
            Authorization: data.token
        }
    })
    return {
        newComment: respon?.data.result,
        detailTodo: data.detailTodo,
        parent_id: data.parent_id
    }
})

//addressbook
export const getDivision = createAsyncThunk("calendar/getDivision", async (token) => {
    const respon = await axios.get(`${addressbook}addressbook/division/`, { headers: { Authorization: token } })
    return respon?.data.results
})
export const getEmployee = createAsyncThunk("calendar/getEmployee", async (token) => {
    const respon = await axios.get(`${addressbook}addressbook/employee/`, { headers: { Authorization: token } })
    return respon?.data.results
})
export const getDivisionTree = createAsyncThunk("calendar/getDivisionTree", async ({ token, id }) => {
    const respon = await axios.get(`${addressbook}addressbook/tree/${id}/`, { headers: { Authorization: token } })
    return respon?.data.results
})

//repository
export const getSharedDocuments = createAsyncThunk("repository/getSharedDocuments", async (token) => {
    const respon = await axios.get(`${repository}shared-documents/`, { headers: { Authorization: token } })
    return respon?.data.result
})
export const getDetailsSharedDocuments = createAsyncThunk("repository/getDetailsSharedDocuments", async ({token, id}) => {
    const respon = await axios.get(`${repository}${id}/document-detail/`, { headers: { Authorization: token } })
    return respon?.data.result
})