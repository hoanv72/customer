import React from 'react'
import { Modal,Card,Table ,Button } from 'react-bootstrap';

export default function ModalListUser({ modal, onHideModal,listUser,setListUserForm }) {
    const columns = [
        { name: 'code', label: 'Mã khách hàng' },
        { name: 'name', label: 'Tên khách hàng' },
        { name: 'TypeClient', label: 'Loại khách hàng' },
        { name: 'GroupClient', label: 'Nhóm khách hàng' },
        { name: 'Action', label: '' },
    ];
  const [userSelect,setUserSelect] = React.useState([])
    const chackbox = document.querySelectorAll(".bs_exam_topper input");
    const motherChackBox = document.querySelector(".bs_exam_topper_all input");
  const chackboxFun = (type) => {
      for (let i = 0; i < chackbox.length; i++) {
        const element = chackbox[i];
        if (type === "all") {
          if (motherChackBox.checked) {
            element.checked = true;
          } else {
            element.checked = false;
          }
        } else {
          if (!element.checked) {
            motherChackBox.checked = false;
            break;
          } else {
            motherChackBox.checked = true;
          }
        }
      }
        setUserSelect((userSelect.push(type), userSelect));
  };
  const saveListUser = () => {
    setListUserForm(userSelect)
    onHideModal()
  }
    return (
        <Modal
        size='xl'
        show={modal}
        onHide={onHideModal}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Header closeButton>
                <Modal.Title id='example-modal-sizes-title-lg'>Danh sách khách hàng</Modal.Title>
            </Modal.Header>
            <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                <th className="width50 ">
                      <div className="custom-control custom-checkbox checkbox-success check-lg mr-3 bs_exam_topper_all">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="checkAll"
                          required=""
                          onClick={() => chackboxFun("all")}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="checkAll"
                        ></label>
                      </div>
                    </th>
                  {columns.map((column) => (
                    <th key={column.name}>
                      <strong style={{ textTransform: 'uppercase' }}>
                        {column.label}
                      </strong>
                    </th>
                  ))}
                
                </tr>
              </thead>
              <tbody>
                  {listUser && listUser.length ? listUser.map((items) => (
              <tr key={items.id}>
                    <td>
                      <div className="custom-control custom-checkbox checkbox-success check-lg mr-3 bs_exam_topper">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={`customCheckBox${items.id}`}
                          required=""
                          onClick={() => chackboxFun(items)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`customCheckBox${items.id}`}
                        ></label>
                      </div>
                    </td>
                    <td>
                        <strong>{ items.code }</strong>
                      </td>
                      <td>
                        <strong>{ items.name }</strong>
                      </td>
                      <td>
                        <strong>{ items.TypeClient ? items.TypeClient:null  }</strong>
                    </td>
                      <td>
                        <strong>{ items.GroupClient ? items.GroupClient:null  }</strong>
                    </td>
                </tr>
                  )) : null}
              </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
        <div className='form-row mt-5 justify-content-end'>
                <Button onClick={saveListUser} className='mr-2' variant='primary'>
                    Lưu
                </Button>
              </div>
        </Card.Footer>
      </Modal>
    )
}
