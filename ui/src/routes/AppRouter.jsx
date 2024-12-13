import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Cms } from "../pages"
import { CmsLayout } from "../components"
import { PrivateRoute } from "./PrivateRoute"

export const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/cms" element={<CmsLayout />}>
                <Route index element={<PrivateRoute element={<Cms.Dashboard.Home />} />} />

                <Route path="login" element={<Cms.Auth.Login />} />
            </Route>
        </Routes>
    </BrowserRouter>
}