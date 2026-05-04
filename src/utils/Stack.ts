export default class Stack<T> {

    private elements: T[] = [];

    constructor() {

    }

    public push(obj: T) {
        this.elements.push(obj);
    }

}