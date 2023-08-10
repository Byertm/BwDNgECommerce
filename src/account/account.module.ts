import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { AccountRoutingModule } from '@account/account-routing.module';

import { PrimeNgSharedModule } from '@shared/modules';

import { AuthHeaderComponent, AuthMainComponent, AuthFooterComponent } from '@account/layouts';
import { LoginComponent } from '@account/pages';

import { EBLogoComponent } from '@shared/components';

@NgModule({
	declarations: [LoginComponent, AuthHeaderComponent, AuthFooterComponent, AuthMainComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientJsonpModule, AccountRoutingModule, PrimeNgSharedModule, EBLogoComponent]
})
export class AccountModule {}