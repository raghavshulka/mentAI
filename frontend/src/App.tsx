import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { SendTokens } from "./pages/CryptoPayment";
import VideoCall from "./pages/VIdeocall";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import ChatPage from "./pages/Messaging";
import SignInPage from "./pages/SignIn";

const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/dashboard/:id" element={<Dashboard />} />
      <Route path="/crypto" element={<SendTokens />} />
      <Route path="/call" element={<VideoCall />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/messaging" element={<ChatPage />} />

    </Routes>
  );
};

export default App;
