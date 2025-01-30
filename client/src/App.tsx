import ConnectToService from "./front/components/connect";
import '../public/styles/index.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./front/components/home";
import WholeUserProfile from "./front/components/home/components/profile/whole";
import { useEffect, useState } from "react";
import axios from "axios";
import server from "../server";
import NewPost from "./front/components/home/components/post/new-post";
import DataPolicy from "./front/pages/legal/data-policy";

function App() {
    const [user, setUser] = useState<
    {
        nom: string;
        prenom: string;
        password: string;
        code: string;
        id: string;
        profilePicture: string;
    } | null
  >(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.post(`${server.address}/token`, {
          token : token
        }).then((res) => {
            if (res.data.success) {
                setUser(res.data.user);
                console.log("Setting user", res.data.user);
            } 
        }).catch((error) => {
            console.error(error);
        });
    }
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/connect" element={<ConnectToService />} />
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/profile" element={<WholeUserProfile user={user}/>} />
        <Route path="/post/new" element={<NewPost user={user} />} />
        <Route path="/legal/data-policy" element={<DataPolicy />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
