/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import adminList from "./adminList.module.css";
import { NavLink } from "react-router-dom";

const AdminList = ({ name }) => {
    const [coins, setCoins] = useState(0);
    const [coinsClone, setCoinsClone] = useState([]);
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [metal, setMetal] = useState([]);
    const [quality, setQuality] = useState([]);
    const [filters, setFilters] = useState({ priceFrom: 1, yearFrom: 1 });
    const formRef = useRef();
    const filterRef = useRef();
    const filterSpan = useRef();

    useEffect(() => {

        fetch("http://localhost:3000/coins")
            .then(res => res.json())
            .then(data => {
                setCoins(data.reverse());
                setCoinsClone(data);
            });

        fetch("http://localhost:3000/categories")
            .then(res => res.json())
            .then(data => setCategories(data));

        fetch("http://localhost:3000/filters")
            .then(res => res.json())
            .then(data => {
                let [country, metal, quality] = data;
                setCountries(country);
                setMetal(metal);
                setQuality(quality);
            });
    }, []);

    const filter = (e) => {
        !coins?.length && setCoins(coinsClone);
        setCoins(coinsClone);
        const value = e.target.value.trim().toLowerCase();
        setCoins(prev => prev.filter(c => c.name?.toLowerCase().includes(value) ||
            categories?.find(cat => cat.id === c.category_id)?.title.toLowerCase().includes(value)));
    }

    const searchFilter = () => {
        !coins?.length && setCoins(coinsClone);
        setCoins(coinsClone);
        setCoins(prev => {
            return prev.filter(c => {
                if (
                    filters.country === c.country ||
                    filters.metal === c.metal ||
                    filters.quality === c.quality ||
                    (+c.price >= +filters.priceFrom && +c.price <= +filters.priceTo) ||
                    (+c.year >= +filters.yearFrom && +c.year <= +filters.yearTo)
                ) return true;
            })
        });
        formRef.current.classList.remove(adminList.activeFilter);
    }

    const closeClick = (e) => {
        if (e.target !== e.currentTarget) {
            return;
        }
        formRef.current.classList.remove(adminList.activeFilter);
    }

    const deleteCoin = (e, coin) => {
        console.log('delete', e.target.innerText)
        fetch(`http://localhost:3000/coins/${coin.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...coin,
                is_deleted: e.target.innerText === 'DELETE' ? true : false
            })
        });
        location.reload();
    }

    return (
        <div className={adminList["list-container"]} onClick={closeClick}>
            <div className={adminList["title-container"]}>
                <h1 className={adminList["title-container__title"]}>{name}</h1>
                <NavLink to={'/edit'}>
                    <button className={adminList["title-container__button"]}>+</button>
                </NavLink>
            </div>
            <span className={adminList["list-container__subtitle"]}>
                <NavLink
                    to={"/"}
                    className={({ isActive }) => isActive ? adminList.active : ''}
                >
                    Homepage
                </NavLink>
                <NavLink to={"/list"}
                    className={({ isActive }) => isActive ? adminList.active : ''}
                >
                    List of the Coins
                </NavLink>
            </span>
            <div className={adminList["search"]}>
                <label htmlFor="search" className={adminList["search-label"]}>
                    input field
                    <input
                        type="search"
                        id="search"
                        className={adminList["search-input"]}
                        onChange={filter}
                    />
                </label>
                <button className={adminList["search-button"]} onClick={searchFilter}>Search</button>
            </div>
            <span className={adminList["list-container__filter"]}
                onClick={() => {
                    formRef.current.classList.toggle(adminList.activeFilter);
                    filterRef.current.classList.toggle(adminList.activeArrow);
                    filterSpan.current.classList.toggle(adminList.activeSpan);
                }}>
                <span ref={filterSpan}>Advanced filter</span>
                <div className={adminList["list-container__arrow"]} ref={filterRef}>⋁</div>
            </span>
            <form onSubmit={e => e.preventDefault()} className={adminList["advanced-filter-container"]} ref={formRef}>
                <div>
                    <label htmlFor="country" className={adminList["advanced-filter-container__label"]}>Issuing Country</label>
                    <select
                        id="country"
                        className={adminList["advanced-filter-container__select"]}
                        onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
                        defaultValue=''
                    >
                        <option value="" disabled hidden>Select a Country</option>
                        <option value="">Reset</option>
                        {
                            countries.list?.map(l => <option key={l} value={l}>{l}</option>)
                        }
                    </select>
                    <label htmlFor="metal" className={adminList["advanced-filter-container__label"]}>Metal</label>
                    <select
                        id="metal"
                        className={adminList["advanced-filter-container__select"]}
                        onChange={(e) => setFilters(prev => ({ ...prev, metal: e.target.value }))}
                        defaultValue=''
                    >
                        <option value="" disabled hidden>Select a Metal Type</option>
                        <option value="">Reset</option>
                        {
                            metal && metal.list?.map(l => <option key={l} value={l}>{l}</option>)
                        }
                    </select>
                    <label htmlFor="quality" className={adminList["advanced-filter-container__label"]}>Quality of the coin</label>
                    <select
                        id="quality"
                        className={adminList["advanced-filter-container__select"]}
                        onChange={(e) => setFilters(prev => ({ ...prev, quality: e.target.value }))}
                        defaultValue=''
                    >
                        <option value="" disabled hidden>Select a quality Degree</option>
                        <option value="">Reset</option>
                        {
                            quality && quality.list?.map(l => <option key={l} value={l}>{l}</option>)
                        }
                    </select>
                </div>
                <div>
                    <label className={adminList["advanced-filter-container__label"]}>
                        Price
                        <div>
                            from
                            <input
                                type="number"
                                min="1"
                                onChange={(e) => setFilters(prev => ({ ...prev, priceFrom: e.target.value }))}
                                placeholder="0 - ∞"
                            />
                            to
                            <input
                                type="number"
                                min="1"
                                onChange={(e) => setFilters(prev => ({ ...prev, priceTo: e.target.value }))}
                                placeholder="0 - ∞"
                            />
                        </div>
                    </label>
                    <label className={adminList["advanced-filter-container__label"]}>
                        Year of issue
                        <div>
                            from
                            <input
                                type="number"
                                min="1"
                                placeholder="0 - ∞"
                                onChange={(e) => setFilters(prev => ({ ...prev, yearFrom: e.target.value }))}
                            />
                            to
                            <input
                                type="number"
                                min="1"
                                placeholder="0 - ∞"
                                onChange={(e) => setFilters(prev => ({ ...prev, yearTo: e.target.value }))}
                            />
                        </div>
                    </label>
                </div>
            </form>
            <div className={adminList["items-container"]}>
                {
                    coins?.length
                        ?
                        coins.map(coin => {
                            return (
                                <div key={coin.id} className={adminList["items-container__item"]}>
                                    <div>
                                        <div className={adminList["image-container"]}>
                                            <div className={adminList["image-wrapper"]}>
                                                <div className={adminList["image-container__front-side"]}>
                                                    <img src={coin['image_front-side']} alt="Image 1" />
                                                </div>
                                                <div className={adminList["image-container__back-side"]}>
                                                    <img src={coin['image_back-side']} alt="Image 2" />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <span>{coin.name}</span>
                                            <p>{coin.short_description?.slice(0, 110) + "..."}</p>
                                            <h5>{categories?.find(cat => cat.id === coin.category_id)?.title}</h5>
                                        </div>
                                        <div className={adminList["items-container__item__buttons"]}>
                                            <NavLink to={`/edit/${coin.id}`}>
                                                <button className={adminList["items-container__item__buttons__edit"]}>Edit</button>
                                            </NavLink>
                                            <button
                                                style={{
                                                    background: coin.is_deleted ? "blue" : "#ff0000",
                                                    borderColor: coin.is_deleted ? "blue" : "#ff0000"
                                                }}
                                                onClick={(e) => deleteCoin(e, coin)}
                                                className={adminList["items-container__item__buttons__delete"]}
                                            >
                                                {coin.is_deleted ? "Restore" : "Delete"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        coins === 0
                            ?
                            <h1 style={{ margin: "10px auto" }}>Loading...</h1>
                            :
                            <h2 style={{ margin: "10px auto" }}>sorry but there is no coin under this name</h2>
                }
            </div>
        </div>
    )
}

export default AdminList
