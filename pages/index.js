import Link from "next/link";
import Card from "../components/Card";
import Layout from "../components/Layout";
import { Pagination } from "../components/Pagination";
import SideParts from "../components/SideParts";
import { client } from "../libs/client";
import { perPage } from "../pageCount";
import styles from "../styles/Home.module.scss";
export default function Home({ blog, category, tags, totalCount }) {
  return (
    <div>
      <Layout pageName="Home">
        <div className={styles.wrapper}>
          <h2 className={styles.heading}>Home</h2>
          <div className={styles.grid}>
            <div className={styles.content}>
              <ul>
                {blog.map((blog) => (
                  <Card key={blog.id} blog={blog} />
                ))}
              </ul>

              <div className={styles.btn__blogPage}>
                <Link href="/blog/page/1">ブログ一覧　&gt;</Link>
              </div>
            </div>
            <div className={styles.side}>
              <SideParts items={category} name="カテゴリー" slug="category" />
              <SideParts items={tags} name="タグ" slug="tag" />
            </div>
          </div>
        </div>
      </Layout>
      {/* 
        <Pagination totalCount={totalCount} /> */}
      {/*  */}
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  // const data = await client.get({ endpoint: "blog" });
  const categoryData = await client.get({ endpoint: "categories" });
  const tagData = await client.get({ endpoint: "tags" });

  const data = await client.get({
    endpoint: "blog",
    queries: { offset: 0, limit: perPage },
  });
  return {
    props: {
      blog: data.contents,
      category: categoryData.contents,
      tags: tagData.contents,
      totalCount: data.totalCount,
    },
  };
};
