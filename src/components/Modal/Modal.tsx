import React from "react";

import './styles.scss';

interface Props {
    children: React.ReactNode
    onClose: (value: boolean) => void
}

export const Modal = ({children, onClose}: Props) => {

    const handleCloseModal = () => {
        onClose(false);
    }

    return (
        <div className="modal-wrapper">
            <div onClick={handleCloseModal} className="overlay" />
            <div className="modal">
                {children}
            </div>
        </div>
    )
}
