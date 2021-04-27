import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
// image
import logo from "../../images/logo-full.png";

const passwordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, "Mật khẩu ít nhất 6 kí tự")
    .required("Phải nhập mật khẩu cũ"),
  newPassword: Yup.string()
    .min(6, "Mật khẩu ít nhất 6 kí tự")
    .required("Phải nhập mật khẩu mới"),
});

const ChangePassword = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: passwordValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);

        // redirect user to home page
        history.push("/");
      }, 1500);
    },
  });
  const { errors } = formik;

  return (
    <div className="authincation h-100">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/">
                        <img src={logo} alt="gymove" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 text-white">
                      Change Password
                    </h4>
                    <div className="row">
                      <form onSubmit={formik.handleSubmit} className="col-12">
                        <div className="form-group row">
                          <label className="text-white">
                            <strong>Nhập mật khẩu hiện tại</strong>
                          </label>
                          <input
                            id="oldPassword"
                            name="oldPassword"
                            type="password"
                            className={
                              errors.oldPassword
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            value={formik.values.oldPassword}
                            onChange={formik.handleChange}
                          />
                          {errors.oldPassword && (
                            <span className="error-text">
                              {errors.oldPassword}
                            </span>
                          )}
                        </div>
                        <div className="form-group row">
                          <label className="text-white">
                            <strong>Nhập mật khẩu mới</strong>
                          </label>
                          <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            className={
                              errors.newPassword
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                          />
                          {errors.newPassword && (
                            <span className="error-text">
                              {errors.newPassword}
                            </span>
                          )}
                        </div>
                        <div className="text-center row mt-5 mb-3">
                          <button
                            type="submit"
                            className="btn bg-white text-primary btn-block"
                          >
                            CHANGE PASSWORD
                            {isLoading && (
                              <div
                                className="spinner-border text-primary ml-2"
                                role="status"
                                style={{ width: "1.5rem", height: "1.5rem" }}
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

