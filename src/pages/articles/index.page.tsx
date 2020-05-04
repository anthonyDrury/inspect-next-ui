import React, { useEffect } from "react";
import { updatePageDescription } from "../../common/routes";
import { Container, Typography } from "@material-ui/core";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
import AboutInspectNext from "../../components/AboutInspectNext/AboutInspectNext";

function Articles(): JSX.Element {
  useEffect((): void => {
    updatePageDescription(
      `beekeeping articles`,
      `beekeeping articles and guides`
    );
  });
  return (
    <Container>
      <Typography variant="h5" component="h1">
        Beekeeping Articles
      </Typography>
      <Typography component="p">
        Articles on a wide range of topics such as, beehive inspection, disease,
        pest management. With more coming soon.
      </Typography>
      <ArticlePreview
        header="Beehive inspection"
        text="How to conduct a beehive inspection"
        link="/articles/beehive-inspection"
      />

      <AboutInspectNext />
    </Container>
  );
}

export default Articles;
