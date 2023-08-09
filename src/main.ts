import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { enableProdMode } from '@angular/core';
import { environment } from '@environments/environment';
import { RootModule } from '@src/root.module';

if (environment.production) enableProdMode();
else console.log('Main Ts Environments', JSON.stringify(environment));

platformBrowserDynamic()
	.bootstrapModule(RootModule)
	.catch((err) => console.error(err));