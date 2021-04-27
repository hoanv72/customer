import React, { useEffect, useState, Fragment } from 'react';
import { useOrganizationUIContext } from './OrganizationUIContext';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Card, Col, Row } from 'react-bootstrap';

import {
  getOrganizationListUser,
  getOrganizationListPersonnel,
  deleteUser,
} from './_redux/organizationSlice';
import { logout } from '../../../redux/authSlice';

import DMSTreeMenu from '../../components/TreeMenu/DMS/DMSTreeMenu';
import DMSTable from '../../components/table/DMSTable';

import OrganizationAddDialog from './components/OrganizationAddDialog';

export default function OrganizationTable({ dmsPage }) {
  const context = useOrganizationUIContext();
  const dispatch = useDispatch();

  const { organizationId } = useSelector((state) => state.auth);

  const [userList, setUserList] = useState(null);
  const [userSelectedList, selectUserSelectedList] = useState(null);
  const [personnelList, setPersonnelList] = useState(null);
  const [visibleAddUserToTree, setVisibleAddUserToTree] = useState(false);
  const [role, setRole] = useState(null);
  const [selectedTreeId, setSelectedTreeId] = useState(null);
  const [selectedTreeName, setSelectedTreeName] = useState(null);

  const columns = [
    { name: 'username', label: 'Tên tài khoản' },
    { name: 'email', label: 'Email' },
    { name: 'phone', label: 'Số điện thoại' },
    { name: 'fullname', label: 'Tên nhân viên' },
    { name: 'position', label: 'Chức danh' },
  ];

  useEffect(() => {
    async function fetchData() {
      const listUserAction = await dispatch(
        getOrganizationListUser({ oraganizeId: organizationId })
      );
      const listPersonnelAction = await dispatch(
        getOrganizationListPersonnel({ id: null, oraganizeId: organizationId })
      );
      const listUserData = unwrapResult(listUserAction);
      const listPersonnelData = unwrapResult(listPersonnelAction);
      if (listUserData.code === -2 || listPersonnelData.code === -2) {
        dispatch(logout());
        return;
      }
      if (listUserData) {
        setUserList(listUserData);
        selectUserSelectedList(listUserData);
      }
      if (listPersonnelData) {
        setPersonnelList(listPersonnelData.personnel);
      }
    }

    fetchData();
  }, []);


  const onClickTree = async (id) => {
    const listPersonnelAction = await dispatch(
      getOrganizationListPersonnel({ id: Number(id) ? id : null, oraganizeId: organizationId })
    );
    const listPersonnelData = unwrapResult(listPersonnelAction);
    if (listPersonnelData) {
      selectUserSelectedList(listPersonnelData.customer_user);
    }
  }

  const onDeleteUser = (node) => {
    const { id } = node;
    if (id) {
      dispatch(deleteUser({ oraganizeId: organizationId, userId: id })).then((response) => {
        console.log(response);
      });
    }
  }

  const onAddUserToTree = ({ role, treeId, treeName }) => {
    setVisibleAddUserToTree(true);
    setRole(role);
    setSelectedTreeId(treeId);
    setSelectedTreeName(treeName);
  }

  return (
    <Fragment>
      <Row>
        <Col lg={3}>
          <DMSTreeMenu
            userList={userList}
            personnelList={personnelList}
            onDeleteUser={onDeleteUser}
            onClickTree={onClickTree}
            onAddUserToTree={onAddUserToTree}
          />
        </Col>
        <Col lg={9}>
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Tổ chức</Card.Title>
                  <Button
                    variant='primary'
                    onClick={() => context.newButtonClick()}
                  >
                    Thêm mới nhân viên
                  </Button>
                </Card.Header>

                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      <DMSTable
                        columns={columns}
                        rows={userSelectedList}
                        actions={['edit']}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* dialog section */}
      <OrganizationAddDialog
        selectedTreeId={selectedTreeId}
        selectedTreeName={selectedTreeName}
        role={role}
        show={visibleAddUserToTree}
        onHide={() => setVisibleAddUserToTree(false)}
      />
    </Fragment>
  );
}
