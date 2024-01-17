import { deleteKeyword } from '@/lib/actions';

const DeleteButton = ({ keywordId }: { keywordId: number }) => {
    const deleteTodoWithId = deleteKeyword.bind(null, keywordId);

    return (
        <form action={deleteTodoWithId}>
            <button className="bg-red-500 px-1.5 py-0.5 rounded-xl text-sm text-white">
                ×
            </button>
        </form>
    );
};

export default DeleteButton;
