/* eslint-disable */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Examination from "./components/Examination";
import DailyWorkNote from "./components/DailyWorkNote";
import CurrentStatus from "./components/CurrentStatus";
import Footer from "./components/Footer";
import MyPage from "./components/MyPage";
import Calendar from "./components/Calendar";
import Notification from "./components/Notification";
import MedicalInfo from "./components/MedicalInfo";
// import {Provider} from "./components/Context";
import UserStore from "./store/User";
import WorkStatusStore from "./store/WorkStatus";

function App() {
  return (
      <UserStore>
        <WorkStatusStore>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={ <Login /> } />
              <Route path="/register" element={ <Register /> } />
              <Route path="/dashboard" element={ <> <Navbar /> <Dashboard /> <Footer /> </> } />
              <Route path="/examination" element={ <> <Navbar /> <Examination /> <Footer /> </> }></Route>
              <Route path="/dailyWorkNote" element={ <> <Navbar /> <DailyWorkNote /> <Footer /> </> }></Route>
              <Route path="/currentStatus" element={ <> <Navbar /> <CurrentStatus /> <Footer /> </> }></Route>
              <Route path="/myPage" element={ <> <Navbar /> <MyPage /> <Footer /> </> }></Route>
              <Route path="/calendar" element={ <> <Navbar /> <Notification /> <Calendar /> <Footer /> </> }></Route>
              <Route path="/medicalInfo" element={ <> <Navbar /> <MedicalInfo /> <Footer /> </> }></Route>
            </Routes>
          </BrowserRouter>
        </WorkStatusStore>
      </UserStore>
  );
}

export default App;
