import React from "react";
import Link from "next/link";
import styles from "../styles/SideParts.module.scss";
const SideParts = ({ items, name, slug }) => {
  return (
    <div className={styles.side__section}>
      <h2>{name}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/${slug}/${item.id}`}>・{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideParts;
