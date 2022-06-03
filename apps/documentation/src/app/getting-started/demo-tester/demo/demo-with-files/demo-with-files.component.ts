import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'ng-doc-demo-with-files',
	templateUrl: './demo-with-files.component.html',
	styleUrls: ['./demo-with-files.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoWithFilesComponent {}
