import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { RootRoutingModule } from '@src/root-routing.module';

import { PrimeToastModule } from '@shared/modules/primeng-toast.module';

import { RootComponent } from '@src/root.component';
import { ErrorPageComponent } from '@pages/index';

@NgModule({
	imports: [CommonModule, BrowserModule, BrowserAnimationsModule, HttpClientModule, HttpClientJsonpModule, PrimeToastModule, RootRoutingModule],
	declarations: [RootComponent, ErrorPageComponent],
	providers: [],
	bootstrap: [RootComponent]
})
export class RootModule {}