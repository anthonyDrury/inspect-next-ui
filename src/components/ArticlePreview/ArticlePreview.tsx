import React from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import Link from "next/link";

const ArticlePreview: React.FunctionComponent<{
  header: string;
  text: string;
  link: string;
  imageRef?: string;
}> = (props: {
  header: string;
  text: string;
  link: string;
  imageRef?: string;
}): JSX.Element => {
  return (
    <Link href={props.link} passHref>
      <Card
        style={{
          display: "inline-block",
          backgroundColor: "#D8D8D8",
          marginTop: "0.5rem",
          cursor: "pointer",
        }}
      >
        <CardContent>
          <Typography variant="h6" component="p">
            {props.header}
          </Typography>
          <Typography component="p">{props.text}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticlePreview;
