import React,{useState} from 'react';
import { Row, Col, Card, Table, } from 'react-bootstrap';
import { Checkbox } from 'antd';

const columns = [
  { name: 'code', label: 'Mã khách hàng' },
  { name: 'name', label: 'Tên khách hàng' },
  { name: 'TypeClient', label: 'Loại khách hàng' },
  { name: 'GroupClient', label: 'Nhóm khách hàng' },
  { name: 'monday', label: 'T2' },
  { name: 'tuesday', label: 'T3' },
  { name: 'wednesday', label: 'T4' },
  { name: 'thursday', label: 'T5' },
  { name: 'friday', label: 'T6' },
  { name: 'saturday', label: 'T7' },
  { name: 'sunday', label: 'CN' },
  { name: 'week_1', label: 'W1' },
  { name: 'week_2', label: 'W2' },
  { name: 'week_3', label: 'W3' },
  { name: 'week_4', label: 'W4' },
  { name: 'Action', label: '' },
];
export default function ListUser({ listUserForm ,rowsState,setRowState }) {
  

const checkExist = (clientId) => {
  const isExist = rowsState.findIndex((d) => d.id === clientId);
  if(isExist !== -1){
    return true;
  }

  return false;
}

  const handle = (e, index, clientId,) => {
    const { name, checked } = e.target
    const isExist = checkExist(clientId);
    if(!isExist){
      let  data1 = [...rowsState, { id: clientId, [name]: checked }]
      setRowState(data1)
    }else{
      let data2 = rowsState.map((d) => {
        if (d.id === clientId) {
          return {...d,
            [name]: checked
          }
        }else {
          return {...d}
        }
      })
      setRowState(data2)
    }
  }
  // function onChange(e, index, id) {
  //   const { name, checked } = e.target
  //   let  object={
  //     client: id,
  //     [name]: checked ? checked:false ,
  //   }

  //   setRowState(rowsState.concat(object));

  //   // console.log( `${e.target.name} = ${e.target.checked}`);
  // }
  return  (
    <Row>
      <Col lg={12}>
        <Card>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.name}>
                      <strong style={{ textTransform: 'uppercase' }}>
                        {column.label}
                      </strong>
                    </th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                  {listUserForm && listUserForm.length ? listUserForm.map((items,index) => (
              <tr key={items.id}>
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
                      <td>
                        <Checkbox name="monday"  onChange={e=>handle(e,index,items.id)}></Checkbox>
                      </td>
                      <td>
                        <Checkbox name="tuesday"   onChange={(e)=>handle(e,index,items.id)}></Checkbox>
                      </td>
                      <td>
                        <Checkbox name="wednesday"   onChange={(e)=>handle(e,index,items.id)}></Checkbox>
                      </td>
                      <td>
                        <Checkbox name="thursday"   onChange={(e)=>handle(e,index,items.id)}></Checkbox>
                      </td>
                      <td>
                        <Checkbox name="friday"   onChange={(e)=>handle(e,index,items.id)}></Checkbox>
                      </td>
                      <td>
                        <Checkbox name="saturday"   onChange={(e)=>handle(e,index,items.id)}></Checkbox>
                      </td>
                      <td>
                        <Checkbox name="sunday"   onChange={(e)=>handle(e,index,items.id)}></Checkbox>
                      </td>
                      <td>
                        <Checkbox name="week_1"   onChange={(e)=>handle(e,index,items.id)}></Checkbox>
                      </td>
                      <td>
                        <Checkbox name="week_2"   onChange={(e)=>handle(e,index,items.id)}></Checkbox>
                      </td>
                      <td>
                        <Checkbox name="week_3"   onChange={(e)=>handle(e,index,items.id)}></Checkbox>
                      </td>
                      <td>
                        <Checkbox name="week_4"   onChange={(e)=>handle(e,index,items.id)}></Checkbox>
                      </td>
                </tr>
                  )) : null}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
