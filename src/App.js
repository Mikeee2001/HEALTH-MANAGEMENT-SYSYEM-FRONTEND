import React from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


import Home from "../src/pages/Home";
import Login from "../src/LoginAndRegister/Login";
import Register from "../src/LoginAndRegister/Register";

import { AuthProvider} from "../src/ProtectedRoutes/AuthProvider";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import DoctorsList from "../src/pages/DoctorList";
import About from "../src/pages/About";
import ProtectedLayout from "../src/ProtectedRoutes/ProtectedLayout";
import BookAppointments from "./pages/BookAppointments";
import ViewAppointments from "./pages/ViewAppointments";


// Main application component
function App() {
  return (
   <AuthProvider>
      <Router>
       
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* ✅ Protected Routes */}
         
          <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}> 
            <Route path="/home" element={<Home />} />
            <Route path="/doctors" element={<DoctorsList />} />
            <Route path="/about" element={<About />} />
            <Route path="/book-appointment/:id" element={<BookAppointments />} />
            <Route path="/book-appointment" element={<BookAppointments />} />
            <Route path="/view-appointment" element={<ViewAppointments />} />
          </Route>
         </Route>

        </Routes>
      </Router>
     </AuthProvider>
  );
}

export default App;
