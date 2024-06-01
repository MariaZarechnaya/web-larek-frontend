import { Component } from './base/Component';
import { ICard } from '../types';
import { bem, createElement, ensureElement } from '../utils/utils';
import { EventEmitter } from './base/events';

interface ICardActions {
	onClick?: (event: MouseEvent) => void;
}

export interface ICardView<T> {
	id: string;
	category?: string;
	title: string;
	description?: string;
	image?: string;
	price: number | null;
	// status:boolean
}
//  разметка нашей карточки и методы ее наполнения
export class Card<T> extends Component<ICardView<T>> {
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _description?: HTMLElement;
	protected _price: HTMLElement;
	protected _button?: HTMLButtonElement;
	// status : boolean;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(container); // контейнером будет card-catalog по идее
		// this.status = false
		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._category = container.querySelector(`.${blockName}__category`);
		this._image = ensureElement<HTMLImageElement>(
			`.${blockName}__image`,
			container
		);
		this._button = container.querySelector(`.${blockName}__button`);
		this._description = container.querySelector(`.${blockName}__text`);
		this._price = container.querySelector(`.${blockName}__price`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}
	set price(value: number) {
		if (typeof value !== 'number') {
			this.setText(this._price, ' Бесценно');
		}
		if (typeof value == 'number') {
			this.setText(this._price, value + ' синапсов');
		}
	}
	get price(): string {
		return this._title.textContent || '';
	}
	set category(value: string) {
		this.setText(this._category, value);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set description(value: string | string[]) {
		if (Array.isArray(value)) {
			this._description.replaceWith(
				...value.map((str) => {
					const descTemplate = this._description.cloneNode() as HTMLElement;
					this.setText(descTemplate, str);
					return descTemplate;
				})
			);
		} else {
			this.setText(this._description, value);
		}
	}
	changeButton() {
		this._button.textContent = 'Добавлен в корзину';
	}
}

export class ProductItem extends Card<HTMLElement> {
	constructor(container: HTMLElement, actions?: ICardActions) {
		super('card', container, actions);
	}
}
// карточка корзины
export class BasketCard<T> extends Component<ICardView<T>> {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _listNumber: HTMLElement;
	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._button = container.querySelector(`.${blockName}__button`);
		this._price = container.querySelector(`.${blockName}__price`);
		this._listNumber = container.querySelector('.basket__item-index');

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}
	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}
	set listNumber(value: number) {
		this.setText(this._listNumber, value);
	}
	set(value: string) {
		this.setText(this._price, value);
	}
	get price(): string {
		return this._title.textContent || '';
	}
	set price(value: number) {
		if (typeof value !== 'number') {
			this.setText(this._price, 'Бесценно');
		}
		if (typeof value == 'number') {
			this.setText(this._price, value + ' синапсов');
		}
	}
}
