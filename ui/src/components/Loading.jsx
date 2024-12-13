import { Col, Row } from "react-bootstrap"

export const Loading = () => {
    return <Row>
        <Col className="my-3 text-center">
            <i className="fa-solid fa-spinner fa-spin me-2"></i>Loading...
        </Col>
    </Row>
}