import { OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
interface BlocState<D = any, E = any> {
    data: D | null;
    loading: boolean;
    error: E | null;
}
export declare class BlocBuilderComponent implements OnInit, OnDestroy {
    subject: Observable<any>;
    initialValue?: any;
    state: BlocState;
    private subscription;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BlocBuilderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BlocBuilderComponent, "bloc-builder", never, { "subject": { "alias": "subject"; "required": false; }; "initialValue": { "alias": "initialValue"; "required": false; }; }, {}, never, never, true, never>;
}
export {};
