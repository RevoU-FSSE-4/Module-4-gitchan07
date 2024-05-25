import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Home from "./page/Home";
import { useState } from "react";
import { ProfileContext } from "./types/ProfileContext";
import GlobalProfile from "./types/GlobalProfile";
import NavigationComponent from "./component/NavigationComponent";
import Copyright from "./component/Copyright";
import Register from "./page/Register";
import FormLogin from "./page/FormLogin";
import Dashboard from "./page/Dashboard";
import PrivateRoute from "./route/PrivateRoute";
import HeaderComponent from "./component/HeaderComponent";
import CategoryComponent from "./component/CategoryComponent";
import AddComponent from "./component/AddComponent";
import EditComponent from "./component/EditComponent";




function App() {
  const [profile, setProfile] = useState("anonymous");

  const changeName = (values: string) => {
    setProfile(values);
  };

  const thisContext: GlobalProfile = {
    name: profile,
    setName: changeName,
  };

  return (
    <ProfileContext.Provider value={thisContext}>
      <BrowserRouter>
        <NavigationComponent />
        <Header />


        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/FormLogin" element={<FormLogin/>}></Route>

          <Route path="/" element={<PrivateRoute/>}>
            <Route path="/HeaderComponent" element={<HeaderComponent />}></Route>
            <Route path="/Dashboard" element={<Dashboard/>}></Route>
            <Route path="/CategoryComponent" element={<CategoryComponent />}></Route>
            <Route path="/AddComponent" element={<AddComponent />}></Route>
            <Route path="/EditComponent/:id" element={<EditComponent />}></Route>
          </Route>
        </Routes>
        <Copyright />
      </BrowserRouter>
    </ProfileContext.Provider>
  );
}

export default App;