import Link from "next/link";
import { Pagination } from "../../../components/Pagination";
import { client } from "../../../libs/client";
import { perPage } from "../../../pageCount";

const PER_PAGE = perPage;

export default function BlogPageId({ blog, totalCount, nowPage }) {
  return (
    <div>
      {nowPage}
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} nowPage={nowPage} />
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

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
      nowPage: id,
    },
  };
};
