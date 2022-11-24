import {Directive, ElementRef, ViewContainerRef} from '@angular/core';
import {NgDocCodeComponent} from '@ng-doc/app/components/code';
import {NgDocProcessorOptions} from '@ng-doc/app/interfaces';
import {NgDocHtmlProcessor} from '@ng-doc/app/processors/html-processor';

@Directive({
	selector: '[ngDocCodeProcessor]',
})
export class NgDocCodeProcessorDirective extends NgDocHtmlProcessor<NgDocCodeComponent> {
	constructor(
		protected override readonly elementRef: ElementRef<HTMLElement>,
		protected override readonly viewContainerRef: ViewContainerRef,
	) {
		super(elementRef, viewContainerRef, `pre code`, NgDocCodeComponent);
	}

	protected override replaceElement(element: Element): Element {
		return element.closest('pre') ?? element;
	}

	protected override extractComponentOptions(element: Element): NgDocProcessorOptions<NgDocCodeComponent> {
		return {
			inputs: {
				html: element.innerHTML ?? '',
				language: element.getAttribute('lang') || 'html',
				copyButton: element.getAttribute('copyButton') !== 'false',
			},
		};
	}
}
