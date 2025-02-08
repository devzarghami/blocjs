import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlocBuilderComponent } from './bloc-builder.component'; // ✅ Import component

@NgModule({
    imports: [CommonModule, BlocBuilderComponent],
    exports: [BlocBuilderComponent]
})
export class BlocModule {}
