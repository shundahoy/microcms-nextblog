import { client } from "../../libs/client";
import styles from "../../styles/Blog.module.scss";
import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/night-owl.css";
import Layout from "../../components/Layout";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BlogId({ blog, highlightedBody }) {
  const router = useRouter();
  return (
    <Layout pageName="Blog">
      <div className={styles.wrapper}>
        <p className={styles.publishedAt}>
          {format(new Date(blog.publishedAt), "'Last updated on' MMMM dd,yyyy")}
        </p>
        <h1 className={styles.title}>{blog.title}</h1>
        <p className={styles.category}>
          カテゴリー：
          <Link href={`/category/${blog.category.id}`}>
            {blog.category && blog.category.name}
          </Link>
        </p>
        <ul className={styles.tag}>
          {blog.tags.map((item) => (
            <li key={item.id}>
              <Link href={`/tag/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <div
          className={styles.bodyContent}
          dangerouslySetInnerHTML={{ __html: highlightedBody }}
        ></div>
        <div className={styles.btn__blogPage}>
          <button onClick={() => router.back()}>戻る</button>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  const $ = cheerio.load(data.body);

  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  return {
    props: {
      blog: data,
      highlightedBody: $.html(),
    },
  };
};
