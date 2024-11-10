import Home from "./home/Home";
import Resume from "./resume/Resume";
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export default function MultiPageRoutes() {
    return (
        <Routes>
            <Route exact path={'/'} element={<Home />} />
            <Route exact path={'/resume'} element={<Resume />} />
        </Routes>
    )
}