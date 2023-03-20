import Link from "next/link";
import Card from "../../../components/Card";
import Layout from "../../../components/Layout";
import { Pagination } from "../../../components/Pagination";
import SideParts from "../../../components/SideParts";
import { client } from "../../../libs/client";
import { perPage } from "../../../pageCount";
import styles from "../../../styles/BlogPage.module.scss";
const PER_PAGE = perPage;

export default function BlogPageId({
  blog,
  totalCount,
  nowPage,
  category,
  tags,
}) {
  return (
    <div>
      <Layout pageName="Blog">
        <div className={styles.wrapper}>
          <h2 className={styles.heading}>{nowPage}ページ</h2>
          <div className={styles.grid}>
            <div className={styles.content}>
              <ul>
                {blog.map((blog) => (
                  <Card key={blog.id} blog={blog} />
                ))}
              </ul>

              <div className={styles.pageNationWrapper}>
                <Pagination totalCount={totalCount} nowPage={nowPage} />
              </div>
            </div>
            <div className={styles.side}>
              <SideParts items={category} name="カテゴリー" slug="category" />
              <SideParts items={tags} name="タグ" slug="tag" />
            </div>
          </div>
        </div>
      </Layout>
      {/* {nowPage}
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} nowPage={nowPage} /> */}
    </div>
  );
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blog" });

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => `/blog/page/${repo}`
  );

  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
  const id = context.params.id;

  const data = await client.get({
    endpoint: "blog",
    queries: { offset: (id - 1) * PER_PAGE, limit: PER_PAGE },
  });
  const categoryData = await client.get({ endpoint: "categories" });
  const tagData = await client.get({ endpoint: "tags" });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
      nowPage: id,
      category: categoryData.contents,
      tags: tagData.contents,
    },
  };
};
