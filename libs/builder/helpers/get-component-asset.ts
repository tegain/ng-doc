import {Component} from '@angular/core';
import {asArray, NgDocStyleType} from '@ng-doc/core';
import * as path from 'path';
import {ClassDeclaration} from 'ts-morph';

import {renderTemplate} from '../engine/nunjucks';
import {NgDocAsset} from '../interfaces';
import {NgDocComponentAsset} from '../types';
import {getComponentDecorator} from './angular';
import {buildAssets} from './build-assets';
import {formatCode} from './format-code';
import {slash} from './slash';

/**
 *
 * @param classDeclaration
 * @param inlineStyleLang
 * @param outDir
 */
export function getComponentAsset(
	classDeclaration: ClassDeclaration,
	inlineStyleLang: NgDocStyleType,
	outDir: string,
): NgDocComponentAsset {
	const decoratorData: Component | undefined = getComponentDecorator(classDeclaration);

	if (decoratorData) {
		const filePath: string = classDeclaration.getSourceFile().getFilePath();
		const fileDir: string = path.dirname(filePath);

		const assets: Array<Omit<NgDocAsset, 'outputPath'>> = [
			// Add assets for the component file
			...buildAssets(filePath, inlineStyleLang),
			// Add assets for the template file if it exists
			...(decoratorData.templateUrl ? buildAssets(path.join(fileDir, decoratorData.templateUrl), inlineStyleLang) : []),
			// Add assets for the style files if they exist
			...asArray(decoratorData.styleUrls)
				.map((styleUrl: string) => buildAssets(path.join(fileDir, styleUrl), inlineStyleLang))
				.flat(),
		];

		return {
			[classDeclaration.getName() ?? '']: assets.map((asset: Omit<NgDocAsset, 'outputPath'>, i: number) => {
				const code: string = formatCode(asset.output, asset.type).trim();

				return {
					...asset,
					code,
					output: renderTemplate('./code.html.nunj', {
						context: {
							code,
							lang: asset.type,
						},
					}).trim(),
					outputPath: slash(path.join(outDir, classDeclaration.getName() ?? '', asset.type, `${asset.name}${i}.html`)),
				};
			}),
		};
	}

	return {};
}
