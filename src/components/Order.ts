import { Form } from './common/Form';
import { IUser } from '../types';
import { EventEmitter, IEvents } from './base/events';
import { ensureElement, ensureAllElements } from '../utils/utils';

// формы заказа
export class Order extends Form<IUser> {
	_btnCollection: HTMLElement[];
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
				btn.addEventListener('click', () => {
					events.emit('payment:change', {
						field: 'payment',
						value: btn.textContent,
					});
				});
			});
		}

		if (this._submit) {
			this._submit.addEventListener('click', (e) => {
				if (e.target == container.querySelector('.order__button')) {
					events.emit('contacts:open');
				}
			});
		}
	}

	//     set address (value: string) {
	//     (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
	// }
	//     set phone(value: string) {
	//         (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
	//     }

	//     set email(value: string) {
	//         (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
	//     }
}
