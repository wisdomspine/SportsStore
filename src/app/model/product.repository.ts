import { Injectable } from '@angular/core';
import {  Product} from './product.model';
import { StaticDataSource} from './static.datasource';

@Injectable()
export class ProductRepository {
    private  products: Product[] = [];
    private categories: string[] = [];

    constructor(private dataSource: StaticDataSource) {
        dataSource.getProducts().subscribe(data => {
            this.products = data;
            this.categories = data.map(p => p.category).filter((c, index, array) =>
                array.indexOf(c) === index ).sort();
        });
    }

    getProduct(id: number): Product {
        return this.products.find(p => p.id == id); // tslint:disable-line: triple-equals
    }

    getProducts(category: string = null): Product[] {
        // tslint:disable-next-line: triple-equals
        return this.products.filter(p => category == null || category == p.category);
    }

    getCategories(): string[] {
        return this.categories;
    }
}
