import { render, screen} from '@testing-library/react';
import Footer from "../../components/Footer"

describe('Footer', () => {
    it('should show the footer text', () => {
        render(<Footer />);

        expect(screen.getByText('DOD')).toBeInTheDocument();
        expect(screen.getByText('About DOD')).toBeInTheDocument();
        expect(screen.getByText('Web Policy')).toBeInTheDocument();

        expect(screen.getByText('Privacy')).toBeInTheDocument();
        expect(screen.getByText('Contact US')).toBeInTheDocument();
      });
});