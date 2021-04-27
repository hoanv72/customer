import Table from 'react-bootstrap/Table'
import { Container, Row, Col } from 'react-bootstrap'
import './style.css';

function MonitoringContent4() {
  return (
    <>
      <Container fluid className="content2-wrap">
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

export default MonitoringContent4;