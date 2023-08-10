import { NgModule } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PrimeToastModule } from '@shared/modules/primeng-toast.module';

const importAndExportModules = [CheckboxModule, ConfirmPopupModule, TooltipModule, PrimeToastModule];

@NgModule({
	declarations: [],
	imports: [...importAndExportModules],
	exports: [...importAndExportModules]
})
export class PrimeNgSharedModule {}