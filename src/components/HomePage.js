import React from "react";
// import image1 from "../Images/bg1.jpg";
import reactImage from "../Images/react.png";
import jsImage from "../Images/js.png";
import firebaseImage from "../Images/firebase.jpg";
import profileImage from "../Images/kiyo.png";

const HomePage = () => {
  return (
    <div className="container text-center">
      <h1>👨‍💻 About Me: きよ (Kiyo)</h1>

      <img src={profileImage} alt="きよです。おじです。" className="profileImage" />

      <section className="about-section py-5 bg-light">
        <div className="main">
          {/* メインカード */}
          <div className="card shadow-sm border-0 overflow-hidden">
            <div className="card-body p-4 p-md-5">
              {/* ヘッダー部分 */}
              {/* <h2 className="display-6 fw-bold mb-3 text-primary">👨‍💻 About Me: きよ (Kiyo)</h2> */}
              <p className="lead text-secondary mb-5">
                こんにちは、フロントエンドエンジニアを目指して奮闘中の<strong>きよ</strong>です。
                <br />
                現在、Reactを中心としたモダンなWeb開発の海に飛び込み、日々新しい技術を吸収しています。
              </p>

              <div className="row g-4">
                {/* 学習スタック */}
                <div className="col-md-6">
                  <div className="p-3 border rounded-3 h-100 bg-white">
                    <h3 className="h5 fw-bold mb-3">🛠 現在の学習スタック</h3>
                    <p className="small text-muted">「なぜそうなるのか？」という本質を大切にしながら、以下の技術をメインに学んでいます。</p>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">
                        <span className="badge bg-primary-subtle text-primary me-2">React</span>
                        <code>className</code> の由来から基礎まで深掘り中
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-success-subtle text-success me-2">CSS</span>
                        <code>px</code>, <code>%</code>, <code>vh/vw</code> を使い分け中
                      </li>
                      <li className="mb-2">
                        <span className="badge bg-dark-subtle text-dark me-2">Tools</span>
                        Emmetやnpm管理で爆速な開発環境を構築
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 大切にしていること */}
                <div className="col-md-6">
                  <div className="p-3 border rounded-3 h-100 bg-white">
                    <h3 className="h5 fw-bold mb-3">🌟 大切にしていること</h3>
                    <p className="mb-3">単にコードを書くだけでなく、開発環境が吐き出す「脆弱性の警告（vulnerabilities）」の一つ一つに向き合い、解決していくプロセスを大切にしています。</p>
                    <p className="mb-0">「zsh」と「node」の使い分けに迷っていた昨日よりも、確実に一歩前へ進む。そんな日々の積み重ねを信じています。</p>
                  </div>
                </div>
              </div>

              {/* 目標 */}
              <div className="mt-5 p-4 bg-primary text-white rounded-3 shadow">
                <h3 className="h5 fw-bold">🎯 目標とライフワーク</h3>
                <p className="mb-0">
                  今の目標は、<strong>ReactとBootstrapを駆使して、自分だけのオリジナルポートフォリオを完成させること</strong>です。
                  <br />
                  画面いっぱいに広がる <code>100vh</code> の景色のように、限界を決めずにWebの世界を表現できるエンジニアを目指しています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="page-section" id="services">
        <div className="service">
          <div class="text-center">
            <h2 class="section-heading text-uppercase">PORTFOLIO</h2>
            <h3 class="section-subheading text-muted mb-5">私が作った作品一覧です</h3>
          </div>
          <div class="row text-center">
            <div class="col-md-4">
              <span class="fa-stack fa-4x">
                <i class="fas fa-circle fa-stack-2x text-primary"></i>
                <i class="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
              </span>
              <h4 class="my-3">ECサイト</h4>
              <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
            </div>
            <div class="col-md-4">
              <span class="fa-stack fa-4x">
                <i class="fas fa-circle fa-stack-2x text-primary"></i>
                <i class="fas fa-laptop fa-stack-1x fa-inverse"></i>
              </span>
              <h4 class="my-3">レスポンシブサイト</h4>
              <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
            </div>
            <div class="col-md-4">
              <span class="fa-stack fa-4x">
                <i class="fas fa-circle fa-stack-2x text-primary"></i>
                <i class="fas fa-lock fa-stack-1x fa-inverse"></i>
              </span>
              <h4 class="my-3">ウェブセキュリティ</h4>
              <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="skill">
        <div class="text-center">
          <h1 class="title">スキル</h1>
          <div class="row text-center">
            <div class="col-md-4 services">
              <img src={reactImage} alt="Reactのロゴ" />
              <h4>React</h4>
              <p>Reactがつかえます</p>
            </div>
            <div class="col-md-4 services">
              <img src={jsImage} alt="JavaScriptのロゴ" />
              <h4>HTML/CSS</h4>
              <p>HTML/CSSがつかえます</p>
            </div>
            <div class="col-md-4 services">
              <img src={firebaseImage} alt="Firebaseのロゴ" />
              <h4>Firebase</h4>
              <p>Firebaseがつかえます</p>
            </div>
          </div>
          <button type="button" class="btn btn-primary">
            スキル一覧
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
