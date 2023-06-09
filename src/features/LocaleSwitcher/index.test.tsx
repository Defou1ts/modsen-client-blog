import React from 'react';

import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import renderer from 'react-test-renderer';

import { LocaleSwitcher } from './index';

import type { NextRouter } from 'next/router';

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

describe('LocalesList', () => {
	beforeAll(() => {
		const useRouterMock = {
			locale: 'en',
			locales: ['en', 'ru'],
			pathname: '/',
		};
		(useRouter as jest.Mock<NextRouter>).mockReturnValue(useRouterMock as NextRouter);
	});

	it('renders a LocalesList', () => {
		render(<LocaleSwitcher />);

		const titleText = screen.getByText('en');
		expect(titleText).toBeInTheDocument();
		expect(titleText).toBeVisible();
	});

	it('LocalesList snapshot', () => {
		const component = renderer.create(<LocaleSwitcher />);

		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
