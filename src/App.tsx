import { Outlet, Route, Routes } from "react-router-dom";

import Header from './components/Header'
import Hero from './components/Hero'
import Home from './layout/Home'
import React from 'react';

const App = ():React.ReactElement => {
  return (
    <main className="container container-responsive align-content-center">
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> 
            <Route path="*" element={<p>No results found</p>} />
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
