import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LangsProvider } from "./Contexts/Langs";

import Default from './style';
import Load from "./Components/Load";
import AuthSSO from "./Views/AuthSSO";
import { UtilsProvider } from "./Contexts/Utils";

export default function Router(){
    return (
        <BrowserRouter>
            <LangsProvider>
                <UtilsProvider>
                    <Default />
                    <Load />
                    <Routes>
                        <Route path="/sso" element={<AuthSSO />} />
                    </Routes>
                </UtilsProvider>
            </LangsProvider>
        </BrowserRouter>
    );
}