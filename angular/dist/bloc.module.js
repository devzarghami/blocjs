import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlocBuilderComponent } from './bloc-builder.component'; // ✅ Import component
import * as i0 from "@angular/core";
export class BlocModule {
}
BlocModule.ɵfac = function BlocModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BlocModule)(); };
BlocModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: BlocModule });
BlocModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, BlocBuilderComponent] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BlocModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, BlocBuilderComponent],
                exports: [BlocBuilderComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BlocModule, { imports: [CommonModule, BlocBuilderComponent], exports: [BlocBuilderComponent] }); })();
