import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button } from 'react-bootstrap';
import { COLUMNS_CONFIG } from '../../../../../utils/constants';
import DMSIconPicker from '../../../../components/Forms/DMS/DMSIconPicker';
import ListUser from './ListUser';
import ModalListUser from './ModalListUser';

const createInitialValues = (dmsPage) => {
  let initialValues = {};
  COLUMNS_CONFIG[dmsPage].forEach((item) => {
    if (item.name === 'icon') {
      initialValues[item.name] = 'fas fa-coffee';
    } else if (item.name === 'color') {
      initialValues[item.name] = '#000000';
    } else {
      initialValues[item.name] = '';
    }
  });
  return initialValues;
};

export default function TargetEditForm({
  saveData,
  data,
  id,
  dmsPage,
  onHide,
  listUser
}) {
  const [modal, setModal] = useState(false);
  const [rowsState, setRowState] = useState([])
  const [listUserForm, setListUserForm] = useState([]);
  const [initialValues, setInitialValues] = useState(() =>
    createInitialValues(dmsPage)
  );
  console.log(rowsState);
  const onHideModal =()=>setModal(false)
  if (initialValues === null) return null;
  return (
    <Formik
      initialValues={data ? data : initialValues}
      enableReinitialize
      onSubmit={(values, actions) => {
        // saveData(data);
        const data = {
          name: values.name,
          code: values.code,
          customer_user:values.personal,
          start: values.start_time,
          client:rowsState
        }
        saveData(data)
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <div className='card-body'>
          <ModalListUser setListUserForm={setListUserForm} listUser={listUser} onHideModal={onHideModal} modal={modal} />
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
                  }else if (field.name === 'start_time') {
                    return (
                      <div className='form-group col-md-6'>
                        <label>Ngày bắt đầu </label>
                        <input
                          type='date'
                          className='as_colorpicker form-control'
                          name='start_time'
                          value={props.values.start_time}
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
                <Button onClick={()=>setModal(true)} className='mr-2' variant='primary'>
                    Thêm khách hàng
                </Button>
              </div>
              <ListUser rowsState={rowsState}  setRowState={setRowState}   listUserForm={ listUserForm }/>
              <div className='form-row mt-5 justify-content-end'>
                <Button className='mr-2' variant='dark' onClick={onHide}>
                  Hủy
                </Button>
                <Button className='mr-2' variant='primary' type='submit'>
                  {id === undefined ? 'Lưu' : 'Cập nhật'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
}
