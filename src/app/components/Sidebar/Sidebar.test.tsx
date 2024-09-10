import { render } from '@testing-library/react';
import React from 'react';
import Sidebar, { SidebarProps } from './Sidebar';

describe('Sidebar', () => {
    const defaultProps: SidebarProps = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<Sidebar {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('Sidebar')).toBeTruthy();
    });
});
