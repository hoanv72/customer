import { unwrapResult } from "@reduxjs/toolkit";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { API_ENDPOINT } from "../../../../utils/constants";
import InlineDatePicker from "../../../components/Forms/Pickers/InlineDatePicker";
import { getList } from "../../Categories/Client/_redux/clientSlice";
import { useCustomerUIContext } from "../CustomerUIContext";
import { createList, getClientDetail } from "../_redux/customerSlice";
import CustomerContactTable from "./CustomerContactTable";
import { logout } from "../../../../redux/authSlice";

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
  { name: "fullname", label: "Họ tên" },
  { name: "phone", label: "SĐT" },
  { name: "position", label: "Vị trí" },
  { name: "email", label: "Email" },
  { name: "birthday", label: "Ngày sinh" },
  { name: "note", label: "Ghi chú" },
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
        getList({ url: "/client/type", oraganizeId: organizationId })
      );
      const getClientGroupAction = await dispatch(
        getList({ url: "/client/group", oraganizeId: organizationId })
      );
      const getClientChannelAction = await dispatch(
        getList({ url: "/client/channel", oraganizeId: organizationId })
      );
      let clientDetail = unwrapResult(getClientDetailAction);
      clientDetail = {
        ...clientDetail,
        fullname: clientDetail.contact && clientDetail.contact[0]?.fullname,
      };
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
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">
            {id ? "Cập nhật thông tin" : "Thêm khách hàng mới"}
          </h4>
          <Button
            className="mr-2"
            variant="primary"
            type="button"
            onClick={customerUIContext.goBack}
          >
            Quay lại
          </Button>
        </div>
        <div className="card-body">
          <div className="basic-form">
            <Formik
              initialValues={clientForEdit ? clientForEdit : initialValues}
              enableReinitialize
              validateOnChange={false}
              onSubmit={(values, actions) => {
                console.log(values);
                let data = {
                  ...values,
                  // channel_id: +values.channel_id,
                  // type_id: +values.type_id,
                  contact: [
                    {
                      fullname: values.contact[0].fullname,
                      phone: values.phone,
                      position: values.position,
                      email: values.email,
                      birthday: values.birthday,
                    },
                  ],
                };
                // delete data.id;
                delete data.status;
                delete data.createdAt;
                delete data.updatedAt;
                dispatch(
                  createList({
                    url: API_ENDPOINT[dmsPage],
                    values: data,
                    oraganizeId: organizationId,
                  })
                ).then((actionResult) => {
                  if (actionResult.payload.code === 1) {
                    let errorsValidate = {};
                    actionResult.payload.data.forEach((error) => {
                      if (error.message.includes("code")) {
                        errorsValidate.code = "Mã khách hàng đã tồn tại";
                      }
                      if (error.message.includes("type_id")) {
                        errorsValidate.type_id = "Loại khách hàng không hợp lệ";
                      }
                      if (error.message.includes("groud_id")) {
                        errorsValidate.groud_id =
                          "Nhóm khách hàng không hợp lệ";
                      }
                    });
                    setErrors({ ...errorsValidate });
                  }
                  if (actionResult.payload.code === 0) {
                    onHide();
                    actions.resetForm();
                    setErrors({});
                  }
                });

                actions.setSubmitting(false);
              }}
            >
              {(props) => {
                return (
                  <form onSubmit={props.handleSubmit}>
                    <div className="row">
                      <div
                        className="col-6"
                        style={{ borderRight: "1px solid #ccc" }}
                      >
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Mã khách hàng
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              className="form-control"
                              name="code"
                              value={props.values.code}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                            />
                            {errors && errors.code !== "" ? (
                              <p
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {errors.code}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Khách hàng
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={props.values.name}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                            />
                            {errors && errors.name !== "" ? (
                              <p
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {errors.name}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Loại khách hàng
                          </label>
                          <div className="col-sm-8">
                            <select
                              name="type_id"
                              value={
                                props.values[`TypeClient`] &&
                                props.values[`TypeClient`].id
                              }
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              className="form-control form-control-lg"
                            >
                              <option value={null}></option>
                              {clientType &&
                                clientType.map((type) => (
                                  <option value={type.id}>{type.name}</option>
                                ))}
                            </select>
                            {errors && errors.type_id !== "" ? (
                              <p
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {errors.type_id}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Nhóm khách hàng
                          </label>
                          <div className="col-sm-8">
                            <select
                              name="groud_id"
                              value={
                                props.values[`GroupClient`] &&
                                props.values[`GroupClient`].id
                              }
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              className="form-control form-control-lg"
                            >
                              <option value={null}></option>
                              {clientGroup &&
                                clientGroup.map((group) => (
                                  <option value={group.id}>{group.name}</option>
                                ))}
                            </select>
                            {errors && errors.groud_id !== "" ? (
                              <p
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {errors.groud_id}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Kênh
                          </label>
                          <div className="col-sm-8">
                            <select
                              name="channel_id"
                              value={
                                props.values[`ChannelClient`] &&
                                props.values[`ChannelClient`].id
                              }
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              className="form-control form-control-lg"
                            >
                              <option value={null}></option>
                              {clientChannel &&
                                clientChannel.map((channel) => (
                                  <option value={channel.id}>
                                    {channel.name}
                                  </option>
                                ))}
                            </select>
                            {errors && errors.channel_id !== "" ? (
                              <p
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {errors.channel_id}
                              </p>
                            ) : null}
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Địa chỉ
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              value={props.values.address}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                            />
                            {errors && errors.address !== "" ? (
                              <p
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {errors.address}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Địa chỉ giao hàng
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              className="form-control"
                              name="address_ship"
                              value={props.values.address_ship}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                            />
                            {errors && errors.address_ship !== "" ? (
                              <p
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {errors.address_ship}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Sinh nhật
                          </label>
                          <div className="col-sm-8">
                            <InlineDatePicker
                              field={{ name: "birthday" }}
                              value={props.values.birthday}
                              form={{ setFieldValue: props.setFieldValue }}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Người liên hệ
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              className="form-control"
                              name="fullname"
                              value={props.values.fullname}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                            />
                            {errors && errors.fullname !== "" ? (
                              <p
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {errors.fullname}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Chức vụ
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              className="form-control"
                              name="position"
                              value={props.values.position}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                            />
                            {errors && errors.position !== "" ? (
                              <p
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {errors.position}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">SĐT</label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              className="form-control"
                              name="phone"
                              value={props.values.phone}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                            />
                            {errors && errors.phone !== "" ? (
                              <p
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {errors.phone}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Email
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={props.values.email}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                            />
                            {errors && errors.email !== "" ? (
                              <p
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {errors.email}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row justify-content-end mt-5">
                      <Button
                        className="mr-2"
                        variant="dark"
                        onClick={customerUIContext.goBack}
                      >
                        Hủy
                      </Button>
                      <Button className="mr-2" variant="primary" type="submit">
                        {id ? "Cập nhật" : "Lưu"}
                      </Button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      {showTable && (
        <div className="row">
          <div className="col-12">
            <CustomerContactTable
              columns={columns}
              rows={clientContact}
              clientId={clientForEdit && clientForEdit.id}
            />
          </div>
        </div>
      )}
    </div>
  );
}
