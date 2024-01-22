'use client';
import { useState } from 'react';
import { updateMaxResults } from '@/lib/actions';

export default function MaxResultsSelector({ userId, initialMaxResults }: { userId: number, initialMaxResults: number }) {
    const [maxResults, setMaxResults] = useState<number>(initialMaxResults || 10);


    const handleMaxResultsChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedMaxResults = parseInt(event.target.value, 10); // 文字列から数値に変換
        setMaxResults(selectedMaxResults);
        await updateMaxResults(userId, selectedMaxResults);
    };



    return (
        <div className="flex flex-col items-start space-y-4 mt-5">
            <div className="flex items-center space-x-4">
                <label className="font-bold">Max Results:</label>
                <div className="flex items-center space-x-2">
                    {['10', '20', '30', '40', '50'].map((value) => (
                        <div key={value} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id={`maxResults-${value}`}
                                name="maxResults"
                                value={value}
                                checked={maxResults === parseInt(value)}
                                onChange={handleMaxResultsChange}
                                className="form-radio text-blue-500 ml-3"
                            />
                            <label htmlFor={`maxResults-${value}`}>{value}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
