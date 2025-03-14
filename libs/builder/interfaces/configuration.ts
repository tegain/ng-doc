import {NgDocHeading, NgDocKeywordsLoader} from '@ng-doc/core';
import {NgDocGlobalKeyword} from '@ng-doc/core/interfaces/keyword-map';

import {NgDocRepoConfig} from './repo-config';

/**
 * Defines the global keywords for the application
 *
 * @param config - The global keywords configuration
 */
export function config(config: NgDocConfiguration): NgDocConfiguration {
	return config;
}

/**
 * NgDoc configuration interface, that configure NgDoc library
 */
export interface NgDocConfiguration {
	/**
	 * The builder that will be used to build the Angular application. (`webpack` is used by default)
	 * You can use `esbuild`, then NgDoc will also use `Vite` for the development server.
	 */
	angularBuilder?: 'esbuild' | 'webpack';
	/**
	 * Determines whether to use the cache or not. (enabled by default)
	 */
	cache?: boolean;
	/**
	 * List of paths to your documentation location (e.g. "src/app")
	 */
	pages?: string | string[];

	/**
	 * The path to the output directory, where the documentation will be generated. (e.g. 'src')
	 *
	 * Remember that if you change this path, you also need to change the following:
	 * - Change the path to the `@ng-doc/generated` directory in `tsconfig.json`
	 * - Change the path to the `.ng-doc/app-name/assets` folder in `angular.json`
	 */
	outDir?: string;
	/**
	 * Route prefix uses to add some additional route segment before documentation pages,
	 * you can use it e.g. to wrap documentation with additional route like "docs".
	 */
	routePrefix?: string;
	/**
	 * The configuration for the global keywords.
	 */
	keywords?: NgDocKeywordsConfiguration;
	/**
	 * The repository configuration.
	 * If it is defined, Ngoc will use it to display the "Suggest edits" button, and "View source" button, on each page.
	 */
	repoConfig?: NgDocRepoConfig;
	/**
	 * The path to the tsconfig file (NgDoc uses tsconfig of your application by default, but you can override it)
	 */
	tsConfig?: string;
	/**
	 * The configuration for the guides
	 */
	guide?: NgDocGuideConfiguration;
}

/**
 * The configuration for the guide page
 */
export interface NgDocGuideConfiguration {
	/**
	 * Defines a list of the heading levels for which the anchor will be generated.
	 */
	anchorHeadings?: NgDocHeading[];
	/**
	 * Defines a list of the external packages that can be used in the guide entity.
	 * For example, if you use `fs` package in some function that is used for generating some value for `data` field,
	 * then you should add `fs` to this list, to make sure that the `fs` package will be available in the guide.
	 */
	externalPackages?: string[];
}

/**
 * The configuration for the global keywords.
 */
export interface NgDocKeywordsConfiguration {
	/**
	 * List of async loaders that will be used to load the global keywords.
	 */
	loaders?: NgDocKeywordsLoader[];
	/**
	 * List of the global keywords, to create link to foreign websites
	 */
	keywords?: Record<string, NgDocGlobalKeyword>;
}
