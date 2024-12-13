import { Button, Col, Form, Row } from "react-bootstrap"
import { InputField } from "../../../components"
import {useFormik} from "formik"
import * as Yup from "yup"
import YupPassword from "yup-password"
import http from "../../../http"
import { inStorage, validationError } from "../../../lib"
import { setUser } from "../../../store/user.slice"
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"

YupPassword(Yup)

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required().email(),
            password: Yup.string().required().minLowercase(1).minUppercase(1).minNumbers(1).minSymbols(1)
        }),
        onSubmit: (data) => {
            http.post('/auth/login', data)
                .then(({data}) => {
                    inStorage('mernvs4token', data.token)

                    return http.get('/profile/details')
                })
                .then(({data}) => {
                    dispatch(setUser(data))

                    navigate('/cms')
                })
                .catch(({response}) => {
                    validationError(formik, response)
                })
                .finally(() => {})
        }
    })

    return <Row>
        <Col lg="4" className="bg-white py-3 my-5 mx-auto rounded-2 shadow-sm">
            <Row>
                <Col className="text-center">
                    <h1>Login</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <InputField type="email" name="email" label="Email" formik={formik} />

                        <InputField type="password" name="password" label="Password" formik={formik} />
                        
                        <div className="d-grid">
                            <Button variant="dark" type="submit">
                                <i className="fa-solid fa-arrow-right-to-bracket me-2"></i>Log In
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Col>
    </Row>
}