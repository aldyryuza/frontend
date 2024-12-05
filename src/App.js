import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>\
          <Route path="/" element={<UserList />} />
          <Route path="add" element={<AddUser />} />
          <Route path="edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
