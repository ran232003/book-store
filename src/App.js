import logo from "./logo.svg";
import "./App.css";
import TabBar from "./components/TabBar";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Loading from "./components/Loading";
import ToastMessage from "./components/ToastMessage";
import PrivateRoutes from "./components/PrivateRoutes";
import HomePage from "./pages/homepage/HomePage";
import BookDetails from "./pages/bookDetails/BookDetails";
import CreateEditBook from "./pages/createAndEditBook/CreateEditBook";
import DeleteBook from "./pages/deleteBook/DeleteBook";

function App() {
  return (
    <div className="App">
      <TabBar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/homepage/table" element={<HomePage />} />
          <Route path="/homepage/cards" element={<HomePage />} />
          <Route path="/createEdit/:status" element={<CreateEditBook />} />
          <Route path="/deleteBook" element={<DeleteBook />} />

          <Route path="/bookDetails" element={<BookDetails />} />
        </Route>
        <Route path="/auth/:status" element={<Auth />} />
      </Routes>
      <Loading />
      <ToastMessage />
    </div>
  );
}

export default App;
