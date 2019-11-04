import { Injectable } from '@angular/core';
import {  Product} from './product.model';
// import { StaticDataSource} from './static.datasource';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class ProductRepository {
    private  products: Product[] = [];
    private categories: string[] = [];

    constructor(private dataSource: RestDataSource) {
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

    saveProduct(product: Product) {
        if (product.id == null || product.id == 0) {
            this.dataSource.saveProduct(product).subscribe(p => this.products.push(p));
        } else {
            this.dataSource.updateProduct(product).subscribe(p => {
                this.products.splice(this.products.findIndex(p => p.id == product.id), 1, product);
            });
        }
    }

    deleteProduct(id: number | string) {
        this.dataSource.deleteProduct(id).subscribe(p => {
            this.products.splice(this.products.findIndex(p => p.id == id), 1);
        });
    }
}
