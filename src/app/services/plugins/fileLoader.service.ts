import { Injectable } from '@angular/core';
import { Observer, Observable, of, BehaviorSubject } from 'rxjs';

export interface IScriptModel {
	name: string;
	src: string;
	async?: boolean;
	loaded?: boolean;
	attributes?: { name: string; value: string }[];
	addinationals?: { [key: string]: string }[];
}

@Injectable({ providedIn: 'root' })
export class ScriptLoaderService {
	private scripts: IScriptModel[] = [];
	private generalScriptsSubject = new BehaviorSubject<IScriptModel[]>([]);
	public generalScripts = this.generalScriptsSubject.asObservable();

	public isLoadedScript(pScriptName: string): Observable<boolean> {
		return of(!!this.generalScriptsSubject?.value?.find((script: IScriptModel) => script?.name === pScriptName)?.loaded);
	}

	public isViewScript(pScriptName: string): boolean { return this.scripts?.some((script: IScriptModel) => script?.name === pScriptName); }

	public load(script: IScriptModel): Observable<IScriptModel> {
		return new Observable<IScriptModel>((observer: Observer<IScriptModel>) => {
			let existingScript = this.scripts.find((s) => s.name === script.name);

			// Complete if already loaded
			if (existingScript && !!existingScript.loaded) {
				observer.next(existingScript);
				observer.complete();
			} else {
				// Add the script
				this.scripts = [...this.scripts, script];
				this.generalScriptsSubject.next(this.scripts);

				// Load the script
				let scriptElement: HTMLScriptElement = document.createElement('script');
				scriptElement.type = 'text/javascript';
				scriptElement.src = script.src;
				scriptElement.async = !!script?.async;

				script.attributes?.forEach((s) => scriptElement.setAttribute(s.name, s.value));

				script.addinationals?.forEach((addinational: { [key: string]: string }) => {
					for (let add in addinational) scriptElement.setAttribute(add, addinational[add]);
				});

				scriptElement.onload = () => {
					script.loaded = true;
					observer.next(script);
					this.generalScriptsSubject.next(this.scripts);
					observer.complete();
				};

				scriptElement.onerror = (error: any) => {
					observer.error("Couldn't load script " + script.src);
				};

				document.getElementsByTagName('body')[0].appendChild(scriptElement);
			}
		});
	}
}