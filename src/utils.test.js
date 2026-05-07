import * as utils from './utils.js';

test('tests whether the truncate function properly formats a word', () => {
	expect(utils.truncate("test",3)).toBe("te...");
});

test('tests whether the capitalizeFirstLetter function capitalizes the first letter of a word', () => {
	expect(utils.capitalizeFirstLetter("test")).toBe("Test");
});