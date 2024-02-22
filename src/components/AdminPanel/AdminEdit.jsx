import { NavLink, useParams } from "react-router-dom";
import adminEdit from "./adminEdit.module.css";
import { useEffect, useState } from "react";

const AdminEdit = () => {
    const coin = useParams();
    const [edit, setEdit] = useState({});
    const [newCoin, setNewCoin] = useState({ category_id: Math.floor(Math.random() * 3) + 1 });
    const [check, setCheck] = useState(false);

    useEffect(() => {
        coin.id && fetch(`http://localhost:3000/coins/${coin.id}`)
            .then(res => res.json())
            .then(data => { setEdit(data); setNewCoin(data) });
    }, [coin]);

    const actionBtn = (coin) => {
        check || edit.is_deleted
            ?
            fetch(`http://localhost:3000/coins/${coin.id ? coin.id : ""}`,
                {
                    method: edit.is_deleted ? "DELETE" : coin.id ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(coin.id ? newCoin : { ...newCoin, id: Date.now() })
                }
            )
            :
            false;
    }

    const handleChange = (e) => {
        setCheck(true);
        let value = e.target.value.trim();
        let data = e.target.dataset.inputs;
        if (value) {
            data === "name" && setNewCoin({ ...newCoin, name: value });
            data === "value" && setNewCoin({ ...newCoin, face_value: value });
            data === "year" && setNewCoin({ ...newCoin, year: value });
            data === "price" && setNewCoin({ ...newCoin, price: value });
            data === "country" && setNewCoin({ ...newCoin, country: value });
            data === "metal" && setNewCoin({ ...newCoin, metal: value });
            data === "short_desc" && setNewCoin({ ...newCoin, short_description: value });
            data === "long_desc" && setNewCoin({ ...newCoin, long_description: value });
            data === "quality" && setNewCoin({ ...newCoin, quality: value });
            data === "weight" && setNewCoin({ ...newCoin, weight: value });
            data === "front_img" && setNewCoin({ ...newCoin, "image_front-side": value });
            data === "back_img" && setNewCoin({ ...newCoin, "image_back-side": value });
        }
    }
    console.log(newCoin)
    return (
        <div className={adminEdit.container}>
            <h1 className={adminEdit.title}>{coin.id ? "Edit" : "Post"} Panel</h1>
            <form onSubmit={(e) => e.preventDefault()} className={adminEdit.form}>
                <label htmlFor="name">
                    <span>Coin name</span>
                    <input
                        id="name"
                        type="text"
                        placeholder="Name..."
                        defaultValue={edit?.name}
                        onChange={handleChange}
                        data-inputs="name"
                    />
                </label>
                <label htmlFor="value">
                    <span>Face Value</span>
                    <input
                        id="value"
                        type="text"
                        placeholder="Face Value..."
                        defaultValue={edit?.face_value}
                        onChange={handleChange}
                        data-inputs="value"
                    />
                </label>
                <label htmlFor="year">
                    <span>Year of Issue</span>
                    <input
                        id="year"
                        type="number"
                        min={0}
                        placeholder="Year of Issue..."
                        defaultValue={edit?.year}
                        onChange={handleChange}
                        data-inputs="year"
                    />
                </label>
                <label htmlFor="price">
                    <span>Price</span>
                    <input
                        id="price"
                        type="number"
                        min={0}
                        placeholder="Price..."
                        defaultValue={edit?.price}
                        onChange={handleChange}
                        data-inputs="price"
                    />
                </label>
                <label htmlFor="country">
                    <span>Country</span>
                    <input
                        id="country"
                        type="text"
                        placeholder="Country..."
                        defaultValue={edit?.country}
                        onChange={handleChange}
                        data-inputs="country"
                    />
                </label>
                <label htmlFor="metal">
                    <span>Metal</span>
                    <input
                        id="metal"
                        type="text"
                        placeholder="Metal..."
                        defaultValue={edit?.metal}
                        onChange={handleChange}
                        data-inputs="metal"
                    />
                </label>
                <label htmlFor="short_desc">
                    <span>Short Description</span>
                    <textarea
                        name="short_desc"
                        id="short_desc"
                        placeholder="Short Description..."
                        defaultValue={edit?.short_description}
                        onChange={handleChange}
                        data-inputs="short_desc"
                    >
                    </textarea>
                </label>
                <label htmlFor="long_desc">
                    <span>Long Description</span>
                    <textarea
                        name="long_desc"
                        id="long_desc"
                        placeholder="Long Description..."
                        defaultValue={edit?.long_description}
                        onChange={handleChange}
                        data-inputs="long_desc"
                    >
                    </textarea>
                </label>
                <label htmlFor="quality">
                    <span>Quality of the coin</span>
                    <input
                        id="quality"
                        type="text"
                        placeholder="Quality of the coin..."
                        defaultValue={edit?.quality}
                        onChange={handleChange}
                        data-inputs="quality"
                    />
                </label>
                <label htmlFor="weight">
                    <span>Weight</span>
                    <input
                        id="weight"
                        type="text"
                        placeholder="Weight..."
                        defaultValue={edit?.weight}
                        onChange={handleChange}
                        data-inputs="weight"
                    />
                </label>
                <label htmlFor="front_img">
                    <span>Front side Image Link</span>
                    <input
                        id="front_img"
                        type="text"
                        placeholder="Front side Image Link..."
                        defaultValue={edit ? edit['image_front-side'] : ''}
                        onChange={handleChange}
                        data-inputs="front_img"
                    />
                </label>
                {
                    <img
                        src={(newCoin['image_front-side'] ?? edit["image_front-side"]) || "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3JtNDY3LW1vbmV5LTAwNV8xLnBuZw.png"}
                        alt="front-side"
                    />
                }
                <label htmlFor="back_img">
                    <span>Back side Image Link</span>
                    <input
                        id="back_img"
                        type="text"
                        placeholder="Back side Image Link..."
                        defaultValue={edit ? edit['image_back-side'] : ''}
                        onChange={handleChange}
                        data-inputs="back_img"
                    />
                </label>
                {
                    <img
                        src={(newCoin['image_back-side'] ?? edit["image_back-side"]) || "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3JtNDY3LW1vbmV5LTAwNV8xLnBuZw.png"}
                        alt="back-side"
                    />
                }
                <div className={adminEdit.buttons}>
                    {
                        check || edit.is_deleted ?
                            <NavLink to='/admin' reloadDocument>
                                <button
                                    type="button"
                                    onClick={() => actionBtn(coin)}
                                    className={adminEdit["buttons__btn-action"]}
                                    style={{
                                        backgroundColor: edit.is_deleted ? 'red' : '833ae0',
                                        borderColor: edit.is_deleted ? 'red' : '833ae0',
                                    }}
                                >
                                    {
                                        edit.is_deleted
                                            ?
                                            "Delete Forever"
                                            :
                                            coin.id ?
                                                "Save"
                                                :
                                                "Post"
                                    }
                                </button>
                            </NavLink>
                            :
                            <></>
                    }
                    <NavLink to={'/admin'}>
                        <button
                            type="button"
                            className={adminEdit["buttons__btn-cancel"]}
                        >
                            Cancel
                        </button>
                    </NavLink>
                </div>
            </form>
        </div>
    )
}

export default AdminEdit
