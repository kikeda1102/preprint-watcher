'use client';
import { useState } from 'react';
import { updateSortBy, updateSortOrder } from '@/lib/actions';

// ソートオプションに対応する表示用のラベル
const sortByLabels: Record<string, string> = {
    relevance: 'relevance',
    submittedDate: 'submitted date',
    lastUpdatedDate: 'last updated date',
};

export default function SortSelector({ userId, initialSortBy, initialSortOrder }: { userId: number, initialSortBy: string, initialSortOrder: string }) {
    const [sortBy, setSortBy] = useState<string>(initialSortBy || 'submittedDate');
    const [sortOrder, setSortOrder] = useState<string>(initialSortOrder || 'descending');

    const handleSortByChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedSortBy = event.target.value;
        setSortBy(selectedSortBy);
        await updateSortBy(userId, selectedSortBy);
    };

    const handleSortOrderChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedSortOrder = event.target.value;
        setSortOrder(selectedSortOrder);
        await updateSortOrder(userId, selectedSortOrder);
    };

    return (
        <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-4">
                <label className="font-bold">Sort by:</label>
                <div className="flex items-center space-x-2">
                    {['relevance', 'submittedDate', 'lastUpdatedDate'].map((value) => (
                        <div key={value} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id={`sortBy-${value}`}
                                name="sortBy"
                                value={value}
                                checked={sortBy === value}
                                onChange={handleSortByChange}
                                className="form-radio text-blue-500 ml-3"
                            />
                            <label htmlFor={`sortBy-${value}`}>{sortByLabels[value]}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <label className="font-bold">Sort order:</label>
                <div className="flex items-center space-x-2">
                    {['ascending', 'descending'].map((value) => (
                        <div key={value} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id={`sortOrder-${value}`}
                                name="sortOrder"
                                value={value}
                                checked={sortOrder === value}
                                onChange={handleSortOrderChange}
                                className="form-radio text-blue-500 ml-3"
                            />
                            <label htmlFor={`sortOrder-${value}`}>{value}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
