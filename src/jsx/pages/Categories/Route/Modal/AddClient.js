import React, { useEffect, useRef, useState } from "react";
import { Modal, Container, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { routeService } from "../../../../../services/route/route.service";

const AddClient = ({
  visible,
  handleOk,
  handleCancel,
  selectedClient,
  listClient,
}) => {
  const [displayClient, setDisplayClient] = useState(listClient);
  const [currentSelectClient, setCurrentSelectedClient] = useState([]);
  const refSelect = useRef(null);

  useEffect(() => {
    const currentSelectClient = selectedClient.map((client) => client?.id);
    setCurrentSelectedClient(currentSelectClient);
  }, [selectedClient]);

  // const onSearch = (value) => {
  //   const displayClient = listClient.filter(
  //     (client) =>
  //       client?.name?.toLowerCase().includes(value?.toLowerCase()) ||
  //       client?.id?.toLowerCase().includes(value?.toLowerCase())
  //   );
  //   setDisplayClient(displayClient);
  // };

  const onChange = (event) => {
    setCurrentSelectedClient(Array.from(event.target.selectedOptions, option => option.value));
  };

  const onOk = () => {
    const selectedClientForRoute = listClient.filter((client) =>
      currentSelectClient.includes(client?.id)
    );
    handleOk(selectedClientForRoute);
    handleCancel();
  };
  return (
    <Modal className="fade" show={visible} size="lg" onHide={handleCancel}>
      <Modal.Header>
        <Modal.Title>Thêm khách hàng</Modal.Title>
        <Button variant="" className="close" onClick={handleCancel}>
          <span>&times;</span>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {/* <Select
            style={{ width: "100%" }}
            placeholder="Chọn khách hàng"
            onSearch={onSearch}
            showSearch
            mode="multiple"
            onChange={onChange}
            value={currentSelectClient}
          >
            {displayClient.map((client) => (
              <Option key={client?.id} value={client?.id}>
                {client?.id} - {client?.name}
              </Option>
            ))}
          </Select> */}

          <Form.Label>Chọn khách hàng</Form.Label>
          <Form.Control
            onChange={onChange}
            as="select"
            multiple
            style={{ height: "200px" }}
            value={currentSelectClient}
            ref={refSelect}
          >
            {displayClient.map((client) => (
              <option key={client?.id} value={client?.id}>
                {client?.id} - {client?.name}
              </option>
            ))}
          </Form.Control>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger light" onClick={handleCancel}>
          Hủy
        </Button>
        <Button variant="primary" onClick={onOk}>
          Thêm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddClient;
