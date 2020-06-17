import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, AxiosPromise } from 'axios';

export interface BaseHttpClientParams {
    axios: AxiosRequestConfig;
}

export class HttpClient {
    public axios: AxiosInstance;

    constructor(params: AxiosRequestConfig) {
        this.axios = axios.create(params);

        this.axios.interceptors.request.use(
            this.actionsBeforeRequestSending.bind(this),
            this.actionsAfterRequestError.bind(this));

        this.axios.interceptors.response.use(
            this.actionsBeforeResponseHandle.bind(this),
            this.actionsAfterResponseError.bind(this));
    }

    public post<T = any>(url: string, data: any = {}, config: AxiosRequestConfig = { data: {} }): AxiosPromise<T> {
        return this.axios.post.apply(this, arguments);
    }

    public put<T = any>(url: string, data: any = {}, config: AxiosRequestConfig = { data: {} }): AxiosPromise<T> {
        return this.axios.put.apply(this, arguments);
    }

    public get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
        return this.axios.get.apply(this, arguments);
    }

    public delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
        return this.axios.delete.apply(this, arguments);
    }

    public actionsBeforeRequestSending(config: AxiosRequestConfig): AxiosRequestConfig {

        return config;
    }

    public actionsAfterRequestError(error: AxiosError) {

        return Promise.reject(error);
    }

    public actionsBeforeResponseHandle(response: AxiosResponse): AxiosResponse {

        return response;
    }

    public actionsAfterResponseError(error: AxiosError) {
        if (error.response) {
            console.log('yesy');
            console.error(
                `${error}
                Method: ${error.response.config.method}
                Url: ${error.response.config.url}
                Response data: ${JSON.stringify(error.response.data)}`
            );
        } else {
            console.info(`Method: ${error.config.method}\nUrl: ${error.config.url}`);
        }
        return Promise.reject(error);
    }
}