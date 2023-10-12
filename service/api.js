import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://apigw.kubekkp.coofis.com/"
const kebijakan = BASE_URL + 'policy/'
const kalender = BASE_URL + 'calendar/'
const addressbook = BASE_URL + 'bridge/'
const pegawai = BASE_URL + 'bridge/'
const SATKER = BASE_URL + 'bridge/'
const Linimasa = BASE_URL + 'mp/'
const repository = BASE_URL + "repository/";
const profile = BASE_URL + "bridge/profile/";
const banner = BASE_URL + "bridge/home/benner/";
const galeri = BASE_URL + "bridge/home/gallery/";
const berita = BASE_URL + "bridge/home/news/?page=1";
const detailBerita = BASE_URL + "bridge/home/news/";
const taskManagement = BASE_URL + "calendar/";


//Login
export const Login = createAsyncThunk(
    "auth/Login",
    async ({ username, password }) => {
        const payload = {
            "username": username,
            "password": password
        }
        console.log(payload)
        const respon = await axios.post(`https://auth.kubekkp.coofis.com/mobile/login/`,
            payload
        );
        return respon?.data;
    }
);

// kebijakan
export const getCategory = createAsyncThunk(
    "kebijakan/getCategory",
    async (token) => {
        const respon = await axios.get(`${kebijakan}category/`, {
            headers: { Authorization: token },
        });
        return respon?.data.result;
    }
);

export const getCategoryId = createAsyncThunk(
    "kebijakan/getCategoryId",
    async (id) => {
        const respon = await axios.get(`${kebijakan}category/${id}/`, {
            headers: { Authorization: "cf50a5b6-d640-49df-a45d-29f3e7ca1f1c" },
        });
        return respon?.data;
    }
);

export const getCategoryIdPage = async (id, page) => {
    console.log(id, page);
    try {
        const respon = await axios.get(`${kebijakan}category/${id}/?page=${page}`, {
            headers: { Authorization: "cf50a5b6-d640-49df-a45d-29f3e7ca1f1c" },
        });
        return respon.data;
    } catch (error) {
        return error;
    }
};

// event
export const getEvent = createAsyncThunk("calendar/getEvent", async (token) => {
    const respon = await axios.get(`${kalender}event/?limit=9999`, {
        headers: { Authorization: token },
    });
    return respon?.data.results;
});

export const getEventToday = createAsyncThunk(
    "calendar/getEventToday",
    async (token) => {
        const respon = await axios.get(`${kalender}event/today/?limit=9999`, {
            headers: { Authorization: token },
        });
        return respon?.data.results;
    }
);

export const getEventProgress = createAsyncThunk(
    "calendar/getEventProgress",
    async (token) => {
        const respon = await axios.get(`${kalender}event/progress/?limit=9999`, {
            headers: { Authorization: token },
        });
        return respon?.data.results;
    }
);

export const getEventDetail = createAsyncThunk(
    "calendar/getEventDetail",
    async ({ token, id }) => {
        const respon = await axios.get(`${kalender}event/${id}/retrieve/`, {
            headers: { Authorization: token },
        });
        return respon?.data.result;
    }
);

export const getEventAgenda = createAsyncThunk(
    "calendar/getEventAgenda",
    async (data) => {
        const respon = await axios.get(`${kalender}event/${data.id}/agenda/`, {
            headers: { Authorization: data.token },
        });
        return respon?.data.results;
    }
);

export const getEventAgendaDetail = createAsyncThunk(
    "calendar/getEventAgendaDetail",
    async ({ token, id }) => {
        const respon = await axios.get(`${kalender}event/agenda/${id}/retrieve/`, {
            headers: { Authorization: token },
        });
        return respon?.data.result;
    }
);

export const getlistApprover = createAsyncThunk(
    "calendar/getlistApprover",
    async ({ token, id }) => {
        const respon = await axios.get(
            `${kalender}event/agenda/notulensi/${id}/approver/`,
            { headers: { Authorization: token } }
        );
        return respon?.data.results;
    }
);

export const getlistNotulensi = createAsyncThunk(
    "calendar/getlistNotulensi",
    async ({ token, idagenda }) => {
        const respon = await axios.get(
            `${kalender}event/agenda/${idagenda}/notulensi/`,
            { headers: { Authorization: token } }
        );
        return respon?.data.results;
    }
);

export const getDetailNotulensi = createAsyncThunk(
    "calendar/getDetailNotulensi",
    async ({ token, idnotu }) => {
        const respon = await axios.get(
            `${kalender}event/agenda/notulensi/${idnotu}/retrieve/`,
            { headers: { Authorization: token } }
        );
        return respon?.data.result;
    }
);

export const getlistTodo = createAsyncThunk(
    "calendar/getlistTodo",
    async ({ token, id }) => {
        const respon = await axios.get(
            `${kalender}event/agenda/notulensi/${id}/task/?name=`,
            { headers: { Authorization: token } }
        );
        return respon?.data.results;
    }
);

export const getDetailTodo = createAsyncThunk(
    "calendar/getDetailTodo",
    async ({ token, id }) => {
        const respon = await axios.get(
            `${kalender}event/agenda/notulensi/task/${id}/retrieve/`,
            { headers: { Authorization: token } }
        );
        return respon?.data.result;
    }
);

export const getlistAbsen = createAsyncThunk(
    "calendar/getlistAbsen",
    async ({ token, idagenda }) => {
        const respon = await axios.get(
            `${kalender}event/agenda/${idagenda}/presensi/?user=`,
            { headers: { Authorization: token } }
        );
        return respon?.data.results;
    }
);

export const getDetailAbsen = createAsyncThunk(
    "calendar/getDetailAbsen",
    async ({ token, idabsen }) => {
        const respon = await axios.get(
            `${kalender}event/agenda/presensi/${idabsen}/retrieve/`,
            { headers: { Authorization: token } }
        );
        return respon?.data.results;
    }
);

export const putAbsen = createAsyncThunk("calendar/putAbsen", async (data) => {
    const respon = await axios.put(
        `${kalender}event/agenda/presensi/${data.idabsen}/update/`,
        { status: data.status, is_scan: data.is_scan },
        { headers: { Authorization: data.token } }
    );
    return respon?.data.result;
});

export const postAttachment = createAsyncThunk("calendar/postAttachment", async (data) => {
    let formData = new FormData()
    formData.append('file', data.result)
    const respon = await axios.post(`${kalender}attachment/create/`, formData, { headers: { Authorization: data.token } })
    return respon?.data.result
})

export const postEvent = createAsyncThunk("calendar/postEvent", async (data) => {
    const respon = await axios.post(`${kalender}event/create/`, data.payload, { headers: { Authorization: data.token } })
    return respon?.data
})

export const updateStatus = createAsyncThunk("calendar/updateStatus", async (data) => {
    const respon = await axios.put(`${kalender}event/${data.id}/status/`, { status: data.status }, { headers: { Authorization: data.token } })
    return respon?.data.result
})

export const updateEvent = createAsyncThunk("calendar/updateEvent", async (data) => {
    const respon = await axios.put(`${kalender}event/${data.id}/update/`, data.payload, { headers: { Authorization: data.token } })
    return respon?.data.result
})

export const deleteEvent = createAsyncThunk("calendar/deleteEvent", async (data) => {
    const respon = await axios.delete(`${kalender}event/${data.id}/destroy/`, { headers: { Authorization: data.token } })
    return respon?.data
})

export const postSubAgenda = createAsyncThunk("calendar/postSubAgenda", async (data) => {
    const respon = await axios.post(`${kalender}event/agenda/create/`, data.payload, { headers: { Authorization: data.token } })
    return respon
})

export const updateSubAgenda = createAsyncThunk("calendar/updateSubAgenda", async (data) => {
    const respon = await axios.put(`${kalender}event/agenda/${data.id}/update/`, data.payload, { headers: { Authorization: data.token } })
    return respon?.data.result
})

export const deleteSubAgenda = createAsyncThunk("calendar/deleteSubAgenda", async (data) => {
    const respon = await axios.delete(`${kalender}event/agenda/${data.id}/destroy/`, { headers: { Authorization: data.token } })
    return respon?.data.result
})

export const postNotulensi = createAsyncThunk("calendar/postNotulensi", async (data) => {
    let formData = new FormData()
    formData.append('agenda_id', data.agenda_id)
    formData.append('pdf', data.pdf, data.pdf.name)
    const respon = await axios.post(`${kalender}event/agenda/notulensi/create/`, formData, { headers: { Authorization: data.token } })
    return respon?.data
})

export const deleteNotulensi = createAsyncThunk("calendar/deleteNotulensi", async (data) => {
    const respon = await axios.delete(`${kalender}event/agenda/notulensi/${data.id}/destroy/`, { headers: { Authorization: data.token } })
    return respon?.data.result
})

export const readyToApprove = createAsyncThunk("calendar/readyToApprove", async (data) => {
    const body = {
        body: 'approve'
    }
    const respon = await axios.patch(`${kalender}event/agenda/notulensi/${data.id}/ready/`, JSON.stringify(body), { headers: { Authorization: data.token } })
    return respon?.data.result
})

export const postTodo = createAsyncThunk("calendar/postTodo", async (data) => {
    const respon = await axios.post(`${kalender}event/agenda/notulensi/task/create/`, data.payload, { headers: { Authorization: data.token } })
    return respon
})

export const updateTodo = createAsyncThunk("calendar/updateTodo", async (data) => {
    const respon = await axios.put(`${kalender}event/agenda/notulensi/task/${data.id}/update/`, data.payload, { headers: { Authorization: data.token } })
    return respon?.data.result
})

export const deleteTodo = createAsyncThunk("calendar/deleteTodo", async ({ token, id }) => {
    const respon = await axios.delete(`${kalender}event/agenda/notulensi/task/${id}/destroy/`, { headers: { Authorization: token } })
    return respon?.data.result
})


//Kalender
export const getlistKalender = createAsyncThunk(
    "calendar/getlistKalender",
    async (token) => {
        const respon = await axios.get(`${kalender}calendar/?limit=10`, {
            headers: { Authorization: token },
        });
        return respon?.data.results;
    }
);

//komentar
export const postKomenTodo = createAsyncThunk(
    "calendar/postKomenTodo",
    async (data) => {
        const respon = await axios.post(
            `${kalender}event/agenda/notulensi/task/comment/create/`,
            {
                task_id: data.task_id,
                parent_id: data.parent_id,
                message: data.message,
            },
            {
                headers: {
                    Authorization: data.token,
                },
            }
        );
        return {
            newComment: respon?.data.result,
            detailTodo: data.detailTodo,
            parent_id: data.parent_id,
        };
    }
);


//pegawai
export const getPegawai = createAsyncThunk("calendar/getPegawai", async (token) => {
    const respon = await axios.get(`${pegawai}profile/all/?limit=10`, { headers: { Authorization: token } })
    return respon?.data.results
})

export const getDetailPegawai = createAsyncThunk("calendar/getDetailPegawai", async ({ token, nip }) => {
    const respon = await axios.get(`${pegawai}profile/${nip}`, { headers: { Authorization: token } })
    return respon?.data.results
})

//satker
export const getBennerSatker = createAsyncThunk("bridge/getBennerSatker", async (token) => {
    const respon = await axios.get(`${SATKER}satker/benner/`, { headers: { Authorization: token } })
    return respon?.data.results
})

export const getGallerySatker = createAsyncThunk("bridge/getGallerySatker", async (token) => {
    const respon = await axios.get(`${SATKER}satker/gallery/?page=1`, { headers: { Authorization: token } })
    return respon?.data
})

export const getSatkerNews = createAsyncThunk("bridge/getSatkerNews", async (token) => {
    const respon = await axios.get(`${SATKER}satker/news/?page=1`, { headers: { Authorization: token } })
    return respon?.data.results
})

export const getPesan = createAsyncThunk("bridge/getPesan", async (token) => {
    const respon = await axios.get(`${SATKER}satker/pesan/`, { headers: { Authorization: token } })
    return respon?.data.results
})

export const getUltah = createAsyncThunk("bridge/getUltah", async (token) => {
    const respon = await axios.get(`${SATKER}satker/birthday/`, { headers: { Authorization: token } })
    return respon?.data.results
})

export const getSatkerLinimasa = createAsyncThunk("mp/getSatkerLinimasa", async (token) => {
    const respon = await axios.get(`${Linimasa}linimasa/?limit=6&type=satker`, { headers: { Authorization: token } })
    return respon?.data.results
})
export const getDivision = createAsyncThunk(
    "calendar/getDivision",
    async (token) => {
        const respon = await axios.get(`${addressbook}addressbook/division/`, {
            headers: { Authorization: token },
        });
        return respon?.data.results;
    }
);
export const getEmployee = createAsyncThunk(
    "calendar/getEmployee",
    async (token) => {
        const respon = await axios.get(`${addressbook}addressbook/employee/`, {
            headers: { Authorization: token },
        });
        return respon?.data.results;
    }
);
export const getDivisionTree = createAsyncThunk(
    "calendar/getDivisionTree",
    async ({ token, id }) => {
        const respon = await axios.get(`${addressbook}addressbook/tree/${id}/`, {
            headers: { Authorization: token },
        });
        return respon?.data.results;
    }
);

// repository
export const getDocument = createAsyncThunk(
    "repository/getDocument",
    async (token) => {
        const respon = await axios.get(`${repository}my-documents/`, {
            headers: { Authorization: token },
        });
        return respon?.data.result;
    }
);

export const getDetailDocument = createAsyncThunk(
    "repository/getDetailDocument",
    async ({ token, id }) => {
        const respon = await axios.get(`${repository}${id}/document-detail/`, {
            headers: { Authorization: token },
        });
        return respon?.data.result;
    }
);

//profile me

export const getProfileMe = createAsyncThunk(
    "profile/getProfileMe",
    async (token) => {
        const respon = await axios.get(`${profile}me/`, {
            headers: { Authorization: token },
        });
        return respon?.data.results;
    }
);

//banner

export const getBanner = createAsyncThunk("banner/getBanner", async (token) => {
    const respon = await axios.get(`${banner}`, {
        headers: { Authorization: token },
    });
    return respon?.data.results;
});

//galeri

export const getGaleri = createAsyncThunk("galeri/getGaleri", async (token) => {
    const respon = await axios.get(`${galeri}`, {
        headers: { Authorization: token },
    });
    return respon?.data.results;
});

//berita

export const getBerita = createAsyncThunk("berita/getBerita", async (token) => {
    const respon = await axios.get(`${berita}`, {
        headers: { Authorization: token },
    });
    return respon?.data.results;
});

export const getDetailBerita = createAsyncThunk(
    "berita/getDetailBerita",
    async ({ token, id }) => {
        const respon = await axios.get(`${detailBerita}${id}/`, {
            headers: { Authorization: token },
        });
        return respon?.data.results;
    }
);

//mp
export const getLinimasa = createAsyncThunk("mp/getLinimasa", async (token) => {
    const respon = await axios.get(`${Linimasa}linimasa/`, { headers: { Authorization: token } })
    return respon?.data.results
})

export const patchLike = createAsyncThunk("mp/patchLike", async ({ token, id }) => {
    const respon = await axios.patch(`${Linimasa}linimasa/${id}/like/`, undefined, { headers: { Authorization: token } })
    return respon?.data.results
})

export const patchUnlike = createAsyncThunk("mp/patchUnlike", async ({ token, id }) => {
    const respon = await axios.patch(`${Linimasa}linimasa/${id}/unlike/`, undefined, { headers: { Authorization: token } })
    return respon?.data.results
})

export const getDetailLinimasa = createAsyncThunk("mp/getDetailLinimasa", async ({ token, id }) => {
    const respon = await axios.get(`${Linimasa}linimasa/${id}`, { headers: { Authorization: token } })
    return respon?.data.result
})

export const getViewLinimasa = createAsyncThunk("mp/getViewLinimasa", async ({ token, id }) => {
    const respon = await axios.get(`${Linimasa}linimasa/${id}/view/list/`, { headers: { Authorization: token } })
    return respon?.data.results
})

export const postComment = createAsyncThunk("mp/postComment", async (data, setRefresh = undefined) => {
    const respon = await axios.post(`${Linimasa}linimasa/comment/`, data.payload, { headers: { Authorization: data.token } })
    return respon?.data
})

export const getListsLike = createAsyncThunk("mp/getListsLike", async ({ token, id }) => {
    const respon = await axios.get(`${Linimasa}linimasa/${id}/like/list/`, { headers: { Authorization: token } })
    return respon?.data.results
})

//TASK MANAGEMENT
export const getTreeTM = createAsyncThunk("taskmanagement/getTreeTM", async ({ token }) => {
    const respon = await axios.get(`${taskManagement}project/tree/`, { headers: { Authorization: token } })
    return respon?.data.result
})

export const getListDashboardTM = createAsyncThunk("taskmanagement/getListDashboardTM", async ({ token }) => {
    const respon = await axios.get(`${taskManagement}dashboard/list/`, { headers: { Authorization: token } })
    return respon?.data.result
})

export const getListTaskTM = createAsyncThunk("taskmanagement/getListTaskTM", async ({ token, id_list, type }) => {
    const respon = await axios.get(`${taskManagement}list-task/${id_list}/retrieve/`, { headers: { Authorization: token } })
    return {
        data: respon?.data.result,
        type: type
    }
})

export const getDetailTaskTM = createAsyncThunk("taskmanagement/getDetailTaskTM", async ({ token, id_task }) => {
    const respon = await axios.get(`${taskManagement}task/${id_task}/retrieve/`, { headers: { Authorization: token } })
    return respon?.data.result
})

export const postCommentTM = createAsyncThunk("taskmanagement/postCommentTM", async (data, setRefresh = undefined) => {
    const respon = await axios.post(`${taskManagement}comment/create/`, data.payload, { headers: { Authorization: data.token } })
    return respon?.data
})

export const postCategoryTM = createAsyncThunk("calendar/postCategoryTM", async (data) => {
    const respon = await axios.post(`${taskManagement}project/create/`, data.payload, { headers: { Authorization: data.token } })
    return respon?.data
})

//Penilian
export const getListPenilaian = createAsyncThunk("mp/getListPenilaian", async (data) => {
    const respon = await axios.get(`${Linimasa}admin/evaluation/?year=${data.tahun}&quarter=${data.TW}`, { headers: { Authorization: data.token } })
    return respon?.data.results
})

export const getDetailPenilaian = createAsyncThunk("mp/getDetailPenilaian", async ({ token, id }) => {
    const respon = await axios.get(`${Linimasa}admin/evaluation/${id}`, { headers: { Authorization: token } })
    return respon?.data.result
})

export const getNilai = createAsyncThunk("mp/getNilai", async ({ token }) => {
    const respon = await axios.get(`${Linimasa}admin/category/?limit=10&type=penilai`, { headers: { Authorization: token } })
    return respon?.data.results
})

export const putAddApprove = createAsyncThunk("mp/putAddApprove", async ({ token, id, body }) => {
    const respon = await axios.put(`${Linimasa}admin/evaluation/${id}/score/`, body, { headers: { Authorization: token } })
    return respon?.data.result
})

export const putCancelApprove = createAsyncThunk("mp/putCancelApprove", async ({ token, id, body }) => {
    const respon = await axios.put(`${Linimasa}admin/evaluation/${id}/score/cancel/`, body, { headers: { Authorization: token } })
    return respon?.data.result
})

export const putTakeDown = createAsyncThunk("mp/putTakeDown", async ({ token, id }) => {
    // const respon = await axios.put(`${Linimasa}admin/evaluation/${id}/cancel/`, { headers: { Authorization: token } })
    const respon = await fetch(`${Linimasa}admin/evaluation/${id}/cancel/`, { method: 'put', headers: { Authorization: token } })
    return respon?.data
})