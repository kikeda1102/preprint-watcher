'use client';
import { addKeyword } from '@/lib/actions';
import { useRef } from 'react'


const AddKeywordForm = ({ userId }: { userId: number }) => {
    const addKeywordWithId = addKeyword.bind(null, userId);
    const ref = useRef<HTMLFormElement>(null)

    return (
        <form className="flex items-center"
            ref={ref}
            action={async (formData) => {
                await addKeywordWithId(formData)
                ref.current?.reset()
            }}
        >
            <label htmlFor="addKeyword" className="text-sm font-bold m-2">
                Add Keyword
            </label>
            <input
                id="addKeyword"
                name="addKeyword"
                type="text"
                className="border border-gray-300 p-2 m-2 rounded-lg appearance-none focus:outline-none focus:border-gray-600"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white rounded-lg py-2 px-4 m-2 text-sm hover:bg-blue-700"
            >
                Add Keyword
            </button>
        </form>
    );
}

export default AddKeywordForm;
