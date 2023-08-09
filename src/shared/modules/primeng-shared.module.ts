import { NgModule } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { PrimeToastModule } from '@shared/modules/primeng-toast.module';

const importAndExportModules = [CheckboxModule, TooltipModule, PrimeToastModule];

@NgModule({
	declarations: [],
	imports: [...importAndExportModules],
	exports: [...importAndExportModules]
})
export class PrimeNgSharedModule {}