import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import TableUser from "./components/TableUser";
import { ToastContainer, toast } from "react-toastify";
import Home from "./components/Home";
import { Route, Routes } from "react-router";
import Login from "./components/Login";

function App() {
    return (
        <>
            <div className="app-container">
                <Header />
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<TableUser />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Container>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </>
    );
}

export default App;
