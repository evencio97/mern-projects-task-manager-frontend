import { axiosClient, headers } from '../config/axios';

export async function CreateTaskService(id, data, token) {
    try {
        const url= "/project/"+id+"/task";
        let response= await axiosClient.post(url, data, { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        if (!('task' in response.data)) throw new Error()
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export async function UpdateTaskService(proId, id, data, token) {
    try {
        const url= "/project/"+proId+"/task/"+id;
        let response= await axiosClient.put(url, data, { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        if (!('task' in response.data)) throw new Error()
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export async function DeleteTaskService(proId, id, token) {
    try {
        const url= "/project/"+proId+"/task/"+id;
        let response= await axiosClient.delete(url, { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export async function GetTaskService(proId, id, token) {
    try {
        const url= "/project/"+proId+"/task/"+id;
        let response= await axiosClient.get(url, { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        if (!('task' in response.data)) throw new Error();
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export async function GetAllTaskService(proId, token, page=1) {
    try {
        const url= "/project/"+proId+"/tasks?page="+page;
        let response= await axiosClient.get(url, { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        if (!('tasks' in response.data)) throw new Error();
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export default {
    CreateTaskService,
    UpdateTaskService,
    DeleteTaskService,
    GetTaskService,
    GetAllTaskService,
};