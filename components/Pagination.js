import Link from "next/link";
import { perPage } from "../pageCount";
import styles from "../styles/Pagenation.module.scss";
export const Pagination = ({ totalCount, nowPage = 1 }) => {
  const PER_PAGE = perPage;

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <ul className={styles.pageNation}>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index} className={nowPage == index + 1 ? styles.active : ""}>
          <Link href={`/blog/page/${number}`}>{number}</Link>
        </li>
      ))}
    </ul>
  );
};
