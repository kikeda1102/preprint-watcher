import { deleteKeyword } from '@/lib/actions';

const DeleteButton = ({ keywordId }: { keywordId: number }) => {
    const deleteTodoWithId = deleteKeyword.bind(null, keywordId);

    return (
        <form action={deleteTodoWithId}>
            <button className="bg-red-500 px-2 py-1 rounded-lg text-sm text-white">
                ×
            </button>
        </form>
    );
};

export default DeleteButton;
