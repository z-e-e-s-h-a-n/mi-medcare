import apiClient, { executeApi } from "@lib/http/api-client";


export const createUser = (data: CUUserType) => {
    return executeApi<UserResponse>(() => apiClient.post("/admin/users", data));
};


export const findAllUsers = (params?: UserQueryType) => {
    return executeApi<UserQueryResponse>(() =>
        apiClient.get("/admin/users", { params })
    );
};
