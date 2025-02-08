import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';  // ✅ Import CommonModule

interface BlocState<D = any, E = any> {
	data: D | null;
	loading: boolean;
	error: E | null;
}

@Component({
	selector: 'bloc-builder',
	standalone: true,  // ✅ Standalone component
	imports: [CommonModule],  // ✅ Add CommonModule to use *ngIf and json pipe
	template: `
		<ng-container *ngIf="state.loading">Loading...</ng-container>
		<ng-container *ngIf="state.error">Error: {{ state.error | json }}</ng-container>
		<ng-container *ngIf="state.data && !state.error">{{ state.data | json }}</ng-container>
	`,
})
export class BlocBuilderComponent implements OnInit, OnDestroy {
	@Input() subject!: Observable<any>;
	@Input() initialValue?: any;

	state: BlocState = {
		data: this.initialValue || null,
		loading: this.initialValue === undefined,
		error: null,
	};

	private subscription!: Subscription;

	ngOnInit() {
		this.subscription = this.subject.subscribe({
			next: (data: any) => {
				this.state = { data, loading: false, error: null };
			},
			error: (error: any) => {
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
