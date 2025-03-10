import {NgIf} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgDocTypeControl} from '@ng-doc/app/interfaces';
import {
	NgDocButtonIconComponent,
	NgDocFocusableDirective,
	NgDocIconComponent,
	NgDocInputStringDirective,
	NgDocInputWrapperComponent,
} from '@ng-doc/ui-kit';
import {FlControl, FlControlSilencerModule} from 'flex-controls';

@Component({
	selector: 'ng-doc-string-control',
	templateUrl: './string-control.component.html',
	styleUrls: ['./string-control.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		FormsModule,
		NgDocInputWrapperComponent,
		FlControlSilencerModule,
		NgDocInputStringDirective,
		NgIf,
		NgDocButtonIconComponent,
		NgDocFocusableDirective,
		NgDocIconComponent,
	],
})
export class NgDocStringControlComponent extends FlControl<string> implements NgDocTypeControl<string> {
	@Input()
	default?: string;

	constructor() {
		super();
	}

	changeModel(value: string | null): void {
		this.updateModel(value === null && this.default ? this.default : value);
	}

	override writeValue(value: string | null) {
		super.writeValue(value);
	}
}
