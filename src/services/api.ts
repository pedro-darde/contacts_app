import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from "axios";
import { Alert } from "react-native";

export type PrimitiveDate<Type> = {
  [Key in keyof Type]: Type[Key] extends Date ? string : Type[Key];
};

interface IPrimitiveData {
  id: number;
}

export interface IPaginationFilter {
  top: number;
  skip: number;
}

class BaseService {
  private axiosClient: AxiosInstance;
  constructor() {
    this.axiosClient = axios.create({
      baseURL: "http://192.168.15.14:3333/",
    });

    // Quando (e se) houver autenticação por JWT, pode-se usar.
    // this.axiosClient.interceptors.request.use(async config => {
    //     const token = await this.getToken();
    //     if (token) {
    //       config.headers.Authorization = `Bearer ${token}`;
    //     }
    //     console.log(config);
    //     return config;
    //   });
  }

  public get<Type>(
    modelName: string,
    query?: any
  ): Promise<AxiosResponse<Type>> {
    return this.axiosClient.get(`${modelName}`, {
      params: query,
    });
  }

  public getById<Type extends IPrimitiveData>(
    modelName: string,
    route: string,
    id: number
  ): Promise<AxiosResponse<Type>> {
    return this.axiosClient.get(`${modelName}/${route}/${id}`);
  }

  public post<Type, Response>(
    modelName: string,
    data: Type,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>> {
    return this.axiosClient.post(`${modelName}`, data, config);
  }

  public patch<Type, Response>(
    modelName: string,
    id: string,
    data: Type
  ): Promise<AxiosResponse<Response>> {
    return this.axiosClient.patch(`${modelName}/${id}`, data);
  }

  public delete<Type>(
    modelName: string,
    id: number,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>> {
    return this.axiosClient.delete(`${modelName}/${id}`, config);
  }

  //   public async getToken() {
  //     if (await AsyncStorage.getItem("userLogado")) {
  //       let userLogado = await AsyncStorage.getItem("userLogado");
  //       return JSON.parse(userLogado!);
  //     }
  //     return "";
  //   }

  //   public async getUserLoggedId() {
  //     const user = await AsyncStorage.getItem("userLogado");

  //     return user ? JSON.parse(user!) : "";
  //   }
}

const baseService = new BaseService();

export { baseService };
