import { render } from '@testing-library/react';
import React from 'react';
import form-builder-prompt, { form-builder-promptProps } from './form-builder-prompt';

describe('form-builder-prompt', () => {
    const defaultProps: form-builder-promptProps = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<form-builder-prompt {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('form-builder-prompt')).toBeTruthy();
    });
});
