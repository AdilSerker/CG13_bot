export class Queue<T> {
    private elements: Map<number, T>;
    private head: number;
    private tail: number;

    constructor() {
        this.elements = new Map;
        this.head = 0;
        this.tail = 0;
    }

    get length() {
        return this.tail - this.head;
    }

    get isEmpty() {
        return this.length === 0;
    }

    enqueue(element: T) {
        this.elements.set(this.tail, element);
        this.tail++;
    }

    dequeue() {
        const item = this.elements.get(this.head);
        this.elements.delete(this.head);
        this.head++;
        return item;
    }

    peek() {
        return this.elements.get(this.head);
    }

    toArray(): T[] {
        return Array.from(this.elements.values());
    }
}
