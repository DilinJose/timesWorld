import { instance } from "./instance";

export const getData = (url: string) => instance.get(url)
export const postData = (url: string, data: any) => instance.post(url, data)
export const putData = (url: string, data: any) => instance.put(url, data)
export const deleteData = (url: string) => instance.delete(url)