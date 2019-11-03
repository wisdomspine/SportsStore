import { Directive, ViewContainerRef, TemplateRef, Input, Attribute, SimpleChanges } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[counterOf]'
})

export class CounterDirective {
    constructor(private container: ViewContainerRef, private template: TemplateRef<Object>) {

    }

    @Input('counterOf')
    counter: number;

    // tslint:disable-next-line: use-lifecycle-interface
    ngOnChanges(changes: SimpleChanges) {
        this.container.clear();

        for (let i = 0; i < this.counter; ++i) {
            console.log(this.container);
            this.container.createEmbeddedView(this.template, new CounterDirectiveContext(i + 1));
        }
    }
}

class CounterDirectiveContext {
    constructor(public $implicit: any) {

    }
}
