import { Form } from './common/Form';
import { IUser } from '../types';
import { EventEmitter, IEvents } from './base/events';
import { ensureElement, ensureAllElements } from '../utils/utils';

// формы заказа
export class Order extends Form<IUser> {
	_btnCollection: HTMLButtonElement[];
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._btnCollection = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			container
		);

		if (this._btnCollection) {
			this._btnCollection.forEach((btn) => {
				btn.addEventListener('click', (e) => {
					events.emit('payment:change', {
						field: 'payment',
						value: btn.textContent,
					});
					let button = e.target as HTMLButtonElement;
					this.changeClass(button.name);
				});
			});
		}

		if (this._submit) {
			this._submit.addEventListener('click', (e) => {
				if (e.target == container.querySelector('.order__button')) {
					events.emit('contacts:open');
					this.changeClass();
				}
			});
		}
	}

	changeClass(name?: string) {
		this._btnCollection.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === name);
		});
	}
}
