

export interface ICard {
    id: string,
    category: string;
    title: string;
    description:string;
    image:string;
    price:number | null;

}

export  interface IUser {
    payment: string;
    address:string;
    email:string;
    phone:string;
    items:string[]
    total: number
    
}
export interface IOrderForm {
    payment?: string;
    email: string;
    phone: string;
    address:string
}


export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

export  interface ICardList  {
    total:number;
    cards: ICard[]  
    preview: string | null 
}



export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';


export interface IFormState {
    valid: boolean;
    errors: string[];
}

export interface IAppState {
    catalog: ICard[];
    basket: string[];
    preview: string | null;
    order: IUser;
    loading: boolean;
}
export interface IOrderResult {
    id: string;
    total: number
}