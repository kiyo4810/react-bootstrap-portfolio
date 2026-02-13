import React from "react";
import { Container, Button, Stack } from "react-bootstrap";

const SnsPage = () => {
  return (
    <Container className="py-5 text-center">
      <h2>SNS Links</h2>
      <p>こちらでも活動を発信しています！</p>

      {/* リンクを縦または横に並べるためのStack */}
      <Stack gap={3} className="col-md-5 mx-auto">
        <Button variant="dark" href="https://x.com/kiyo4810" target="_blank">
          X (旧Twitter) をフォロー
        </Button>

        <Button variant="danger" href="https://instagram.com/kiyo4810" target="_blank">
          Instagram をチェック
        </Button>
      </Stack>
    </Container>
  );
};

export default SnsPage;
