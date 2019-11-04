import { Component } from '@angular/core';
import { Order } from '../model/order.model';
import { OrderRepository } from '../model/order.repository';

@Component({
    templateUrl: 'orderTable.component.html'
})

export class OrderTableComponent {
    onlyShipped = false;
    constructor(private repository: OrderRepository) {

    }

    getOrders(): Order[] {
        if (this.onlyShipped) {
            return this.repository.getOrders().filter(order => order.shipped);
        } else {
            return this.repository.getOrders();
        }
    }

    deleteOrder(id: number | string) {
        this.repository.deleteOrder(id);
    }

    markShipped(order: Order) {
        order.shipped = true;
        this.repository.updateOrder(order);
    }
}
