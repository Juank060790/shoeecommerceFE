import React from "react";
import { Link } from "react-router-dom";

export default function SubMenu() {
  return (
    <div className="container">
      <ul className="snip1175">
        <li className="">
          <Link to="#" data-hover="ReactJs">
            ReactJs
          </Link>
        </li>
        <li>
          <Link to="#" data-hover="ThreeJs">
            ThreeJs
          </Link>
        </li>
        <li>
          <Link to="#" data-hover="Mongoose">
            Mongoose
          </Link>
        </li>
        <li>
          <Link to="#" data-hover="NodeJs">
            NodeJs
          </Link>
        </li>
        <li>
          <Link to="#" data-hover="Contact">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
