import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Signin from "./pages/Signin"
import UserSignup from "./pages/Signup"
import TweetDashboard from "./pages/TweetDashboard"
import YoutubeDashboard from "./pages/YoutubeDashboard"
import InstagramDashboard from "./pages/InstagramDashboard"
import LandingPage from "./pages/LandingPage"
// import { SharedBrainView } from "./Components/ShareBrainButton"
import NotionDashboard from "./pages/NotionDashboard"



const App = () => {


  return (
    <>


      <BrowserRouter>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/tweet" element={<TweetDashboard />} />
          <Route path="/youtube" element={<YoutubeDashboard />} />
          <Route path="/instagram" element={<InstagramDashboard />} />
          <Route path="/notion" element={<NotionDashboard />} />
          {/* <Route path="/share/:hash" element={<SharedBrainView />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App