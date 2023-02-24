import { Outlet, Route, Routes } from "react-router-dom";
import React, {FC} from 'react';

import Header from './components/Header'
import Hero from './components/Hero'
import Home from './layout/Home'

const App:FC<{}> = () => {
  return (
    <main className="container container-responsive align-content-center">
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> 
            <Route path="*" element={<p>You're seeing the 404 page because this URL doesn't exists.</p>} />
          </Route>
      </Routes>
    </main>
  )
};

const Layout = ():React.ReactElement => (
    <>
      <Header />
      <Hero />
      <Outlet />
    </>
);


export default App;
