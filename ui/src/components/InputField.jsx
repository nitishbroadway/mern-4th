import { Form } from "react-bootstrap"

export const InputField = ({name, label, type = "text", formik}) => {
    return <div className="mb-3">
        <Form.Label htmlFor={name}>{label}</Form.Label>
        <Form.Control
            type={type}
            name={name}
            id={name}
            value={type != 'password' ? formik.values[name] : undefined}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched[name] && formik.errors[name]}
        />
        {formik.touched[name] && formik.errors[name] && <Form.Control.Feedback type="invalid">{formik.errors[name]}</Form.Control.Feedback>}
    </div>
}