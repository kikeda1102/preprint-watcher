import { deleteKeyword } from '@/lib/actions';
import { XSquare } from 'react-feather';

const DeleteButton = ({ keywordId }: { keywordId: number }) => {
    const deleteTodoWithId = deleteKeyword.bind(null, keywordId);

    return (
        <form action={deleteTodoWithId}>
            <button className="bg-red-500 px-2 py-1 m-1 rounded text-sm text-white">
                <XSquare size={14} />
            </button>
        </form>
    );
};

export default DeleteButton;
