import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://catgomapan.com/wp-json/wp/v2/posts?_embed&per_page=3")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="text-center" style={{ marginTop: "100px" }}>
        <Spinner animation="border" variant="primary" />
        <p>読み込み中...</p>
      </Container>
    );
  }

  return (
    // 修正前: <Container style={{ marginTop: "100px", paddingBottom: "50px" }}>
    // 修正後:
    <Container style={{ paddingTop: "120px", paddingBottom: "50px" }}>
      <h1 className="mb-5 text-center fw-bold">最新のブログ記事</h1>
      <Row>
        {posts.map((post) => (
          <Col md={4} key={post.id} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              {/* 画像のコンテナに aspect-ratio を指定するとより確実です */}
              <div style={{ width: "100%", aspectRatio: "16 / 9", overflow: "hidden" }}>
                {post._embedded && post._embedded["wp:featuredmedia"] ? (
                  <Card.Img variant="top" src={post._embedded["wp:featuredmedia"][0].source_url} alt={post.title.rendered} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "#eee" }} />
                )}
              </div>

              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-5 fw-bold" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <Card.Text className="text-muted small flex-grow-1" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.substring(0, 100) + "..." }} />
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm mt-3">
                  記事を読む
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BlogPage;
