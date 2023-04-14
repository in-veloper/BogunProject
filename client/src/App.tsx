/* eslint-disable react/react-in-jsx-scope */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react/react-in-jsx-scope */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import DailyWorkNote from "./components/DailyWorkNote";
import Footer from "./components/Footer";
import MyPage from "./components/MyPage";
import Calendar from "./components/Calendar";
import Notification from "./components/Notification";
import MedicalInfo from "./components/MedicalInfo";
// import {Provider} from "./components/Context";
import UserStore from "./store/User";

function App() {
  return (
      <UserStore>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/dashboard" element={ <> <Navbar /> <Dashboard /> <Footer /> </> } />
              <Route path="/dailyWorkNote" element={ <> <Navbar/> <DailyWorkNote /> <Footer /> </> }></Route>
            <Route path="/myPage" element={ <> <Navbar /> <MyPage /> <Footer /> </> }></Route>
            <Route path="/calendar" element={ <> <Navbar /> <Notification /> <Calendar /> <Footer /> </> }></Route>
            <Route path="/medicalInfo" element={ <> <Navbar /> <MedicalInfo /> <Footer /> </> }></Route>
          </Routes>
        </BrowserRouter>
      </UserStore>
  );
}

export default App;
