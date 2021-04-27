import React from 'react'
import { Modal } from 'react-bootstrap'
// import './style.scss'

export default function ProductModal (props){

    const{ size, isShowModal, modalBody, onClose, modalTitle } = props
    //functions
    const onCloseModal = () =>{
        onClose(false)
    }
    const onTranslateTitle = (str) =>{
        if(str === "add new"){
            return 'Thêm mới'
        }
        else return 'Chỉnh sửa'
    }
    //render
    return (
        <>
            <Modal size={size} show={isShowModal} className="modal-bg" onHide={onCloseModal} >
                <Modal.Header closeButton={false}>
                    <Modal.Title>{onTranslateTitle(modalTitle).toUpperCase()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalBody}
                </Modal.Body>
            </Modal>
        </>
    )
}