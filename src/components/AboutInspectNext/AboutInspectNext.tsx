import React from "react";
import { Typography, Paper } from "@material-ui/core";

const AboutInspectNext: React.FunctionComponent = (): JSX.Element => {
  return (
    <Paper className="in-article__content">
      <Typography
        variant="h5"
        className="in-article__content-header"
        component="h3"
        id="after-the-inspection"
      >
        About Inspect Next
      </Typography>
      <Typography component="p" className="in-article-paragraph">
        Here at inspect next we are aiming to create content and tools to better
        assist the beekeeping community.
      </Typography>
      <Typography component="p" className="in-article-paragraph">
        We hope our content is useful for you, and if you ever find something
        that needs improving, please reach out.
      </Typography>
      <Typography component="p" className="in-article-paragraph">
        We want to help how we can, and community feedback helps a lot.
      </Typography>
      <Typography component="p" className="in-article-paragraph">
        You can find our email below if you have anything to say.
      </Typography>
      <Typography component="p" className="in-article-paragraph">
        <a
          onClick={(
            event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
          ): void => {
            event.preventDefault();
            if (window !== null) {
              window.open("mailto:admin@inspectnext.com", "mail");
            }
          }}
          href="mailto:admin@inspectnext.com"
        >
          mail: admin@inspectnext.com
        </a>
      </Typography>
    </Paper>
  );
};

export default AboutInspectNext;
