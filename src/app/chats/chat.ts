import { IEUserData } from "../signup/signup";

export interface IEMessage{
    _id?:string,
    text:string,
    owner:string,
    room:string,
    msgOwner:IEUserData[]
}
