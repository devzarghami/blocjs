import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

interface BlocState<D, E> {
	data: D | null;
	loading: boolean;
	error: E | null;
}

@Component({
	selector: 'bloc-builder',
	template: `
    <ng-container *ngIf="state.loading">Loading...</ng-container>
    <ng-container *ngIf="state.error">Error: {{ state.error | json }}</ng-container>
    <ng-container *ngIf="state.data && !state.error">{{ state.data | json }}</ng-container>
  `,
})
export class BlocBuilderComponent<D, E> implements OnInit, OnDestroy {
	@Input() subject!: Observable<D>;
	@Input() initialValue?: D;

	state: BlocState<D, E> = {
		data: this.initialValue || null,
		loading: this.initialValue === undefined,
		error: null,
	};

	private subscription!: Subscription;

	ngOnInit() {
		this.subscription = this.subject.subscribe({
			next: (data: D) => {
				this.state = { data, loading: false, error: null };
			},
			error: (error: E) => {
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
