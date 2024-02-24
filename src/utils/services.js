import axios from 'axios';

export const GetApiRequest = async ({ url, dispatch, success }) => {
    console.log(url, "===>URL");
    let token = localStorage.getItem('token');
    try {
        let resData = await axios({
            method: 'get',
            url: url,
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
            }
        }).then(function (response) {
            return response?.data
        });

        dispatch({
            type: success,
            payload: resData
        });
    } catch (e) {
        if (e.response.data.status == "Unauthorized") {
            localStorage.removeItem("token");
            window.location.reload();
        }
        console.log(e, success);
    }
}

export const PostApiRequest = async ({ url, body, dispatch, success }) => {
    console.log(url, "===>URL");
    console.log(body, "====>>>body");
    try {
        let token = localStorage.getItem('token');
        let resData = await axios({
            method: 'post',
            url: url,
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
            },
            data: body
        }).then(function (response) {
            return response?.data;
        });

        dispatch({
            type: success,
            payload: resData
        });
    } catch (e) {
        console.log(e, success);
        if (e.response.data.status == "Unauthorized") {
            localStorage.removeItem("token");
            window.location.reload();
        }
    }
};


export const PostApiRequestFileUpload = async ({ url, body, dispatch, success }) => {
    try {
        let token = localStorage.getItem('token');
        let resData = await axios({
            method: 'post',
            url: url,
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + token,
            },
            data: body
        }).then(function (response) {
            return response?.data;
        });

        dispatch({
            type: success,
            payload: resData
        });
    } catch (e) {
        console.log(e, success);
        if (e.response.data.status == "Unauthorized") {
            localStorage.removeItem("token");
            window.location.reload();
        }
    }
};


export const DeleteApiRequest = async ({ url, body, dispatch, success }) => {
    try {
        let token = localStorage.getItem('token');
        let resData = await axios({
            method: 'delete',
            url: url,
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
            },
            data: body
        }).then(function (response) {
            return response?.data;
        });

        dispatch({
            type: success,
            payload: resData
        });
    } catch (e) {
        console.log(e, success);
        if (e.response.data.status == "Unauthorized") {
            localStorage.removeItem("token");
            window.location.reload();
        }
    }
};