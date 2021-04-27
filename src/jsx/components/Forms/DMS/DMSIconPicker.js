import React, { useState } from 'react';
import {
  Button,
  DropdownToggle,
  Dropdown,
  DropdownMenu,
  Input,
} from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useFormikContext } from 'formik';

library.add(fas, fab);

const DMSIconPicker = ({ fieldname, value }) => {
  const { setFieldValue } = useFormikContext();

  const icons = { ...fas, ...fab };
  const styles = {
    iconContainer: {
      minWidth: '200px',
      maxWidth: '400px',
      width: 'auto',
      height: '250px',
      overflow: 'scroll',
      padding: '8px',
    },
    iconSearchInput: {
      margin: '0 0 5px 0',
    },
    iconItem: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '6px',
      width: '32px',
      height: '32px',
      borderRadius: '50px',
      fontSize: '18px',
    },
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [pickedIcon, setPickedIcon] = useState({
    prefix: 'fas',
    iconName: 'coffee',
  });
  const [search, setSearch] = useState('');

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const searchIconHandler = (event) => {
    setSearch(event.target.value);
  };

  const pickIconHandler = (icon) => {
    toggle();
    setPickedIcon(icon);
    // emit value to parent
    setFieldValue(fieldname, `${icon.prefix} fa-${icon.iconName}`);
    // set local search text to empty
    setSearch('');
  };

  const iconLists = Object.keys(icons)
    .filter(
      (key) =>
        key !== 'faFontAwesomeLogoFull' && icons[key].iconName.includes(search)
    )
    .map((key, index) => {
      if (index < 200) {
        return (
          <Button
            key={index}
            outline
            color='primary'
            style={styles.iconItem}
            onClick={() => pickIconHandler(icons[key])}
          >
            <FontAwesomeIcon icon={[icons[key].prefix, icons[key].iconName]} />
          </Button>
        );
      }
    });

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{ width: '100%' }}>
      <DropdownToggle
        caret
        style={{ width: '100%' }}
        className='btn btn-primary'
        color='#0b2a97'
      >
        <FontAwesomeIcon
          icon={[pickedIcon.prefix, pickedIcon.iconName]}
          size='lg'
        />
      </DropdownToggle>
      <DropdownMenu style={styles.iconContainer}>
        <Input
          type='text'
          name='icon'
          className='form-control'
          placeholder='Tìm kiếm icon'
          value={search}
          onChange={searchIconHandler}
          style={styles.iconSearchInput}
        />
        {iconLists}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DMSIconPicker;
