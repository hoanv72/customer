import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';

const columns = [
  { name: 'userId', label: 'Nhân viên' },
]

export default function OrganizationForm({
  saveData,
  data,
  id,
  dmsPage,
  onHide,
}) {
  const [initialValues, setInitialValues] = useState({userId: ''});

  if (!initialValues) return "No initial value";

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values, actions) => {
        let data = { ...values };
        delete data.id;
        saveData(data);
        actions.setSubmitting(false);
      }}
    >
      {(props) => {
        return (
        <div className='card-body'>
          <div className='basic-form'>
            <form onSubmit={props.handleSubmit} className='form-group'>
              <div className='form-row'>
                {columns.map((field) => {
                  switch (field.name) {
                    case 'userId':
                      return (
                        <div className='form-group col-md-6'>
                          <label>{field.label}</label>
                          <Form.Control as="select"
                            name={field.name}
                            className="form-control"
                            value={props.values[field.name]}
                            onChange={props.handleChange}
                          >
                            {data.map(item =>
                              <option value={item.id}>{item.fullname}</option>
                            )}
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
                  Thêm
                </Button>
              </div>
            </form>
          </div>
        </div>
        )
        }
      }
    </Formik>
  );
}
