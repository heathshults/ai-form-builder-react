import { render } from '@testing-library/react';
import React from 'react';
import 2-col-layout, { 2-col-layoutProps } from './2-col-layout';

describe('2-col-layout', () => {
    const defaultProps: 2-col-layoutProps = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<2-col-layout {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('2-col-layout')).toBeTruthy();
    });
});
