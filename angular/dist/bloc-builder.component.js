import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function BlocBuilderComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1, "Loading...");
    i0.ɵɵelementContainerEnd();
} }
function BlocBuilderComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "json");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Error: ", i0.ɵɵpipeBind1(2, 1, ctx_r0.state.error), "");
} }
function BlocBuilderComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "json");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.state.data));
} }
export class BlocBuilderComponent {
    constructor() {
        this.state = {
            data: this.initialValue || null,
            loading: this.initialValue === undefined,
            error: null,
        };
    }
    ngOnInit() {
        this.subscription = this.subject.subscribe({
            next: (data) => {
                this.state = { data, loading: false, error: null };
            },
            error: (error) => {
                this.state = { data: null, loading: false, error };
            },
            complete: () => {
                this.state.loading = false;
            }
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
BlocBuilderComponent.ɵfac = function BlocBuilderComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BlocBuilderComponent)(); };
BlocBuilderComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BlocBuilderComponent, selectors: [["bloc-builder"]], inputs: { subject: "subject", initialValue: "initialValue" }, decls: 3, vars: 3, consts: [[4, "ngIf"]], template: function BlocBuilderComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BlocBuilderComponent_ng_container_0_Template, 2, 0, "ng-container", 0)(1, BlocBuilderComponent_ng_container_1_Template, 3, 3, "ng-container", 0)(2, BlocBuilderComponent_ng_container_2_Template, 3, 3, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.state.loading);
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.state.error);
        i0.ɵɵadvance();
        i0.ɵɵproperty("ngIf", ctx.state.data && !ctx.state.error);
    } }, dependencies: [CommonModule, i1.NgIf, i1.JsonPipe], encapsulation: 2 });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BlocBuilderComponent, [{
        type: Component,
        args: [{
                selector: 'bloc-builder',
                standalone: true, // ✅ Standalone component
                imports: [CommonModule], // ✅ Add CommonModule to use *ngIf and json pipe
                template: `
		<ng-container *ngIf="state.loading">Loading...</ng-container>
		<ng-container *ngIf="state.error">Error: {{ state.error | json }}</ng-container>
		<ng-container *ngIf="state.data && !state.error">{{ state.data | json }}</ng-container>
	`,
            }]
    }], null, { subject: [{
            type: Input
        }], initialValue: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BlocBuilderComponent, { className: "BlocBuilderComponent", filePath: "bloc-builder.component.ts", lineNumber: 21 }); })();
