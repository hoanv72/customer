import Table from 'react-bootstrap/Table'
import { Container, Row, Col } from 'react-bootstrap'
import './style.css';

function MonitoringContent2() {
  return (
    <>
      <Container fluid className="content2-wrap">
        <Row>
          <Col>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.449640848663!2d106.64158491366953!3d10.776832962135815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ebb76454105%3A0x40573659676c0cf5!2zNzQgSG_DoG5nIFh1w6JuIE5o4buLLCBQaMO6IFRydW5nLCBUw6JuIFBow7osIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1618716348073!5m2!1sen!2s"  allowfullscreen="" loading="lazy"></iframe>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover responsive >
              <thead>
                <tr>
                  <th rowSpan="2">STT</th>
                  <th rowSpan="2" >Nhân viên</th>
                  <th colSpan="2">Viếng thăm</th>
                  <th colSpan="2">Đơn hàng</th>
                  <th colSpan="2">Doanh số</th>
                  <th colSpan="2">Cập nhật</th>
                </tr>
                <tr>
                  <th>KH</th>
                  <th>TH</th>
                  <th>KH</th>
                  <th>TH</th>
                  <th>KH(Triệu)</th>
                  <th>TH(Triệu)</th>
                  <th>TG</th>
                  <th>% Pin</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>ádasdasdasdasdssdfsdsdfsdfsdfsdfdsfsdfsdfsdadfsf</td>
                  <td >Otto</td>
                  <td>@mdo</td>
                  <td>KH</td>
                  <td>TH</td>
                  <td>@mdo</td>
                  <td>KH</td>
                  <td>TH</td>
                  <td>TH</td>
                </tr>

              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

    </>
  );
}

export default MonitoringContent2;