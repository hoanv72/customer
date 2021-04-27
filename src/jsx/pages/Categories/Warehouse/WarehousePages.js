import React from "react";
import { Col, Row, Card, Form, Table, InputGroup } from "react-bootstrap";
export function WarehousePages() {
  return (
    <>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Kho Hàng</Card.Title>
            </Card.Header>

            <Card.Body>
              <Row>
                <Col>
                  {/* search inputs */}
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group >
                          <Form.Label><strong>STT</strong></Form.Label>
                          <Form.Control
                            placeholder="STT"
                          />
                         
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group >
                          <Form.Label><strong>Tên kho</strong> </Form.Label>
                          <Form.Control
                            placeholder="Tên kho"
                          />
                          
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group >
                            <Form.Label><strong>Mã kho</strong> </Form.Label>
                            <Form.Control
                                placeholder="Mã kho"
                            />
                            
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group >
                            <Form.Label><strong>Loại kho</strong> </Form.Label>
                            <Form.Control
                              as="select" 
                            >
                                 <option>Kho sản phẩm</option>
                                 <option>Kho khuyến mãi</option>
                                 <option>Kho nhân viên</option>
                            </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group >
                            <Form.Label><strong>Phòng, Nhóm</strong> </Form.Label>
                            <Form.Control
                                as="select"
                            >
                                <option>An Giang</option>
                                <option>Bắc Giang</option>
                            </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group >
                                <Form.Label><strong>Nhân viên</strong> </Form.Label>
                                <Form.Control
                                    placeholder="Nhân viên"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                            <Form.Group >
                            <Form.Label><strong>Mô tả</strong> </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows= {3}
                                placeholder="Mô tả"
                            />
                            
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group >
                            <Form.Label><strong>Trạng thái</strong> </Form.Label>
                            <Form.Control
                                as='select'
                            >
                                 <option>Hoạt động</option>
                                 <option>Ngừng hoạt động</option>
                            </Form.Control> 
                            </Form.Group>
                        </Col>
                    </Row>
                  </Form>

                  
                </Col>
                <Col>
                    <div className="d-flex justify-content-between align-items-baseline ">
                      <label ><strong>Kế toán phụ trách</strong></label>
                      <Form className=" ml-5 " >
                        <Form.Group className="custom-input-search">
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text id="inputGroupPrepend" className="custom-icon-search" >
                                <i className="fa fa-search" aria-hidden="true" style={{color:'white'}}></i>
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              style={{height:'40px'}}
                              type="text"
                              placeholder="Search"
                              aria-describedby="inputGroupPrepend"
                            />
                          </InputGroup>
                        </Form.Group>
                      </Form>
                    </div>
                    <div>
                        <Table>
                            <tbody>
                                <tr>
                                    <td> <i className="flaticon-381-user-3"></i></td>
                                    <td> quang</td>
                                    <td> quang@gmail.com</td>
                                    <td> 
                                        <Form.Check 
                                            checked={true}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
