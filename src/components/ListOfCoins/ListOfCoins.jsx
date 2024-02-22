import { NavLink, useParams } from "react-router-dom";
import listOfCoins from "./listOfCoins.module.css";
import { useRef, useState } from "react";
import { useEffect } from "react";

const ListOfCoins = () => {
  const [coins, setCoins] = useState(0);
  const [coinsClone, setCoinsClone] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [metal, setMetal] = useState([]);
  const [quality, setQuality] = useState([]);
  const [filters, setFilters] = useState({ priceFrom: 1, yearFrom: 1 });
  const category = useParams();
  const formRef = useRef();
  const filterRef = useRef();
  const filterSpan = useRef();

  useEffect(() => {

    fetch("http://localhost:3000/coins")
      .then(res => res.json())
      .then(data => {
        setCoins(data);
        setCoinsClone(data.reverse());
        if (category.id) setCoins(prev => prev.filter(c => c.category_id === +category.id).reverse());
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

  }, [category]);

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
    formRef.current.classList.remove(listOfCoins.activeFilter);
  }

  const closeClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    formRef.current.classList.remove(listOfCoins.activeFilter);
  }

  return (
    <div className={listOfCoins["list-container"]} onClick={closeClick}>
      <h1 className={listOfCoins["list-container__title"]}>List of the Coins</h1>
      <span className={listOfCoins["list-container__subtitle"]}>
        <NavLink
          to={"/"}
          className={({ isActive }) => isActive ? listOfCoins.active : ''}
        >
          Homepage
        </NavLink>
        <NavLink to={"/list"}
          className={({ isActive }) => isActive ? listOfCoins.active : ''}
        >
          List of the Coins
        </NavLink>
      </span>
      <div className={listOfCoins["search"]}>
        <label htmlFor="search" className={listOfCoins["search-label"]}>
          input field
          <input
            defaultValue={categories?.find(cat => +category.id === cat.id)?.title || ""}
            type="search"
            id="search"
            className={listOfCoins["search-input"]}
            onChange={filter}
          />
        </label>
        <button className={listOfCoins["search-button"]} onClick={searchFilter}>Search</button>
      </div>
      <span className={listOfCoins["list-container__filter"]}
        onClick={() => {
          formRef.current.classList.toggle(listOfCoins.activeFilter);
          filterRef.current.classList.toggle(listOfCoins.activeArrow);
          filterSpan.current.classList.toggle(listOfCoins.activeSpan);
        }}>
        <span ref={filterSpan}>Advanced filter</span>
        <div className={listOfCoins["list-container__arrow"]} ref={filterRef}>⋁</div>
      </span>
      <form onSubmit={e => e.preventDefault()} className={listOfCoins["advanced-filter-container"]} ref={formRef}>
        <div>
          <label htmlFor="country" className={listOfCoins["advanced-filter-container__label"]}>Issuing Country</label>
          <select
            id="country"
            className={listOfCoins["advanced-filter-container__select"]}
            onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
            defaultValue=''
          >
            <option value="" disabled hidden>Select a Country</option>
            <option value="">Reset</option>
            {
              countries.list?.map(l => <option key={l} value={l}>{l}</option>)
            }
          </select>
          <label htmlFor="metal" className={listOfCoins["advanced-filter-container__label"]}>Metal</label>
          <select
            id="metal"
            className={listOfCoins["advanced-filter-container__select"]}
            onChange={(e) => setFilters(prev => ({ ...prev, metal: e.target.value }))}
            defaultValue=''
          >
            <option value="" disabled hidden>Select a Metal Type</option>
            <option value="">Reset</option>
            {
              metal && metal.list?.map(l => <option key={l} value={l}>{l}</option>)
            }
          </select>
          <label htmlFor="quality" className={listOfCoins["advanced-filter-container__label"]}>Quality of the coin</label>
          <select
            id="quality"
            className={listOfCoins["advanced-filter-container__select"]}
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
          <label className={listOfCoins["advanced-filter-container__label"]}>
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
          <label className={listOfCoins["advanced-filter-container__label"]}>
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
      <div className={listOfCoins["items-container"]}>
        {
          coins?.length
            ?
            coins.map(coin => {
              if (coin.is_deleted) return <></>;
              else return (
                <div key={coin.id} className={listOfCoins["items-container__item"]}>
                  <NavLink to={`/detail/${coin.id}`}>
                    <div className={listOfCoins["image-container"]}>
                      <div className={listOfCoins["image-wrapper"]}>
                        <div className={listOfCoins["image-container__front-side"]}>
                          <img src={coin['image_front-side']} alt="Image 1" />
                        </div>
                        <div className={listOfCoins["image-container__back-side"]}>
                          <img src={coin['image_back-side']} alt="Image 2" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <span>{coin.name}</span>
                      <p>{coin.short_description?.slice(0, 110) + "..."}</p>
                      <h5>{categories?.find(cat => cat.id === coin.category_id)?.title}</h5>
                    </div>
                  </NavLink>
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
  );
};

export default ListOfCoins;
