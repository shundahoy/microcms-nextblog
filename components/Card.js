import React from "react";
import Link from "next/link";
import styles from "../styles/Card.module.scss";
const Card = ({ blog }) => {
  return (
    <li key={blog.id} className={styles.content__blog}>
      <div className={styles.blog__category}>
        <Link href={`/category/${blog.category.id}`}>{blog.category.name}</Link>
      </div>
      <p className={styles.blog__title}>
        <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
      </p>
      <ul className={styles.blog__tags}>
        {blog.tags.map((tag) => (
          <li key={tag.id}>
            <Link href={`/tag/${tag.id}`}>#{tag.name}</Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Card;
