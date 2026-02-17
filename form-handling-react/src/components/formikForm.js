import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormikForm = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setStatus("User registered successfully!");
        resetForm();
      }
    } catch (error) {
      setStatus("Registration failed");
    }

    setSubmitting(false);
  };

  return (
    <div>
      <h2>Register (Formik)</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div>
              <label>Username</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="p" />
            </div>

            <div>
              <label>Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="p" />
            </div>

            <div>
              <label>Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="p" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Register"}
            </button>

            {status && <p>{status}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;