import React, { useEffect, useState } from 'react';

import { EMPLOYEE, ACCOUNTANT, MANAGER } from '../../../../utils/constants/role';

// JSTree lib
import * as $ from 'jquery';
import * as jstree from './vendors/jstree';
import './vendors/style.css';
import './vendors/main.css';

function createMenuTreeData(refData, userList, personnelList) {
  const transformedPersonnelList = personnelList.map(personnel => ({
    id: personnel.id,
    parent: 'all',
    name: personnel.name,
    text: `${personnel.code} - ${personnel.name}`,
    icon: 'fas fa-tree',
    type: 'tree'
  }));

  const transformedUserList = userList.map(user => ({
    id: user.id.toString(),
    parent: 'user-list',
    text: user.fullname,
    icon: 'fas fa-user-secret',
    type: 'user'
  }))

  return [...refData, ...transformedPersonnelList, ...transformedUserList];
}

export default function DMSTreeMenu({ userList, personnelList, onDeleteUser, onClickTree, onAddUserToTree }) {
  const [data, setData] = useState([
    { id: 'all', parent: '#', text: 'Tất cả', icon: 'fas fa-sitemap' },
    {
      id: 'user-list',
      parent: 'all',
      text: 'Danh sách nhân viên',
      icon: 'fas fa-users',
    },
  ]);

  useEffect(() => {
    global.jQuery = $;
  }, []);

  useEffect(() => {
    if (userList && personnelList) {
      setData(createMenuTreeData(data, userList, personnelList));
      setTimeout(() => {
        initTreeMenu(
          createMenuTreeData(data, userList, personnelList),
          { onDeleteUser, onClickTree, onAddUserToTree }
        );
      }, 300);
    }
  }, [userList, personnelList]);

  return (
    <>
      <div className='row mb-3'>
        <div className='col-12'>
          <input
            type='text'
            id='search_input-users'
            placeholder='Tìm kiếm nhân viên'
            className='form-control'
          />
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col-12'>
          <input
            type='text'
            id='search_input-tree'
            placeholder='Tìm kiếm trên cây'
            className='form-control'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-12' style={{ overflowX: 'auto' }}>
          <div id='tree-menu'></div>
        </div>
      </div>
    </>
  );
}

function initTreeMenu(data, customMenuFunction) {
  $(function () {
    $('#tree-menu').jstree({
      core: {
        data: data,
      },
      plugins: ['contextmenu', 'checkbox', 'search'],
      contextmenu: { items: (node) => customMenu(node, customMenuFunction), select_node: false },
    });
  });
  let to = false;
  $('#search_input-tree').keyup(function () {
    if (to) {
      clearTimeout(to);
    }
    to = setTimeout(function () {
      var v = $('#search_input-tree').val();
      if (v !== undefined) {
        $('#tree-menu').jstree(true).search(v);
      }
    }, 250);
  });

  // checking checbox is checked then remove old checkbox style
  $('#tree-menu').on('ready.jstree click', function (e, data) {
    // remove previous active class
    $('a.jstree-anchor').removeClass('jstree-clicked');
    $('i.jstree-icon').removeClass('jstree-clicked');
    e.target.classList.add('jstree-clicked');

    $('a > i.jstree-checkbox')
      .removeClass('jstree-icon jstree-checkbox') // removing jstree classes
      .addClass('fa fa-square-o') // adding the fa non-checked checkbox class
      .on('click', function () {
        // attaching the handler that toggles the checked / unchecked class
        toggleCheckClasses($(this), $(this).hasClass('fa-square-o'));
      });
  });

  // tree menu click
  const { onClickTree } = customMenuFunction;
  $('#tree-menu').on("select_node.jstree", function (e, data) {
    onClickTree(data.node.id);
  });

}

function customMenu(node, customMenuFunction) {
  const { onDeleteUser, onAddUserToTree } = customMenuFunction;
  const treeId = node.original && node.original.id;
  const treeName = node.original && node.original.name;

  if (node.original.type !== 'tree') {
    return {
      removeUser: {
        label: 'Xóa khỏi đơn vị (nhóm)',
        icon: 'fas fa-remove red-icon',
        action: () => onDeleteUser(node),
      },
    }
  }
  return {
    expandAll: {
      label: 'Đóng tất cả',
      icon: 'fas fa-search green-icon',
      action: function () {
        console.log('expandAll', node);
      },
    },
    editUnit: {
      label: 'Sửa đơn vị',
      icon: 'fas fa-edit green-icon',
      action: function () {
        console.log('editUnit', node);
      },
    },
    addChildren: {
      label: 'Thêm đơn vị con',
      icon: 'fas fa-plus green-icon',
      action: function () {
        console.log('addChildren', node);
      },
    },
    addManager: {
      label: 'Thêm quản lý',
      icon: 'fas fa-user-plus orange-icon',
      action: function () {
        onAddUserToTree({
          role: MANAGER,
          treeId,
          treeName
        });
      },
    },
    addAccountant: {
      label: 'Thêm kế toán',
      icon: 'fas fa-user-plus red-icon',
      action: function () {
        onAddUserToTree({
          role: ACCOUNTANT,
          treeId,
          treeName
        });
      },
    },
    addGroup: {
      label: 'Thêm nhân viên bán hàng',
      icon: 'fas fa-plus green-icon',
      action: function () {
        onAddUserToTree({
          role: EMPLOYEE,
          treeId,
          treeName
        });
      },
    },
  };

}

// checking checkbox class
function toggleCheckClasses(element, show) {
  if (show) {
    element.removeClass('fa-square-o');
    element.addClass('fa-check-square-o');
  } else {
    element.removeClass('fa-check-square-o');
    element.addClass('fa-square-o');
  }

  var children = element
    .parent()
    .siblings('.jstree-children')
    .find('.jstree-anchor .fa');

  children.each(function () {
    toggleCheckClasses($(this), show);
  });
}
