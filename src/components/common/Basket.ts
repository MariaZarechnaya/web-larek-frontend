import {Component} from "../base/Component";
import {cloneTemplate, createElement, ensureElement} from "../../utils/utils";
import {EventEmitter} from "../base/events";

interface IBasketView {
    items: HTMLElement[];
    total: number; // общая сумма

}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement; // для вывода списка
    protected _total: HTMLElement; // элемент куда общую сумму выводим
    protected _button: HTMLElement; // кнопка оформить

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.basket__button');

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('order:open'); // инициируем открытие формы 
            });
        }

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
            this.setDisabled(this._button, false);
        } else {
            this.setDisabled(this._button, true);
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    set total(total: number) {
        this.setText(this._total, total + ' синапсов');
    }
}