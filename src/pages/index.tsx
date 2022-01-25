import { GetStaticProps } from 'next';

import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import { FiCalendar, FiUser } from 'react-icons/fi';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <div className={commonStyles.container}>
      <main className={styles.posts}>
        <div className={styles.post}>
          <h1>Como Utilizar Hooks</h1>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <FiCalendar />
          <span>15 Mar 2021</span>
          <FiUser />
          <span>Joseph Oliveira</span>
        </div>

        <div className={styles.post}>
          <h1>Criando um app CRA do zero</h1>
          <p>
            Tudo sobre como criar a sua primeira aplicação utilizando Create
            React App.
          </p>
          <FiCalendar />
          <span>15 Set 1984</span>
          <FiUser />
          <span>Fábio Picoli</span>
        </div>

        <button type="button" className={styles.loadPosts}>
          Carregar mais posts
        </button>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    Prismic.predicates.at('document.type', 'posts'),
    {
      fetch: ['posts.title', 'posts.subtitle'],
      pageSize: 4,
    }
  );

  return {
    props: { postsResponse },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
