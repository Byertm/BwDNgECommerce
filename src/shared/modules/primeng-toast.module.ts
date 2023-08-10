import { NgModule } from '@angular/core';

//#region Modules, Service And Helper References
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
//#endregion

import { PrimeToastService } from '@services/plugins';
import { ToastWrapperComponent } from '@shared/components';

const importAndExportModules = [ToastModule];

@NgModule({
	declarations: [ToastWrapperComponent],
	providers: [MessageService, ConfirmationService, PrimeToastService],
	imports: [...importAndExportModules],
	exports: [...importAndExportModules, ToastWrapperComponent]
})
export class PrimeToastModule {}