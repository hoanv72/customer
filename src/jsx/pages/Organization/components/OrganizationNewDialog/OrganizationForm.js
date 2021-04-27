import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button } from 'react-bootstrap';

import { Form } from 'react-bootstrap'
import { COLUMNS_CONFIG } from '../../../../../utils/constants';
import { ROLES } from '../../../../../utils/constants/role';
import InlineDatePicker from '../../../../components/Forms/Pickers/InlineDatePicker';

const createInitialValues = (dmsPage) => {
  return COLUMNS_CONFIG[dmsPage].reduce((acc, cur) => {
    acc[cur.name] = '';
    return acc;
  }, {});
};

export default function OrganizationForm({
  saveData,
  data,
  id,
  dmsPage,
  onHide,
}) {
  const [initialValues, setInitialValues] = useState(() =>
    createInitialValues(dmsPage)
  );

  if (!initialValues) return "No initial value";

  return (
    <Formik
      initialValues={data ? data : initialValues}
      enableReinitialize
      onSubmit={(values, actions) => {
        let data = { ...values };
        delete data.id;
        saveData(data);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <div className='card-body'>
          <div className='basic-form'>
            <form onSubmit={props.handleSubmit} className='form-group'>
              <div className='form-row'>
                {COLUMNS_CONFIG[dmsPage].map((field) => {
                  switch (field.name) {
                    case 'birthday':
                      return (
                        <div className='form-group col-md-6'>
                          <label>{field.label}</label>
                          <InlineDatePicker
                            field={{ name: 'birthday' }}
                            form={{ setFieldValue: props.setFieldValue }}
                            className='form-control'
                          />
                        </div>
                      );
                    case 'sex':
                      return (
                        <div className='form-group col-md-6'>
                          <label>{field.label}</label>
                          <Form.Control as="select"
                            name={field.name}
                            className="form-control"
                            value={props.values[field.name]}
                            onChange={props.handleChange}
                          >
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                          </Form.Control>
                        </div>
                      );
                    case 'role':
                      return (
                        <div className='form-group col-md-6'>
                          <label>{field.label}</label>
                          <Form.Control as="select"
                            name={field.name}
                            className="form-control"
                            value={props.values[field.name]}
                            onChange={props.handleChange}
                          >
                            {ROLES.map(role => (
                              <option value={role.value}>
                                {role.label}
                              </option>))}
                          </Form.Control>
                        </div>
                      );
                    default:
                      return (
                        <div className='form-group col-md-6'>
                        <label>{field.label}</label>
                        <input
                          type='text'
                          className='form-control'
                          name={field.name}
                          value={props.values[field.name]}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />
                      </div>
                    )
                  }
                })}
              </div>

              <div className='form-row mt-5 justify-content-end'>
                <Button className='mr-2' variant='dark' onClick={onHide}>
                  Hủy
                </Button>
                <Button className='mr-2' variant='primary' type='submit'>
                  {id ? 'Lưu' : 'Cập nhật'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
}
