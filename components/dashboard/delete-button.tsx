'use client';
import { deleteKeyword } from '@/lib/actions';
import { XSquare } from 'react-feather';
import { useState } from 'react';
import Modal from 'react-modal';

const DeleteButton = ({ keywordName, keywordId }: { keywordName: string, keywordId: number }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        // ユーザーが確認した場合に削除アクションを実行
        await deleteKeyword(keywordId);
        closeModal();
    };

    return (
        <>
            <button
                onClick={openModal}
                className="bg-red-500 hover:bg-red-600 focus:outline-none px-3 py-2 m-1 rounded text-sm text-white transition-all duration-300"
            >
                <XSquare size={14} />
            </button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-4">Delete Keyword</h2>
                <p>Are you sure to delete this keyword: <span className="text-red-500 font-bold">{keywordName}</span> ?</p>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white rounded-lg py-2 px-4 mr-2 hover:bg-red-700"
                    >
                        Delete
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 text-gray-800 rounded-lg py-2 px-4 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default DeleteButton;
