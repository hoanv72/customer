import React from 'react';
import { Formik } from 'formik';
import { Button } from 'react-bootstrap';
import DMSIconPicker from '../.../../../../components/Forms/DMS/DMSIconPicker';
import { COLUMNS_CONFIG } from '../../../../utils/constants';

export default function CustomerEditForm({
  saveData,
  data,
  id,
  dmsPage,
  onHide,
}) {
  const createInitialValues = () => {
    let initialValues = {};
    COLUMNS_CONFIG[dmsPage].forEach((key) => {
      if (key === 'icon') {
        initialValues[key] = 'fas fa-coffee';
      } else if (key === 'color') {
        initialValues[key] = '#000000';
      } else {
        initialValues[key] = '';
      }
    });
    return initialValues;
  };

  return (
    <Formik
      initialValues={data !== null ? data : createInitialValues()}
      onSubmit={(values, actions) => {
        saveData(values);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <div className='card-body'>
          <div className='basic-form'>
            <form onSubmit={props.handleSubmit} className='form-group'>
              <div className='form-row'>
                {COLUMNS_CONFIG[dmsPage].map((field) => {
                  if (field.name === 'icon') {
                    return (
                      <div className='form-group col-md-6'>
                        <label>Icon</label>
                        <DMSIconPicker
                          fieldname={'icon'}
                          value={props.values.icon}
                        />
                      </div>
                    );
                  } else if (field.name === 'color') {
                    return (
                      <div className='form-group col-md-6'>
                        <label>Màu sắc</label>
                        <input
                          type='color'
                          className='as_colorpicker form-control'
                          name='color'
                          value={props.values.color}
                          onChange={props.handleChange}
                        />
                      </div>
                    );
                  } else {
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
                    );
                  }
                })}
              </div>

              <div className='form-row mt-5 justify-content-end'>
                <Button className='mr-2' variant='dark' onClick={onHide}>
                  Hủy
                </Button>
                <Button className='mr-2' variant='primary' type='submit'>
                  {id === null ? 'Lưu' : 'Cập nhật'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
}
