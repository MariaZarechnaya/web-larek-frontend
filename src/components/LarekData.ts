import { Model } from './base/Model';
import { ICard, IUser, IAppState, IOrderForm, FormErrors } from '../types';

export class CardItem extends Model<ICard> {
	id: string;
	category: string;
	title: string;
	description: string;
	image: string;
	price: number;
	status: string;
}
// отдельный  тип для описания каталога.
export type CatalogChangeEvent = {
	catalog: CardItem[];
};
// даннве приложения
export class AppState extends Model<IAppState> {
	basket: CardItem[] = [];
	basketTotal: number;
	catalog: CardItem[];
	// loading: boolean;
	order: IUser = {
		payment: '',
		email: '',
		phone: '',
		address: '',
		total: 0,
		items: [],
	};
	preview: string;
	formErrors: FormErrors = {};
	// методы
	// заполнить каталог
	setCatalog(items: ICard[]) {
		this.catalog = items.map((item) => new CardItem(item, this.events));
		this.emitChanges('items:changed', { catalog: this.catalog });
	}
	// заполнить корзину
	setBasket(item: CardItem) {
		if (item) {
			this.basket.push(item);
		}
	}
	// очистка корзины
	clearBasket() {
		this.basket.forEach((el) => {
			this.emitChanges('basket:delete-card', el);
		});
	}
	// очистка товаров в заказе
	clearItems() {
		this.order.items = [];
	}
	// установка товаров в заказ
	setItems(item: ICard) {
		if (typeof item.price !== 'number') {
			return;
		}
		this.order.items.push(item.id);
		// console.log(this.order.items)
	}
	// получить корзину
	getBasket() {
		return this.basket;
	}
	// проверка на одинаковую карточку
	checkCard(id: string) {
		if (this.basket.length) {
			return this.basket.some((el) => el.id === id);
		}
		return false;
	}
	// установить карточку, которую мы будем превьюшить, открывать подробную информацию
	setPreview(item: CardItem) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}
	// удаление товара из корзины
	removeFromBasket(id: string) {
		this.basket = this.basket.filter((el) => el.id !== id);
	}
	// получить общую сумму
	getTotal() {
		let number = 0;
		this.basket.map((item) => {
			number = number + item.price;
			return number;
		});
		return number;
	}

	// общее количество товаров в корзине
	getBasketNumber() {
		return this.basket.length;
	}
	// наполнение заказа
	setOrderField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;
		this.order.total = this.getTotal();
		this.validateOrder();
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.payment) {
			errors.payment = 'Выберите способ оплаты';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
