import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Table,
  Form as FormCheck,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import moment from "moment";
import { toastr } from "react-redux-toastr";
import "../styles.css";

import { routeService } from "../../../../../services/route/route.service";
import AddClient from "../Modal/AddClient";
import DeleteClient from "../Modal/DeleteClient";
import { useHistory } from "react-router";

const AddRoute = () => {
  const { organizationId } = useSelector((state) => state.auth);
  const [selectedClient, setSelectedClient] = useState([]);
  const [listEmployee, setListEmployee] = useState([]);
  const [listClient, setListClient] = useState([]);
  const [visible, setVisible] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [idToRemove, setIdToRemove] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetchEmployee();
  }, []);
  useEffect(() => {
    fetchClient();
  }, []);

  const addRoute = (values) => {
    const data = {
      code: values?.code,
      name: values?.name,
      customer_user: parseInt(values?.customer_user),
      start: values?.start ? moment(values?.start).format("YYYY-MM-DD") : "",
      client: selectedClient.map((client) => ({
        id: client?.id,
        monday: client?.monday,
        tuesday: client?.tuesday,
        wednesday: client?.wednesday,
        thursday: client?.thursday,
        friday: client?.friday,
        saturday: client?.saturday,
        sunday: client?.sunday,
        week_1: client?.week_1,
        week_2: client?.week_2,
        week_3: client?.week_3,
        week_4: client?.week_4,
      })),
    };
    createNewRoute(data);
  };

  const createNewRoute = async (body) => {
    if (organizationId !== null) {
      const result = await routeService.createRoute(organizationId, body);
      const data = result?.data || {};
      if (data.code === -2) {
        return toastr.error("T???o m???i tuy???n b??? l???i");
      }
      toastr.success("T???o tuy???n th??nh c??ng");
      history.push("/route");
    }
  };
  const fetchEmployee = async () => {
    if (organizationId !== null) {
      const result = await routeService.getListClient(organizationId);
      const data = result?.data || {};
      if (data.code === -2) {
        return toastr.error("L???y th??ng tin kh??ch h??ng l???i");
      }
      if (data) {
        setListEmployee(data.data);
      }
    }
  };

  const dateHeaders = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
    "week_1",
    "week_2",
    "week_3",
    "week_4",
  ];

  const fetchClient = async () => {
    if (organizationId !== null) {
      const result = await routeService.getListClient(organizationId);
      const data = result?.data || {};
      if (data.code === -2) {
        return toastr.error("L???y th??ng tin kh??ch h??ng l???i");
      }
      if (data) {
        const newData = (data?.data || []).map((item) => ({
          ...item,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
          week_1: false,
          week_2: false,
          week_3: false,
          week_4: false,
        }));
        setListClient(newData);
      }
    }
  };
  const onChange = (key, row) => (event) => {
    row[key] = event.target.checked;
    const newListClient = selectedClient.map((client) =>
      client?.id === row?.id ? row : client
    );
    setSelectedClient(newListClient);
  };

  const removeSelectdClient = (id) => {
    setIdToRemove(id);
    setShowConfirm(true);
  };

  const onOk = () => {
    const newSelected = selectedClient.filter(
      (client) => client?.id !== idToRemove
    );
    setShowConfirm(false);
    setSelectedClient(newSelected);
    toastr.success("???? x??a kh??ch h??ng ????? th??m");
  };

  function validateCode(value) {
    let error;
    if (!value) {
      error = "M?? tuy???n kh??ng th??? tr???ng!";
    }
    return error;
  }

  function validateName(value) {
    let error;
    if (!value) {
      error = "T??n tuy???n kh??ng th??? tr???ng";
    }
    return error;
  }

  function validateEmployee(value) {
    let error;
    if (!value) {
      error = "Nh??n vi??n kh??ng th??? tr???ng!";
    }
    return error;
  }

  function validateDate(value) {
    let error;
    if (!value) {
      error = "Ng??y kh??ng th??? tr???ng!";
    }
    return error;
  }
  return (
    <>
      <Card>
        <Formik
          initialValues={{ name: "", code: "", customer_user: "", start: "" }}
          onSubmit={(values) => {
            addRoute(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Card.Header>
                <Card.Title> Th??m tuy???n</Card.Title>
                <Button type="submit" className="btn btn-primary">
                  X??c nh???n
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="field">
                  <label>M?? tuy???n</label>
                  <Field
                    validate={validateCode}
                    className="form-control"
                    name="code"
                    placeholder="??i???n m?? tuy???n"
                  />
                  {errors.code && touched.code && (
                    <div className="ml-2 text-danger">{errors.code}</div>
                  )}
                </div>
                <div className="field">
                  <label>T??n tuy???n</label>
                  <Field
                    validate={validateName}
                    className="form-control"
                    name="name"
                    placeholder="??i???n t??n tuy???n"
                  />
                  {errors.name && touched.name && (
                    <div className="ml-2 text-danger">{errors.name}</div>
                  )}
                </div>
                <div className="field">
                  <label>Nh??n vi??n</label>
                  <Field
                    className="form-control"
                    as="select"
                    name="customer_user"
                    validate={validateEmployee}
                  >
                    <option value="null">Ch???n nh??n vi??n</option>
                    {listEmployee?.map((employee) => (
                      <option key={employee?.id} value={employee?.id}>
                        {employee?.name}
                      </option>
                    ))}
                  </Field>
                  {errors.customer_user && touched.customer_user && (
                    <div className="ml-2 text-danger">
                      {errors.customer_user}
                    </div>
                  )}
                </div>
                <div className="field">
                  <label>Ng??y t???o</label>
                  <Field
                    name="start"
                    className="form-control"
                    validate={validateDate}
                    format="DD/MM/YYYY"
                    placeholder="dd/mm/yyyy"
                  >
                    {({ field }) => (
                      <div>
                        <input
                          {...field}
                          type="date"
                          className="form-control mb-2"
                        />
                      </div>
                    )}
                  </Field>
                  {errors.start && touched.start && (
                    <div className="ml-2 text-danger">{errors.start}</div>
                  )}
                </div>
              </Card.Body>
            </Form>
          )}
        </Formik>

        <Row>
          <Col span={24} style={{ paddingTop: "0.5rem" }}>
            <Button
              className="btn btn-primary mb-4 ml-4"
              onClick={() => setVisible(true)}
            >
              Th??m kh??ch h??ng
            </Button>
            <div className="table-responsive" style={{ marginLeft: "-15px" }}>
              <Table responsive>
                <thead>
                  <tr>
                    <th rowSpan="2">M?? kh??ch h??ng</th>
                    <th rowSpan="2">T??n kh??ch h??ng</th>
                    <th rowSpan="2">T2</th>
                    <th rowSpan="2">T3</th>
                    <th rowSpan="2">T4</th>
                    <th rowSpan="2">T5</th>
                    <th rowSpan="2">T6</th>
                    <th rowSpan="2">T7</th>
                    <th rowSpan="2">CN</th>
                    <th className="text-center" colSpan="4">
                      T???n su???t
                    </th>
                    <th rowSpan="2">X??a</th>
                  </tr>
                  <tr>
                    <td>W1</td>
                    <td>W2</td>
                    <td>W3</td>
                    <td>W4</td>
                  </tr>
                </thead>
                <tbody>
                  {selectedClient && selectedClient.length > 0 ? (
                    selectedClient.map((client) => (
                      <tr style={{ background: "#fff" }}>
                        <td>{client.code}</td>
                        <td>{client.name}</td>
                        {dateHeaders.map((header) => (
                          <td key={header}>
                            <FormCheck.Check
                              style={{ background: "white" }}
                              name={header}
                              value={client[header]}
                              // className="selected-client-checkbox"
                              onChange={onChange(header, client)}
                            />
                          </td>
                        ))}
                        <td>
                          <div
                            onClick={() => removeSelectdClient(client.id)}
                            className="btn btn-pill btn-danger mr-2 btn-sm"
                          >
                            <i className="fa fa-trash mr-2"></i>
                            X??a
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="14">
                        <div>Ch??a ch???n kh??ch h??ng ????? th??m</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
          {visible && (
            <AddClient
              visible={visible}
              handleCancel={() => setVisible(false)}
              handleOk={(listClient) => setSelectedClient(listClient)}
              selectedClient={selectedClient}
              listClient={listClient}
            />
          )}
          <DeleteClient
            visible={showConfirm}
            onCancel={() => setShowConfirm(false)}
            onOk={() => onOk()}
          />
        </Row>
      </Card>
    </>
  );
};

export default AddRoute;
