export function getInputClasses(fieldname, touched, errors) {
  if (touched[fieldname] && errors && errors[fieldname] !== '') {
    return 'form-control is-invalid';
  }

  return 'form-control';
}
