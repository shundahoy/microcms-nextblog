// pages/category/[id].js
import Link from "next/link";
import { client } from "../../libs/client";

export default function CategoryId({ blog, category }) {
  if (blog.length === 0) {
    return <div>ブログコンテンツがありません</div>;
  }
  return (
    <div>
      <p>{category.name}</p>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });

  const paths = data.contents.map((content) => `/category/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({
    endpoint: "blog",
    queries: { filters: `category[equals]${id}` },
  });

  const category = await client.get({ endpoint: "categories", contentId: id });
  return {
    props: {
      blog: data.contents,
      category: category,
    },
  };
};
