import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalDelete = (props) => {
    const {
        handleShow,
        handleClose,
        handleUpdateTable,
        dataUserDelete,
        handleDeleteUserFromModal,
    } = props;

    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id);
        if (res && +res.statusCode === 204) {
            toast.success("Delete user success!");
            handleClose();
            handleDeleteUserFromModal(dataUserDelete);
        } else {
            toast.error("Error delete!");
        }
    };

    return (
        <>
            <Modal show={handleShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new-user">
                        This action can't be undone!
                        <br />
                        Do you want to delete this user ?
                        <br />
                        <b>Email = {dataUserDelete.email}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDelete;
