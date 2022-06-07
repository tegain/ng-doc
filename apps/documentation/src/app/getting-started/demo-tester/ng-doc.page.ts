import {NgDocPage} from '@ng-doc/builder';

import GettingStartedCategory from '../ng-doc.category';

const page: NgDocPage = {
	title: `Demo Tester`,
	mdFile: './index.md',
	category: GettingStartedCategory,
	scope: __dirname,
};

export default page;
