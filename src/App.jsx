import { Routes, Route } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import AuthLayout from "./_auth/AuthLayout"
import SignInForm from "./_auth/forms/SignInForm"
// import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import Home from "./_root/pages/Home";
import Search from "./_root/pages/Search";

const App = () => {
  return (
    <main>
      
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          {/* <Route path="/sign-up" element={<SignupForm />} /> */}
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          {/* <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} /> */}
        </Route>
      </Routes>

      {/* <Toaster /> */}
    </main>
  );
};

export default App;
