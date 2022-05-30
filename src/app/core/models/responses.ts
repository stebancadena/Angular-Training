import { IProduct } from "./product";

export interface IResponse{
    pageNumber: number,
    pageSize: number,
    firstPage: string,
    lastPage: string,
    totalPages: number,
    totalRecords: number,
    nextPage: string,
    previousPage: string,
    data: IProduct[],
    message: number,
    succeeded: boolean,
    erros: string
}