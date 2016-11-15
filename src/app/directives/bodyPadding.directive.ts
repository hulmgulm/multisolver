import { Directive, ElementRef, Renderer, HostListener, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[body_padding]'
})
export class BodyPaddingDirective implements AfterViewInit {

    private _elementRef: ElementRef;
    private _renderer: Renderer;
    private _navbarContainer: any;
    private _navbarLinks: any;
    private _padding: number = -1;

    constructor(elementRef: ElementRef, renderer: Renderer) {
        this._elementRef = elementRef;
        this._renderer = renderer;
        this._navbarContainer = document.getElementById("navbar-container");
        this._navbarLinks = document.getElementById("navbar-links");
        this.onResize();
    }

    ngAfterViewInit() {
        this.onResize();
    }

    @HostListener('window:resize', ['$event.target'])
    onResize() {

        let tmpPadding:number = this.getSize(this._navbarContainer.clientHeight, this._navbarLinks.clientHeight);

        if (this._padding !== tmpPadding) {
            this._padding = tmpPadding;
            this._renderer.setElementStyle(this._elementRef.nativeElement, 'padding-top', this._padding.toString());
        }
    }

    private getSize(container: number, links: number):number {

        let offset:number = 10;

        if (container === links) {
            return container + offset;
        }

        return (container - links) + offset;
    }
}