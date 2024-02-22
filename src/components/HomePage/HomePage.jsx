import { useState } from "react";
import homePage from "./homePage.module.css";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const [categories, setCategories] = useState(0);
  const [coins, setCoins] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
    fetch('http://localhost:3000/coins')
      .then(res => res.json())
      .then(data => setCoins(data));
  }, [value])

  const filter = () => {
    setCategories(prev => prev.filter(c => c.title?.toLowerCase().includes(value?.toLowerCase())));
  }

  return (
    <div className={homePage['home-container']}>
      <div className={homePage["title-container"]}>
        <h1 className={homePage["title-container__title"]}>Home Page</h1>
        <NavLink to={'/admin'}>
          <button className={homePage["title-container__button"]}>Admin Panel</button>
        </NavLink>
      </div>
      <span className={homePage["list-container__subtitle"]}>
        <NavLink
          to={"/"}
          className={({ isActive }) => isActive ? homePage.active : homePage["list-container__anchor"]}
        >
          Homepage
        </NavLink>
        <NavLink to={"/list"}
          className={({ isActive }) => isActive ? homePage.active : homePage["list-container__anchor"]}
        >
          List of the Coins
        </NavLink>
      </span>
      <div className={homePage["search"]}>
        <label htmlFor="search" className={homePage["search-label"]}>
          input field
          <input
            type="search"
            id="search"
            className={homePage["search-input"]}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <button className={homePage["search-button"]} onClick={filter}>Search</button>
      </div>
      <div className={homePage["categories-container"]}>
        {
          categories?.length
            ?
            categories.map((category) => {
              return (
                <NavLink key={category.id} to={`/list/${category.id}`}>
                  <div className={homePage["category-wrapper"]}>
                    <h5 className={homePage["category-title"]}>{category.title}</h5>
                    <button className={homePage["category-button"]}>
                      Show {coins.filter(c => {
                        if (c.is_deleted) return c.is_deleted === false;
                        else return c.category_id === category.id;
                      }).length.toLocaleString()} item(s) ⪢
                    </button>
                    <img src={category.image} className={homePage["category-image"]} alt="category-coin" />
                  </div>
                </NavLink>
              )
            })
            :
            categories === 0
              ?
              <h1 style={{ margin: "10px auto" }}>Loading...</h1>
              :
              <h2 style={{ margin: "10px auto" }}>sorry but there is no coin under this name</h2>
        }
      </div>
    </div>
  )
};

export default HomePage;
