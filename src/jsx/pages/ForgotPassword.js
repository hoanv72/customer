import React, { useState } from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import * as Yup from 'yup';
// image
import logo from '../../images/logo-full.png';

const emailValidationSchema = Yup.string()
  .email()
  .required('Phải nhập địa chỉ email');

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const phoneNumberValidationSchema = Yup.string()
  .min(10, 'Số điện thoại không ít hơn 9 số')
  .max(11, 'Số điện thoại không vượt quá 10 số')
  .required('Phải nhập số điện thoại')
  .matches(phoneRegExp, 'Số điện thoại không hợp lệ');

const ForgotPassword = ({ history }) => {
  let { path } = useRouteMatch();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    // validate input value before sending request
    if (path.includes('email')) {
      emailValidationSchema.isValid(value).then((valid) => {
        if (!valid) {
          setError('Phải nhập địa chỉ email hợp lệ');
        } else {
          console.log('email is valid');
          setIsLoading(true);
          setTimeout(() => {
            // fake sending request
            setIsLoading(false);
          }, 1300);
          setTimeout(() => {
            // redirect user to login page
            history.push('/page-login');
          }, 1500);
        }
      });
    }
    if (path.includes('phone')) {
      phoneNumberValidationSchema.isValid(value).then((valid) => {
        if (!valid) {
          setError('Phải nhập số điện thoại hợp lệ');
        } else {
          console.log('phone number is valid');
          setIsLoading(true);
          setTimeout(() => {
            // fake sending request
            setIsLoading(false);
          }, 1300);
          setTimeout(() => {
            // redirect user to login page
            history.push('/page-login');
          }, 1500);
        }
      });
    }
  };
  return (
    <div className='authincation h-100 p-meddle'>
      <div className='container h-100'>
        <div className='row justify-content-center h-100 align-items-center'>
          <div className='col-md-6'>
            <div className='authincation-content'>
              <div className='row no-gutters'>
                <div className='col-xl-12'>
                  <div className='auth-form'>
                    <div className='text-center mb-3'>
                      <Link to='/'>
                        <img src={logo} alt='' />
                      </Link>
                    </div>
                    <h4 className='text-center mb-4 text-white'>
                      Forgot Password
                    </h4>
                    <Route exact path='/page-forgot-password'>
                      <p className='text-white'>Lấy lại mật khẩu bằng cách</p>
                      <div className='text-center row mb-3'>
                        <Link
                          to='/page-forgot-password/email'
                          className='btn bg-white text-primary btn-block'
                        >
                          Nhận qua email
                        </Link>
                      </div>
                      <div className='text-center row'>
                        <Link
                          to='/page-forgot-password/phone'
                          className='btn bg-white text-primary btn-block'
                        >
                          Nhận qua số điện thoại
                        </Link>
                      </div>
                    </Route>

                    <div className='row'>
                      <form onSubmit={(e) => onSubmit(e)} className='col-12'>
                        {path.includes('email') && (
                          <div className='form-group row'>
                            <label className='text-white'>
                              <strong>
                                Nhập email sử dụng đăng kí tài khoản
                              </strong>
                            </label>
                            <input
                              type='email'
                              className={
                                error !== ''
                                  ? 'form-control is-invalid'
                                  : 'form-control'
                              }
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                            />
                            {error && (
                              <span className='error-text'>{error}</span>
                            )}
                          </div>
                        )}
                        {path.includes('phone') && (
                          <div className='form-group row'>
                            <label className='text-white'>
                              <strong>
                                Nhập số điện thoại đã sử dụng để đăng kí tài
                                khoản
                              </strong>
                            </label>
                            <input
                              type='text'
                              className={
                                error !== ''
                                  ? 'form-control is-invalid'
                                  : 'form-control'
                              }
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                            />
                            {error && (
                              <span className='error-text'>{error}</span>
                            )}
                          </div>
                        )}
                        {path.includes('email') || path.includes('phone') ? (
                          <>
                            <div className='text-center row mt-5 mb-3'>
                              <button
                                type='submit'
                                className='btn bg-white text-primary btn-block'
                              >
                                {!isLoading ? 'SUBMIT' : 'SENDING NEW PASSWORD'}
                              </button>
                            </div>
                            <div className='text-center row'>
                              <Link
                                to='/page-forgot-password'
                                className='btn bg-white text-primary btn-block'
                              >
                                GO BACK
                              </Link>
                            </div>
                          </>
                        ) : null}
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

export default ForgotPassword;
