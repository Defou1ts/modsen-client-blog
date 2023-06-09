import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import type { GetStaticProps } from 'next';

import { defaultLocale } from '@shared/lib/constants/defaultLocale';
import { HomePageWrapper } from '@app/wrappers/HomePageWrapper';
import { JoinOurTeam } from '@widgets/JoinOurTeam';
import { AuthorList } from '@entities/Author/ui/AuthorList';
import { authors } from '@entities/Author/lib/mock/authors';
import { HomeCategoriesList } from '@widgets/HomeCategoriesList';
import { allPostCategories } from '@entities/Post/lib/mock/allPostCategories';
import { WhyWeStarted } from '@widgets/WhyWeStarted';
import { LogoList } from '@widgets/LogoList';
import { TestimonalsCarousel } from '@widgets/TestimonalsCarousel';
import { HomeAboutUs } from '@widgets/HomeAboutUs';
import { HomeOverviewPost } from '@widgets/HomeOverviewPost';
import { posts } from '@entities/Post/lib/mock/posts';
import { HomePostList } from '@widgets/HomePostList';
import { InfinityScroll } from '@shared/ui/InfinityScroll';

import type { Post, PostCategory } from '@entities/Post/interfaces';
import type { AuthorWithLocales } from '@entities/Author/interfaces';

interface HomePageProps {
	authors: AuthorWithLocales[];
	categories: PostCategory[];
	overviewPost: Post;
	overviewPostAuthor: AuthorWithLocales;
	featuredPost: Post;
	featuredPostAuthor: AuthorWithLocales;
	postList: [Post, Post, Post, Post];
	postListAuthors: [AuthorWithLocales, AuthorWithLocales, AuthorWithLocales, AuthorWithLocales];
}

const HomePage = ({
	authors,
	categories,
	overviewPost,
	overviewPostAuthor,
	featuredPostAuthor,
	featuredPost,
	postList,
	postListAuthors,
}: HomePageProps) => {
	return (
		<>
			<Head>
				<meta name="description" content="Modsen client blog" />
				<title>Home | Modsen client blog</title>
			</Head>
			<InfinityScroll Wrapper={<HomePageWrapper />} customHeight={924}>
				<HomeOverviewPost post={overviewPost} author={overviewPostAuthor} />
				<HomePostList
					featuredPost={featuredPost}
					featuredPostAuthor={featuredPostAuthor}
					posts={postList}
					postsAuthors={postListAuthors}
					key={featuredPost.id}
				/>
				<HomeAboutUs />
				<HomeCategoriesList categories={categories} />
				<WhyWeStarted />
				<AuthorList authors={authors} />
				<LogoList />
				<TestimonalsCarousel />
				<JoinOurTeam />
			</InfinityScroll>
		</>
	);
};

export default HomePage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const overviewPost = posts[0];
	const overviewPostAuthor = authors.find((author) => author.id === overviewPost.authorId);
	const featuredPost = posts[1];
	const featuredPostAuthor = authors.find((author) => author.id === featuredPost.authorId);
	const postList = posts.slice(0, 4);
	const postListAuthors = postList.map((post) => authors.find((author) => author.id === post.authorId));

	return {
		props: {
			...(await serverSideTranslations(locale ?? defaultLocale, ['common'])),
			authors,
			categories: allPostCategories,
			overviewPost,
			overviewPostAuthor,
			featuredPost,
			featuredPostAuthor,
			postList,
			postListAuthors,
		},
	};
};
