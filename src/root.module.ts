import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { RootRoutingModule } from '@src/root-routing.module';

import { PrimeToastModule } from '@shared/modules/primeng-toast.module';

import { RootComponent } from '@src/root.component';

@NgModule({
	imports: [CommonModule, BrowserModule, BrowserAnimationsModule, HttpClientModule, HttpClientJsonpModule, PrimeToastModule, RootRoutingModule],
	declarations: [RootComponent],
	providers: [],
	bootstrap: [RootComponent]
})
export class RootModule {}