// апишка нашего проекта
import { ApiListResponse, Api } from './base/api'; // импортируем класс Апи, который отвечает за запросы гет, пост
// импортируем типы, они у нас описывают то, что приходит с сервера
import { ICard, IUser, ICardList, IOrderResult } from '../types/index';

// интерфейс описывает наши методы запросов , получить список карточек, получить одну карточку и тд
interface ILarekAPI {
	getCardList: () => Promise<ICard[]>;
	orderLots: (order: IUser) => Promise<IOrderResult>;
}
export class LarekAPI extends Api implements ILarekAPI {
	// наследует класс Апи, в котором у нас сами запросы к серверу
	readonly cdn: string;
	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}
	// всех карточек
	getCardList(): Promise<ICard[]> {
		return this.get('/product').then((data: ApiListResponse<ICard>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}
	// одну карточку

	getCardItem(id: string): Promise<ICard> {
		return this.get(`/product/${id}`).then((item: ICard) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}
	orderLots(order: IUser): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}
