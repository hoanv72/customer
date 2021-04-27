import React, { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useTargetUIContext } from './TargetUIContext';

import Target from './Target';
import { useDispatch } from 'react-redux';
import { getList } from '../Client/_redux/clientSlice';
import { API_ENDPOINT } from '../../../../utils/constants';

export default function TargetCard({ dmsPage }) {
  const [rowsData, setRowsData] = useState([]);
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  const dispatch = useDispatch();
  const context = useTargetUIContext();
  const title =
    dmsPage === 'categoryTarget' ? 'Chỉ tiêu' : dmsPage === 'categoryTarget';

  const renderTable = (dmsPage, data) => {
    switch (dmsPage) {
      case 'categoryTarget':
        return <Target dmsPage={dmsPage} data={data} />;

      default:
        return null;
    }
  };

  useEffect(() => {
    let fetchData = async () => {
      if (user !== null) {
        const action = getList({
          url: API_ENDPOINT[dmsPage],
          oraganizeId: user.oraganize[0].id,
        });
        const actionResult = await dispatch(action);
        const data = unwrapResult(actionResult);
        if (data) {
          setRowsData(data);
        }
      }
    };

    fetchData();
  }, []);
  var path = window.location.pathname.split('/');
  return (
    <>
      <Row>
        <Col lg={12} style={{ display: path[3] === 'new' ? 'none' : 'block' }}>
          <Card>
            <Card.Header>
              <Card.Title>{title}</Card.Title>
              <Button
                variant='primary'
                onClick={() => context.newButtonClick()}
              >
                Thêm mới
              </Button>
            </Card.Header>

            <Card.Body>
              <Row>
                {/* Table */}
                <Col lg={12}>{renderTable(dmsPage, rowsData)}</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
