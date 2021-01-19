import React from "react";
import { Link } from "react-router-dom";

export default function SubMenu() {
  return (
    <div className="container">
      <ul class="snip1175">
        <li class="">
          <Link href="#" data-hover="ReactJs">
            ReactJs
          </Link>
        </li>
        <li>
          <Link href="#" data-hover="ThreeJs">
            ThreeJs
          </Link>
        </li>
        <li>
          <Link href="#" data-hover="Mongoose">
            Mongoose
          </Link>
        </li>
        <li>
          <Link href="#" data-hover="NodeJs">
            NodeJs
          </Link>
        </li>
        <li>
          <Link href="#" data-hover="Contact">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
