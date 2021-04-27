import React, { useState, useEffect } from 'react';

import ColorPicker_ from 'material-ui-color-picker';
import { useFormikContext } from 'formik';

const ColorPicker = (props) => {
  const { setFieldValue } = useFormikContext();
  const [color, setColor] = useState(() => (props.value ? props.value : ''));

  useEffect(() => {
    setFieldValue(props.name, color);
  }, [color, props.name, setFieldValue]);

  return (
    <ColorPicker_
      name={props.name ? props.name : 'color'}
      defaultValue='Color'
      value={color}
      className='form-control'
      onChange={(color) => setColor(color)}
    />
  );
};

export default ColorPicker;
