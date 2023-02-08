import { render, screen } from '@testing-library/rea\
ct';
import FeedEntrytime from './FeedEntryTime';

test('renders time week', () => {
    render(<FeedEntrytime time='2022-10-01T00:00:00.000'/>);
    const linkElement = screen.getByText(/day/i);
    expect(linkElement).toBeInTheDocument();
});
