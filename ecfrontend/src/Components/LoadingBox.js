import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingBox() {
  return (
    <>
      <div className="loading">
        <i className="fa fa-spinner fa-spin"></i>{" "}
      </div>
      <div>
        {" "}
        <Spinner animation="grow" variant="danger" />
        Loading...
        <Spinner animation="grow" />
      </div>
    </>
  );
}
