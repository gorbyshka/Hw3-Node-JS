import * as fs from 'fs';
import * as path from 'path';
import { Transform } from 'stream';
import { EventData } from './types/EventData';

// Exercise №1

const inputFilePath = path.join(__dirname, 'docs', 'input.txt');
const outputFilePath = path.join(__dirname, 'docs', 'output.txt');

const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf-8' });
const writeStream = fs.createWriteStream(outputFilePath, { encoding: 'utf-8' });

class UpperCaseTransform extends Transform {

    _transform(chunk: any, encoding: string, callback: Function) {

        const upperCaseData = chunk.toString().toUpperCase();
        callback(null, upperCaseData);

    }

}

const transformStream = new UpperCaseTransform();

readStream.pipe(transformStream).pipe(writeStream);

console.log('App mouting end!!!');


// Exercise №2

class EventEmitter {

    private events: { [key: string]: Function[] };

    constructor() { this.events = {}; }


    on(eventName: string, listener: Function): void {

        if (!this.events[eventName]) this.events[eventName] = [];

        this.events[eventName].push(listener);
    }

    emit(eventName: string, data: EventData): void {

        const eventListeners = this.events[eventName];

        if (eventListeners) eventListeners.forEach(listener => { listener(data); });

    }

}

const eventEmitter = new EventEmitter();

eventEmitter.on('buy', (data: EventData) => console.log('Покупка товару:', data));

eventEmitter.on('addToCart', (data: EventData) => console.log('Додано товар до кошика:', data));

eventEmitter.on('removeFromCart', (data: EventData) => console.log('Видалено товар з кошика:', data));

eventEmitter.on('checkout', (data: EventData) => console.log('Оформлення замовлення:', data));

eventEmitter.emit('buy', { price: 10, addToCart: true, deleted: true, saled: false });
eventEmitter.emit('addToCart', { price: 20, addToCart: true, deleted: false, saled: false });
eventEmitter.emit('removeFromCart', { price: 10, addToCart: false, deleted: true, saled: false });
eventEmitter.emit('checkout', { price: 30, addToCart: false, deleted: false, saled: true });
