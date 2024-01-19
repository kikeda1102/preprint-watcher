'use client';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Edit } from 'react-feather';
import { editKeyword } from '@/lib/actions';

const EditButton = ({ keywordId, currentKeyword }: { keywordId: number; currentKeyword: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedKeyword, setEditedKeyword] = useState(currentKeyword);

    useEffect(() => {
        Modal.setAppElement('body'); // for screen readers
        // ref: https://zenn.dev/ymrl/articles/89d844670816361ce777
    },);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        await editKeyword(keywordId, editedKeyword);
        closeModal();
    };

    return (
        <>
            <button
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-600 focus:outline-none px-3 py-2 m-1 rounded text-sm text-white transition-all duration-300"
            >
                <Edit size={14} />
            </button>


            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-4">Edit Keyword</h2>
                <form onSubmit={handleEdit}>
                    <input
                        type="text"
                        value={editedKeyword}
                        onChange={(e) => setEditedKeyword(e.target.value)}
                        className="border border-gray-300 p-2 mb-2 w-full"
                    />
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white rounded-lg py-2 px-4 mr-2 hover:bg-blue-700"
                        >
                            Save
                        </button>
                        <button
                            onClick={closeModal}
                            className="bg-gray-300 text-gray-800 rounded-lg py-2 px-4 hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default EditButton;
