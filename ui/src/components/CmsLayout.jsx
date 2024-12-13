import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"

import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import http from "../http"
import { fromStorage, removeStorage } from "../lib"
import { Loading } from "./Loading"
import { clearUser, setUser } from "../store/user.slice"

export const CmsLayout = () => {
    const user = useSelector(state => state.user.value)

    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)
        if(!user) {
            const token = fromStorage('mernvs4token')

            if(token) {
                setLoading(true)

                http.get('/profile/details')
                    .then(({ data }) => {
                        dispatch(setUser(data))
                    })
                    .catch(() => {
                        
                    })
                    .finally(() => setLoading(false))
            } else {
                setLoading(false)
            }
        }
        else {
            setLoading(false)
        }
    }, [user])

    const handleLogout = () => {
        removeStorage('mernvs4token')

        dispatch(clearUser())
    }

    return loading ? <Loading /> : <>
        {user && <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={user.name} id="basic-nav-dropdown" align="end">
                            <Button variant="link" className="dropdown-item" onClick={handleLogout}>
                                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Logout
                            </Button>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>}
        <Container>
            <Outlet />
        </Container>
    </>
}