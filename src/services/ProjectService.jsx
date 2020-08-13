import { axiosClient, headers } from '../config/axios';

export async function CreateProjectService(data, token) {
    try {
        let response= await axiosClient.post("/project", data, { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        if (!('project' in response.data)) throw new Error()
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export async function UpdateProjectService(id, data, token) {
    try {
        let response= await axiosClient.put("/project/"+id, data, { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        if (!('project' in response.data)) throw new Error()
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export async function DeleteProjectService(id, token) {
    try {
        let response= await axiosClient.delete("/project/"+id, { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export async function GetProjectService(id, token) {
    try {
        let response= await axiosClient.get("/project/"+id, { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        if (!('project' in response.data)) throw new Error();
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export async function GetAllProjectsService(token, page=1) {
    try {
        let response= await axiosClient.get("/projects?page="+page, { headers: { ...headers, Authorization: token } });
        // Validate response
        if (response.status !== 200) throw new Error();
        if (!('projects' in response.data)) throw new Error();
        return response.data;
    } catch (error) {
        return "response" in error? error.response.data:{ error: true, errorCode: "serverError" };
    }
}

export default {
    CreateProjectService,
    UpdateProjectService,
    DeleteProjectService,
    GetProjectService,
    GetAllProjectsService,
};