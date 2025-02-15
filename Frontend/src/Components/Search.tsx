import { useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';

const SearchComponent = ({ onSearch }: { onSearch: (data: any[]) => void }) => {
    const [filter, setFilter] = useState('');

    async function handleSearch() {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/search', {
                params: { filter },
            });
            // Pass the search result to the parent component
            console.log(response.data.user)
            onSearch(response.data.user || []);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }

    return (
        <div className="max-w-md w-full">
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                    type="button" // Prevents form submission
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                    <Search size={20} />
                </button>
            </form>
        </div>
    );
};

export default SearchComponent;
