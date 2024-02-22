import { useRef, useState } from "react";
import AdminList from "./AdminList";
import adminPanel from "./adminPanel.module.css";

const AdminPanel = () => {
    const [change, setChange] = useState(localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : {});
    const nameRef = useRef();
    const passwordRef = useRef();
    localStorage.setItem('admin', JSON.stringify(change));

    const changeHandler = () => setChange({ name: nameRef.current.value, password: passwordRef.current.value });

    return (
        change.name
            ?
            <AdminList name={change.name} />
            :
            <div className={adminPanel.container}>
                <h1>Admin Panel</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="name">
                        <span>Login</span>
                        <input id="name" type="text" placeholder="Name..." ref={nameRef} />
                    </label>
                    <label htmlFor="password">
                        <span>Password</span>
                        <input id="password" type="password" placeholder="Password..." ref={passwordRef} />
                    </label>
                    <button onClick={changeHandler}>Sign In</button>
                </form>
            </div>
    )
}

export default AdminPanel
