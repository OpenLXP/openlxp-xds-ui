'use strict';

import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react';
import Accordian from "../../components/Accordion"

describe('Accordian', () => {
    it('should show the Accordian', () => {
        render(<Accordian title={"Test Title"} content={<div>Test Content</div>}/>);

        expect(screen.getByText('Test Title')).toBeInTheDocument();

        act(() => {
            fireEvent.click(screen.getByText(/Test Title/i));
        });

        expect(screen.getByText('Test Content')).toBeInTheDocument();

      });
});