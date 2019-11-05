// tslint:disable: triple-equals
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { createHostListener } from '@angular/compiler/src/core';

@Injectable()
export class Cart {
    public lines: CartLine[] = [];
    public itemCount: number = 0;
    public cartPrice = 0;

    addLine(product: Product, quantity: number= 1) {
        const line = this.findLine(product);
        if (line != undefined) {
            line.quantity += quantity;
        } else {
            this.lines.push(new CartLine(product, quantity));
        }

        this.recalculate();
    }

    updateQuantity(product: Product, quantity: number) {
        const line = this.findLine(product);

        if (line != undefined) {
            line.quantity = Number(quantity);
        }
        this.recalculate();
    }

    removeLine(id: number) {
        const index = this.lines.findIndex(line => line.product.id == id);
        this.lines.splice(index, 1);
        this.recalculate();
    }

    clear() {
        this.lines = [];
        this.itemCount = 0;
        this.cartPrice = 0;
    }

    private recalculate() {
        this.itemCount = 0;
        this.cartPrice = 0;
        this.lines.forEach(l => {
            this.itemCount += l.quantity;
            this.cartPrice += (l.quantity * Number(l.product.price));
        });
    }

    public findLine(product: Product) {
        // tslint:disable: triple-equals
        const line = this.lines.find(l => l.product.id == product.id);
        return line == undefined ? undefined : line;
    }
}

export class CartLine {
    constructor(public product: Product, public quantity: number) {

    }

    get lineTotal() {
        return this.quantity * Number(this.product.price);
    }
}
