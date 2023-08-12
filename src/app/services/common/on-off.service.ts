import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OnOffService implements OnInit, OnDestroy {
	offlineEvent?: Observable<Event>;
	onlineEvent?: Observable<Event>;
	subscriptions: Subscription[] = [];

	private handleAppConnectivityChanges(): void {
		this.onlineEvent = fromEvent(window, 'online');
		this.offlineEvent = fromEvent(window, 'offline');

		this.subscriptions.push(this.onlineEvent.subscribe((e) => {
			// handle online mode
			console.log('Online...');
		}));

		this.subscriptions.push(this.offlineEvent.subscribe((e) => {
			// handle offline mode
			console.log('Offline...');
		}));
	}

	ngOnInit(): void { this.handleAppConnectivityChanges(); }

	ngOnDestroy(): void { this.subscriptions.forEach((subscription) => subscription.unsubscribe()); }
}