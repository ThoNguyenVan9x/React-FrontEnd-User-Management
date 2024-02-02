import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalEditUser = (props) => {
    const { handleShow, handleClose, dataUserEdit, handleEditUserFromModal } =
        props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job);
        if (res && res.updatedAt) {
            // success
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id,
            });

            handleClose();
            toast.success("Update User success!");
        }
    };

    useEffect(() => {
        if (handleShow) {
            setName(dataUserEdit.first_name);
        }
    }, [dataUserEdit]);

    return (
        <>
            <Modal show={handleShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new-user">
                        <form>
                            <div className="mb-3">
                                <label
                                    htmlFor="name-add"
                                    className="form-label"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name-add"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="job" className="form-label">
                                    Job
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="job"
                                    value={job}
                                    onChange={(event) =>
                                        setJob(event.target.value)
                                    }
                                />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalEditUser;
