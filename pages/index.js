import Link from "next/link";
import { Pagination } from "../components/Pagination";
import { client } from "../libs/client";
import { perPage } from "../pageCount";

export default function Home({ blog, category, tags, totalCount }) {
  return (
    <div>
      <ul>
        {category.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link href={`/tag/${tag.id}`}>{tag.name}</Link>
          </li>
        ))}
      </ul>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} />
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
