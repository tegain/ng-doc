import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {expandCollapseAnimation, preventInitialChildAnimations} from '@ng-doc/ui-kit/animations';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

/** Component helps to expand or collapse content */
@Component({
	animations: [preventInitialChildAnimations, expandCollapseAnimation],
	selector: 'ng-doc-expander',
	templateUrl: './expander.component.html',
	styleUrls: ['./expander.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgDocExpanderComponent {
	/** Change expand state */
	@Input()
	expanded: boolean = false;

	/** Expander content */
	@Input()
	content: PolymorpheusContent = '';

	/** Closed height could be used to show preview of the content */
	@Input()
	from: number = 0;

	@HostBinding('@preventInitialChild')
	preventInitialChild?: never;
}
