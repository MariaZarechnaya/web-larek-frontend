
import { IEvents } from "../components/base/events";

interface ICard {
    id: string,
    category: string;
    name: string;
    text:string;
    link:string;
    price:number | null;
}
type Pay = 'Онлайн'| 'Наличные'

interface IUser {
    paymentType: Pay;
    adress:string;
    email:string;
    phone:string;
}

interface ICardList  {
    total:number;
    cards: ICard[]  
    preview: string | null 
}
interface IBasket {
    items: Map <string, number>
    sum:number
}

type basketCard = Pick <ICard,"id"|"name"|"price">  
type previewCard = Pick <ICard, "category"|"name"| "link"|"price" >

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';


interface IFormState {
    valid: boolean;
    errors: string[];
}
