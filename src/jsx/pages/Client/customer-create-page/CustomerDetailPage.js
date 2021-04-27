import { unwrapResult } from '@reduxjs/toolkit';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { API_ENDPOINT } from '../../../../utils/constants';
import InlineDatePicker from '../../../components/Forms/Pickers/InlineDatePicker';
import { getList } from '../../Categories/Client/_redux/clientSlice';
import { useCustomerUIContext } from '../CustomerUIContext';
import { createList, getClientDetail } from '../_redux/customerSlice';
import CustomerContactTable from './CustomerContactTable';
import { logout } from '../../../../redux/authSlice';

const initialValues = {
  name: null,
  code: null,
  groud_id: null,
  type_id: null,
  channel_id: null,
  address: null,
  address_lat: null,
  address_lng: null,
  address_ship: null,
  address_ship_lat: null,
  address_ship_lng: null,
  birthday: null,
  phone: null,
  email: null,
  position: null,
  fullname: null,
};

const columns = [
  { name: 'fullname', label: 'Họ tên' },
  { name: 'phone', label: 'SĐT' },
  { name: 'position', label: 'Vị trí' },
  { name: 'email', label: 'Email' },
  { name: 'birthday', label: 'Ngày sinh' },
  { name: 'note', label: 'Ghi chú' },
];

export default function CustomerCreatePage({
  onHide,
  dmsPage,
  segment,
  match,
  id,
  history,
  showTable,
  ...props
}) {
  const { organizationId } = useSelector((state) => state.auth);
  const customerUIContext = useCustomerUIContext();
  const dispatch = useDispatch();
  const [clientForEdit, setClientForEdit] = useState(null);
  const [clientContact, setClientContact] = useState(null);
  const [clientType, setClientType] = useState(null);
  const [clientGroup, setClientGroup] = useState(null);
  const [clientChannel, setClientChannel] = useState(null);

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function fetchClientDetail() {
      const getClientDetailAction = await dispatch(
        getClientDetail({
          url: API_ENDPOINT[dmsPage],
          id: id,
          oraganizeId: organizationId,
        })
      );
      const getClientTypeAction = await dispatch(
        getList({ url: '/client/type', oraganizeId: organizationId })
      );
      const getClientGroupAction = await dispatch(
        getList({ url: '/client/group', oraganizeId: organizationId })
      );
      const getClientChannelAction = await dispatch(
        getList({ url: '/client/channel', oraganizeId: organizationId })
      );
      const clientDetail = unwrapResult(getClientDetailAction);
      const clientTypeData = unwrapResult(getClientTypeAction);
      const clientGroupData = unwrapResult(getClientGroupAction);
      const clientChannelData = unwrapResult(getClientChannelAction);

      if (
        clientDetail.code === -2 ||
        clientTypeData.code === -2 ||
        clientGroupData.code === -2 ||
        clientChannelData.code === -2
      ) {
        dispatch(logout());
      }

      if (clientDetail) {
        setClientForEdit(clientDetail);
        setClientContact(clientDetail.contact);
      }
      if (clientTypeData) {
        setClientType(clientTypeData.data);
      }
      if (clientGroupData) {
        setClientGroup(clientGroupData.data);
      }
      if (clientChannelData) {
        setClientChannel(clientChannelData.data);
      }
    }

    fetchClientDetail();
  }, [id]);

  return (
    <div className='col-12'>
      <div className='card'>
        <div className='card-header'>
          <h4 className='card-title'>Thông tin chi tiết</h4>
          <Button
            className='mr-2'
            variant='primary'
            type='button'
            onClick={customerUIContext.goBack}
          >
            Quay lại
          </Button>
        </div>
        <div className='card-body'>
          <div className='basic-form'>
            <Formik
              initialValues={clientForEdit ? clientForEdit : initialValues}
              enableReinitialize
              validateOnChange={false}
            >
              {(props) => {
                return (
                  <form onSubmit={props.handleSubmit}>
                    <div className='row'>
                      <div
                        className='col-6'
                        style={{ borderRight: '1px solid #ccc' }}
                      >
                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label'>
                            Mã khách hàng
                          </label>
                          <div className='col-sm-8'>
                            {props.values.code}
                          </div>
                        </div>
                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label'>
                            Khách hàng
                          </label>
                          <div className='col-sm-8'>
                            {props.values.name}
                          </div>
                        </div>
                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label'>
                            Loại khách hàng
                          </label>
                          <div className='col-sm-8'>
                            {clientType &&
                              clientType.find((type) => (Number(type?.id) === Number(props.values[`TypeClient`]?.id)))?.name}
                          </div>
                        </div>
                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label'>
                            Nhóm khách hàng
                          </label>
                          <div className='col-sm-8'>
                            {clientGroup &&
                              clientGroup.find((group) => (
                                Number(group?.id) === Number(props.values[`GroupClient`]?.id)
                              ))?.name}
                          </div>
                        </div>
                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label'>
                            Kênh
                          </label>
                          <div className='col-sm-8'>
                            {clientChannel &&
                              clientChannel.find((channel) => (
                                Number(channel?.id) === Number(props.values[`ChannelClient`]?.id)
                              ))?.name}
                          </div>
                        </div>

                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label'>
                            Địa chỉ
                          </label>
                          <div className='col-sm-8'>
                            {props.values.address}
                          </div>
                        </div>
                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label'>
                            Địa chỉ giao hàng
                          </label>
                          <div className='col-sm-8'>
                            {props.values.address_ship}
                          </div>
                        </div>
                      </div>

                      <div className='col-6'>
                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label'>
                            Sinh nhật
                          </label>
                          <div className='col-sm-8'>
                            {props.values.birthday}
                          </div>
                        </div>
                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label'>
                            Người liên hệ
                          </label>
                          <div className='col-sm-8'>
                            {props.values.contact && props.values.contact[0] && props.values.contact[0].fullname}
                          </div>
                        </div>
                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label'>
                            Chức vụ
                          </label>
                          <div className='col-sm-8'>
                            {props.values.position}
                          </div>
                        </div>
                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label'>SĐT</label>
                          <div className='col-sm-8'>
                            {props.values.phone}
                          </div>
                        </div>
                        <div className='form-group row'>
                          <label className='col-sm-4 col-form-label'>
                            Email
                          </label>
                          <div className='col-sm-8'>
                            {props.values.email}
                          </div>
                        </div>
                      </div>
                    </div>

                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-12'>
          <CustomerContactTable
            columns={columns}
            rows={clientContact}
            readOnly
            clientId={clientForEdit && clientForEdit.id}
          />
        </div>
      </div>

    </div>
  );
}
