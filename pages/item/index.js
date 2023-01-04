import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const initialValues = {
    name: "",
    email: "",
    chanel: ""
}
const onSubmit = values => {
    console.log("form data", values);
}
const validationSchema = yup.object({
    name: yup.string().required("Required!"),
    email: yup.string().email("Invalid format email").required("Required"),
    chanel: yup.string().required("Required")
})

const index = () => {
    return (
        <Formik initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            <Form>
                <label>Name</label>
                <Field type="text" name="name"></Field>
                <ErrorMessage name="name">
                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                </ErrorMessage>
                <ErrorMessage name='name' style={{ color: "red" }} />

                <br />
                <label htmlFor="email">email</label>
                <Field type="text" name="email"></Field>
                <ErrorMessage name='email' />
                <br />
                <label>Chanel</label>
                <Field type="text" name="chanel"></Field>
                <ErrorMessage name="chanel" />
                <br />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
}

export default index
