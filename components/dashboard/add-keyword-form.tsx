'use client';
import { addKeyword } from '@/lib/actions';
import { init } from 'next/dist/compiled/webpack/webpack';
import { useRef } from 'react'
import { useFormState } from 'react-dom';
import { State } from '@/lib/actions';


const AddKeywordForm = ({ userId }: { userId: number }) => {
    const addKeywordWithId = addKeyword.bind(null, userId);
    const ref = useRef<HTMLFormElement>(null) // フォームのリセット用にrefを設定
    const initialState: State = { message: null, errors: {} };
    const [state, dispatch] = useFormState(addKeywordWithId, initialState);

    return (
        // TODO: validation エラーハンドリング
        <form className="flex items-center"
            ref={ref}
            action={
                // async (formData) => {
                // await addKeywordWithId(formData)
                // ref.current?.reset();
                // }
                dispatch
            }
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
            <div id="name-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.name &&
                    state?.errors.name.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white rounded-lg py-2 px-4 m-2 text-sm hover:bg-blue-700"
            >
                ＋
            </button>
        </form>
    );
}

export default AddKeywordForm;
