import { checkHeader } from '../support/support';

describe('Check app components', () => {
	before(() => {
		cy.viewport(1920, 1080);
	});

	checkHeader();
});
