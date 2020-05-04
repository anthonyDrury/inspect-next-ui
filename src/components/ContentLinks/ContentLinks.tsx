import React, { Dispatch, SetStateAction, useState } from "react";
import { ContentLink } from "../../types/app.type";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Link as MatLink,
} from "@material-ui/core";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

type ContentLinksState = {
  expanded: boolean;
};

function getLinkElement(links: ContentLink[]): JSX.Element {
  return (
    <>
      {links.map(
        (link: ContentLink): JSX.Element => (
          <li>
            <Link href={`#${link.id}`} passHref>
              <MatLink component="a">{link.label}</MatLink>
            </Link>
          </li>
        )
      )}
    </>
  );
}

const ContentLinks: React.FunctionComponent<{
  content: ContentLink[];
}> = (props: { content: ContentLink[] }): JSX.Element => {
  const [localState, setLocalState]: [
    ContentLinksState,
    Dispatch<SetStateAction<ContentLinksState>>
  ] = useState({
    expanded: false,
  } as ContentLinksState);
  return (
    <ExpansionPanel
      className="in-article__content-table"
      onChange={(e: any, expanded: boolean): void =>
        setLocalState({ ...localState, expanded })
      }
    >
      <ExpansionPanelSummary>
        <Typography component="p">Content</Typography>
        <FontAwesomeIcon
          size="2x"
          style={{ marginLeft: "auto" }}
          icon={localState.expanded ? faAngleUp : faAngleDown}
        />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ul>{getLinkElement(props.content)}</ul>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ContentLinks;
