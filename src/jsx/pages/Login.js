import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

import { Formik } from 'formik';
import * as Yup from 'yup';
// image
import svgLogo from '../../images/logo-dms.svg';
import { login } from '../../redux/authSlice';

const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Phải nhập tên tài khoản'),
  password: Yup.string()
    .min(6, 'Mật khẩu ít nhất 6 kí tự')
    .required('Phải nhập mật khẩu'),
});

const Login = ({ history, ...props }) => {
  const dispatch = useDispatch();
  const loggingIn = useSelector((state) => state.auth.loggingIn);
  return (
    <div className='authincation h-100 p-meddle'>
      <div className='container h-100'>
        <div className='row justify-content-center h-100 align-items-center'>
          <div className='col-md-6'>
            <div className='authincation-content'>
              <div className='row no-gutters'>
                <div className='col-xl-12'>
                  <div className='auth-form'>
                    <div className='text-center mb-5'>
                      <Link to='/'>
                        <img src={svgLogo} alt='' />
                      </Link>
                    </div>
                    <h4 className='text-center mb-4 text-white'>
                      Đăng nhập vào tài khoản của bạn
                    </h4>
                    {/* {alert.message && (
                      <div className={`alert ${alert.type}`}>
                        {alert.message}
                      </div>
                    )} */}
                    <Formik
                      initialValues={{ username: '', password: '' }}
                      validationSchema={loginValidationSchema}
                      validateOnChange={false}
                      onSubmit={async (values, actions) => {
                        const action = login({
                          username: values.username,
                          password: values.password,
                        });
                        const actionResult = await dispatch(action);
                        const user = unwrapResult(actionResult);

                        if (user) {
                          history.push('/');
                        }
                        actions.setSubmitting(false);
                      }}
                    >
                      {(props) => {
                        return (
                          <form onSubmit={props.handleSubmit}>
                            <div className='form-group'>
                              <label className='mb-1 text-white'>
                                <strong>Tên tài khoản</strong>
                              </label>
                              <input
                                name='username'
                                type='text'
                                className='form-control'
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.username}
                              />
                              {props.touched.username &&
                              props.errors.username !== '' ? (
                                <p
                                  className='invalid-feedback'
                                  style={{ display: 'block' }}
                                >
                                  {props.errors.username}
                                </p>
                              ) : null}
                            </div>
                            <div className='form-group'>
                              <label className='mb-1 text-white'>
                                <strong>Mật khẩu</strong>
                              </label>
                              <input
                                type='password'
                                className='form-control'
                                name='password'
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.password}
                              />
                              {props.touched.password &&
                              props.errors.password !== '' ? (
                                <p
                                  className='invalid-feedback'
                                  style={{ display: 'block' }}
                                >
                                  {props.errors.password}
                                </p>
                              ) : null}
                            </div>
                            <div className='form-row d-flex justify-content-between mt-4 mb-2'>
                              <div className='form-group'></div>
                              <div className='form-group'>
                                <Link
                                  className='text-white'
                                  to='page-forgot-password'
                                >
                                  Quên mật khẩu?
                                </Link>
                              </div>
                            </div>
                            <div className='text-center'>
                              <button
                                type='submit'
                                className='btn bg-white text-primary btn-block'
                              >
                                Đăng nhập
                                {loggingIn && (
                                  <img
                                    className='pl-2'
                                    src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
                                  />
                                )}
                              </button>
                            </div>
                          </form>
                        );
                      }}
                    </Formik>
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

export default Login;
