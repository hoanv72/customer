import { Field, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
// image
import logo from '../../images/logo-full.png';
import InlineDatePicker from '../components/Forms/Pickers/InlineDatePicker';

const RegistrationSchema = Yup.object().shape({
  phone: Yup.string().required('Vui lòng nhập số điện thoại'),
  // .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
  email: Yup.string()
    .required('Vui lòng nhập địa chỉ email')
    .email('Email không hợp lệ'),
  fullname: Yup.string().required('Vui lòng nhập đầy đủ họ và tên'),
  password: Yup.string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  birthday: Yup.string().required('Vui lòng chọn ngày/tháng/năm sinh của bạn'),
});

const Register = ({ history }) => {
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
                      Sign up your account
                    </h4>
                    <Formik
                      initialValues={{
                        phone: '',
                        email: '',
                        fullname: '',
                        password: '',
                        birthday: '',
                      }}
                      validationSchema={RegistrationSchema}
                      validateOnChange={false}
                      onSubmit={(values) => {
                        alert(JSON.stringify(values, null, 2));
                      }}
                    >
                      {({
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                        touched,
                      }) => {
                        return (
                          <form onSubmit={handleSubmit}>
                            {/* Full Name */}
                            <CustomField
                              label='FullName'
                              name='fullname'
                              value={values.fullname}
                              handleChange={handleChange}
                              errors={errors}
                              touched={touched}
                            />
                            {/* Email */}
                            <CustomField
                              label='Email'
                              name='email'
                              value={values.email}
                              handleChange={handleChange}
                              type='email'
                              placeholder='admin@admin.com'
                              errors={errors}
                              touched={touched}
                            />
                            {/* Password */}
                            <CustomField
                              name='password'
                              type='password'
                              label='Password'
                              value={values.password}
                              handleChange={handleChange}
                              errors={errors}
                              touched={touched}
                            />
                            {/* Phone number */}
                            <CustomField
                              name='phone'
                              label='Phone Number'
                              value={values.phone}
                              handleChange={handleChange}
                              errors={errors}
                              touched={touched}
                            />
                            {/* Birthday */}
                            <div className='form-group'>
                              <label className='mb-1 text-white'>
                                <strong>Birthday</strong>
                              </label>

                              <Field
                                component={InlineDatePicker}
                                name='birthday'
                              />
                              {touched['birthday'] &&
                              errors['birthday'] !== '' ? (
                                <p className='invalid-feedback'>
                                  {errors['birthday']}
                                </p>
                              ) : null}
                            </div>
                            {/* Control button */}
                            <div className='text-center mt-4'>
                              <button
                                type='submit'
                                className='btn bg-white text-primary btn-block'
                              >
                                Sign me up
                              </button>
                            </div>
                          </form>
                        );
                      }}
                    </Formik>
                    {/* <form onSubmit={formik.handleSubmit}>
                      
                    </form> */}
                    <div className='new-account mt-3'>
                      <p className='text-white'>
                        Already have an account?
                        <Link className='ml-1 text-white' to='/page-login'>
                          Sign in
                        </Link>
                      </p>
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

function CustomField({
  name,
  label,
  handleChange,
  value,
  type = 'text',
  placeholder = '',
  errors,
  touched,
}) {
  return (
    <div className='form-group'>
      <label className='mb-1 text-white'>
        <strong>{label}</strong>
      </label>
      <input
        type={type}
        name={name}
        className={
          touched[name] && errors[name] !== ''
            ? 'form-control is-invalid'
            : 'form-control'
        }
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {touched[name] && errors[name] !== '' ? (
        <p className='invalid-feedback'>{errors[name]}</p>
      ) : null}
    </div>
  );
}
export default Register;
