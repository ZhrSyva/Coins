import { Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import ListOfCoins from "../ListOfCoins/ListOfCoins";
import CoinDetail from "../CoinDetail/CoinDetail";
import AdminPanel from "../AdminPanel/AdminPanel";
import AdminEdit from "../AdminPanel/AdminEdit";
import NotFound from "../404/NotFound";

const Layout = () => {
  return (
    <Routes>
      <Route path="/" index element={<HomePage />} />
      <Route path="/list" element={<ListOfCoins />} />
      <Route path="/list/:id" element={<ListOfCoins />} />
      <Route path="/detail/:id" element={<CoinDetail />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/edit" element={<AdminEdit />} />
      <Route path="/edit/:id" element={<AdminEdit />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Layout;
