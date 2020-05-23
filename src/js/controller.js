let _instance = null;
export default class Controller {
    static get instance() {
        return _instance ? _instance : _instance = new Controller();
    }

    constructor() {
        this._shoppingList = [];
        this._core = {
            subscribers: [],
        };
        //this.loadShoppingList();
        window.Controller = this; //for debugging purposes
    }
    get shoppingList() {
        return this._shoppingList;
    }

    editShoppingList(data) {
        this._shoppingList = data;

        this._core.subscribers && this.emit();
    }
    //   editShoppingList(prop, value) {
    //     this._shoppingList[prop] = value;
    //   }
    //   foo(prop, value) {
    //     let todo = 1 + value; //some logic here
    //     this.editShoppingList(prop, todo);
    //   }
    emit() {
        this._core.subscribers.forEach(subscriber =>
            subscriber.next(this._core)
        );
    }
    emit() {
        this._core.subscribers.forEach(component => {
            typeof component.next === 'function' &&
                component.next(this._core);
        });
    }
    subscribe(component) {
        console.log("component name",component);
        !this._core.subscribers.includes(component) &&
            this._core.subscribers.push(component);
    }
    unsubscribe(component) {
        this._core.subscribers.includes(component) &&
            this._core.subscribers.splice(this._core.subscribers.indexOf(component), 1);
    }

}