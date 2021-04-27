import React, { useState } from "react";
import { Formik } from "formik";
import { Button } from "react-bootstrap";
import { COLUMNS_CONFIG } from "../../../../../utils/constants";
import DMSIconPicker from "../../../../components/Forms/DMS/DMSIconPicker";

const createInitialValues = (dmsPage) => {
  let initialValues = {};
  COLUMNS_CONFIG[dmsPage].forEach((item) => {
    if (item.name === "icon") {
      initialValues[item.name] = "fas fa-coffee";
    } else if (item.name === "color") {
      initialValues[item.name] = "#000000";
    } else {
      initialValues[item.name] = "";
    }
  });
  return initialValues;
};

export default function ProductEditForm({
  saveData,
  data,
  id,
  dmsPage,
  onHide,
}) {
  const [initialValues, setInitialValues] = useState(() =>
    createInitialValues(dmsPage)
  );

  if (initialValues === null) return null;

  return (
    <Formik
      initialValues={data ? data : initialValues}
      enableReinitialize
      onSubmit={(values, actions) => {
        let data = { ...values };
        delete data.id;
        saveData(data);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <div className="card-body">
          <div className="basic-form">
            <form onSubmit={props.handleSubmit} className="form-group">
              <div className="form-row">
                {COLUMNS_CONFIG[dmsPage].map((field) => {
                  if (field.name === "icon") {
                    return (
                      <div className="form-group col-md-6">
                        <label>Icon</label>
                        <DMSIconPicker
                          fieldname={"icon"}
                          value={props.values.icon}
                        />
                      </div>
                    );
                  } else if (field.name === "color") {
                    return (
                      <div className="form-group col-md-6">
                        <label>Màu sắc</label>
                        <input
                          type="color"
                          className="as_colorpicker form-control"
                          name="color"
                          value={props.values.color}
                          onChange={props.handleChange}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div className="form-group col-md-6">
                        <label>{field.label}</label>
                        <input
                          type="text"
                          className="form-control"
                          name={field.name}
                          value={props.values[field.name]}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />
                      </div>
                    );
                  }
                })}
              </div>

              <div className="form-row mt-5 justify-content-end">
                <Button className="mr-2" variant="dark" onClick={onHide}>
                  Hủy
                </Button>
                <Button className="mr-2" variant="primary" type="submit">
                  {id === undefined ? "Lưu" : "Cập nhật"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
}
