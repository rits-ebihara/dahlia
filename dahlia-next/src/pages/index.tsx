import classNames from 'classnames';
import type { NextPage } from 'next';
import Head from 'next/head';
import { generateUseStyles } from '~/reactUtils';
import css from '../styles/Home.module.scss';

const useStyles = generateUseStyles(() => ({
  root: classNames(
    'container',
    'mx-auto',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'min-h-screen',
    'py-2',
  ),
  body: classNames('flex', 'flex-wrap', 'justify-center', 'gap-2'),
  h2: classNames(
    'text-3xl',
    'font-bold',
    'text-center',
    'w-full',
    'mt-4',
    'bg-primary',
    'text-primary-content',
  ),
  section: classNames('w-80', 'border', 'border-base-300', 'rounded-lg'),
  h3: classNames(
    'text-2xl',
    'font-bold',
    'text-center',
    'w-full',
    'p-2',
    'bg-secondary',
    'text-secondary-content',
    'rounded-t-lg',
  ),
  article: classNames('p-2'),
}));

const Home: NextPage = () => {
  const styles = useStyles({});

  return (
    <>
      <Head>
        <title>Dahlia Next</title>
      </Head>
      <div className={styles.root + ' ' + css.contents}>
        <h1 className="text-4xl font-bold">
          ようこそ <span className="text-primary-focus">Dahlia-Next</span> へ!
        </h1>
        <div>
          <p>
            このページは <code>src/pages/index.tsx</code> から生成されています。
          </p>
        </div>
        <div className="divider my-8"></div>
        <div className={styles.body}>
          <p className="w-full text-xl">
            Dahlia Next は、`create-next-app` で作成された{' '}
            <a href="https://nextjs.org/">Next.js</a>
            アプリケーションに、下記の要素を追加しており、高効率なアプリ開発環境を素早く整えることができます。
          </p>
          <h2 className={styles.h2}>スタイリング</h2>
          <section className={styles.section}>
            <h3 className={styles.h3}>
              <a href="https://tailwindcss.com/">Tailwind CSS</a>
            </h3>
            <div className={styles.article}>
              <p>
                <code>flex,pt-4,text-center,rotate-90</code>
                などのクラスを搭載した<b>ユーティリティファースト</b>
                のCSSフレームワークで、マークアップの中で直接構成して、あらゆるデザインを構築することが可能です。
              </p>
              <p>
                React
                などのコンポーネント指向のフレームワークと組み合わせることで、CSSファイルと書くことなくコンポーネント単位でスタイルを管理することができます。
              </p>
            </div>
          </section>
          <section className={styles.section}>
            <h3 className={styles.h3}>
              <a href="https://daisyui.com/">Daisy UI</a>
            </h3>
            <div className={styles.article}>
              <p>Tailwind CSS を利用したコンポーネントライブラリです。</p>
              <p>
                JavaScript を使用していないため、クリーンな HTML
                でコンポーネントを構築することができ、テストやメンテナンスが容易です。
              </p>
            </div>
          </section>
          <section className={styles.section}>
            <h3 className={styles.h3}>
              <a href="https://sass-lang.com/">Sass</a>
            </h3>
            <div className={styles.article}>
              <p>
                Sass は、CSS
                を拡張した書式で、スタイルのコードを書きやすく、管理しやすくするものです。
              </p>
              <p>セレクタの入れ子や変数や関数といった機能を持ちます。</p>
            </div>
          </section>
          <h2 className={styles.h2}>フォーム・バリデーション</h2>
          <section className={styles.section}>
            <h3 className={styles.h3}>
              <a href="https://zod.dev/">Zod</a>
            </h3>
            <div className={styles.article}>
              <p>
                TypeScript
                でのスキーマ宣言とバリデーションを行うためのライブラリです。
              </p>
              <p>
                文字列、数値、といった型だでなく、長さや最大最小値、正規表現といった制約を組み合わせて、
                複雑な仕様を定義で実装することができます。
              </p>
            </div>
          </section>
          <section className={styles.section}>
            <h3 className={styles.h3}>
              <a href="https://react-hook-form.com/jp/">React Hook Form</a>
            </h3>
            <div className={styles.article}>
              <p>
                高性能で柔軟かつ拡張可能な使いやすいフォームバリデーションライブラリです。
              </p>
              <p>
                React
                では面倒なオブジェクトとフォームのバインドをサポートします。スキーマとして
                Zod を利用することもできます。
              </p>
            </div>
          </section>
          <h2 className={styles.h2}>テスト</h2>
          <section className={styles.section}>
            <h3 className={styles.h3}>
              <a href="https://jestjs.io/ja/">Jest</a>
            </h3>
            <div className={styles.article}>
              <p>
                Jest はシンプルさを重視した、快適な JavaScript
                テスティングフレームワークです。
              </p>
              <p>
                カバレッジやスナップショットの機能が１パッケージにまとめられていて、2022年現在で最も人気のある
                JavaScript のテストフレームワークです。
              </p>
            </div>
          </section>
          <section className={styles.section}>
            <h3 className={styles.h3}>
              <a href="https://testing-library.com/">Testing Library</a>
            </h3>
            <div className={styles.article}>
              <p>
                Testing Library は、React
                のコンポーネントをテストするためのライブラリです。Jest
                のプラグインとして導入します。
              </p>
              <p>
                ブラウザで実行することなく、メモリ上に仮想DOMを構築しテストすることで、高速に繰り返しテストを実行することができます。
              </p>
            </div>
          </section>
          <section className={styles.section}>
            <h3 className={styles.h3}>
              <a href="https://storybook.js.org/">Storybook</a>
            </h3>
            <div className={styles.article}>
              <p>
                Storybookは、UIコンポーネントとページを分離して構築するためのフロントエンドワークショップです。
              </p>
              <p>
                React などで UI
                のコンポーネントをボトムアップで開発する場合、コンポーネントの構成やデザインを確認するために、アプリケーションを起動する必要があります。
              </p>
              <p>
                Storybook
                は、コンポーネントをそれぞれ独立した環境で動作確認することができ、開発効率が向上します。
              </p>
              <p>
                また、コンポーネントをカタログとして管理することができ、利用者へのドキュメントとしても利用できます。
              </p>
            </div>
          </section>
          <h2 className={styles.h2}>開発ツール</h2>
          <section className={styles.section}>
            <h3 className={styles.h3}>
              <a href="https://www.typescriptlang.org/">TypeScript</a>
            </h3>
            <div className={styles.article}>
              <p>
                TypeScriptはJavaScriptの上に構築された強型プログラミング言語であり、あらゆるスケールでより優れたツールを提供することができます。
              </p>
              <p>
                TypeScriptは、JavaScriptに追加の構文を追加し、エディタとの緊密な統合をサポートします。エディタでエラーを早期に発見することができます。
              </p>
              <p>Als JavaScript として非常に人気の高い言語です。</p>
            </div>
          </section>
          <section className={styles.section}>
            <h3 className={styles.h3}>
              <a href="https://eslint.org/">ESLint</a>
            </h3>
            <div className={styles.article}>
              <p>
                ESLint
                はコードを静的に解析し、問題を素早く見つけます。ほとんどのテキストエディタに組み込まれており、継続的インテグレーションパイプラインの一部としてESLintを実行することができます。
              </p>
              <p>
                ここでは、
                <a href="https://standardjs.com/readme-ja.html">
                  JavaScript Standard Style
                </a>
                のルールの適用と、TypeScript や Prettier
                のプラグインを導入しています。
              </p>
            </div>
          </section>
          <section className={styles.section}>
            <h3 className={styles.h3}>
              <a href="https://prettier.io/">Prettier</a>
            </h3>
            <div className={styles.article}>
              <p>
                Prettier
                は、コードをフォーマットするためのツールです。コードをフォーマットすることで、コードの一貫性を保ち、コードレビューの時間を節約することができます。
              </p>
              <p>
                多くの言語に対応しており、JavaScript や TypeScript
                も含まれます。
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
