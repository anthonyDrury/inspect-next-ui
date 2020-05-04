import React, { useEffect } from "react";
import { Typography, Paper } from "@material-ui/core";
import { updatePageDescription } from "../../common/routes";
import CityInput from "../../components/CityInput/CityInput";
import { ContentLink } from "../../types/app.type";
import ContentLinks from "../../components/ContentLinks/ContentLinks";
import AboutInspectNext from "../../components/AboutInspectNext/AboutInspectNext";

function BeehiveInspectionArticle(): JSX.Element {
  const contentLinks: ContentLink[] = [
    {
      id: "how-often-to-inspect",
      label: "How often to inspect",
    },
    {
      id: "when-to-inspect",
      label: "When to inspect",
    },
    {
      id: "before-you-inspect",
      label: "Before you inspect",
    },
    {
      id: "during-the-inspection",
      label: "During the Inspection",
    },
    {
      id: "after-the-inspection",
      label: "After the inspection",
    },
  ];
  useEffect((): void => {
    updatePageDescription(`beehive inspection`, `beehive inspection - how to`);
  });
  return (
    <div className="in-article">
      <Paper className="in-article__hero">
        <Typography variant="h3" component="h1">
          Beehive Inspection
        </Typography>
        <Typography
          variant="h5"
          className="in-article__content-header"
          component="h2"
        >
          How to conduct a beehive inspection.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          This article will go over some of the major details you need to keep
          in mind when conducting a beehive inspection. This article is aimed at
          new or even first time beekeepers, to give them some reassurance they
          are, or will be doing things right.
        </Typography>

        <ContentLinks content={contentLinks} />
      </Paper>

      <Paper className="in-article__content">
        <Typography
          variant="h5"
          className="in-article__content-header"
          component="h3"
          id="how-often-to-inspect"
        >
          How often should I inspect the beehive?
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          This often changes from beekeeper to beekeeper and can depend on a lot
          of things. But two points to consider are:
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          What season is it? Typically most of your inspections should occur
          during Spring and Summer, when the hive is most active and the weather
          is favorable (Use our when to inspect tool to help with this).
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          Availability. When did you inspect the hive last, and how often are
          you available to inspect the hive? It is not recommended to inspect a
          hive more than weekly, unless you have a specific reason to do so.
          During the active season most beekeepers tend to inspect their hive
          weekly or fortnightly.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          Make sure to check your local legislation around beehive inspections,
          some jurisdictions have minimal requirements on how often you should
          inspect your hives. This is in order to minimize and track the spread
          of disease and pests.
        </Typography>
      </Paper>
      <Paper className="in-article__content">
        <Typography
          variant="h5"
          className="in-article__content-header"
          component="h3"
          id="when-to-inspect"
        >
          When should I inspect the beehive?
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          We are going to write up an entire article on exactly when you should
          inspect the hive, but for now here is a short writeup.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          Make sure the weather conditions are optimal, or at least viable. To
          do so you can put your location into our handy tool to view exactly
          what times are optimal, viable or inadvisable.
        </Typography>
        <CityInput
          open={true}
          style={{
            margin: "1rem auto",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          }}
        />
        <Typography component="p" className="in-article-paragraph">
          Now that you know the weather conditions are okay, time to pick an
          exact time. Most beekeepers tend to agree that later in the day is
          better. As this allows for a lot of the foragers to be outside
          working, meaning less bees in the hive which will ultimately make your
          job easier.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          So as long as the afternoon has optimal/viable conditions, pick a time
          at least a few hours after sunrise when the temperature rises a bit.
          But make sure to do it two hours before sunset, as you don’t want to
          be stuck working on a hive in the dark, as bees tend to get quite
          defensive come sundown.
        </Typography>
      </Paper>
      <Paper className="in-article__content">
        <Typography
          variant="h5"
          className="in-article__content-header"
          component="h3"
          id="before-you-inspect"
        >
          Before you inspect the beehive
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          We will soon write an article on an inspection checklist, but for now
          make sure you at least have the following prepared:
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          <strong>A goal for the inspection</strong>. You should have a goal in
          mind well before you start the inspection. Even if it is just a
          regular checkup, keep in mind what you will be looking for. This can
          be honey stores, brood in all stages, spotting the queen, pests,
          disease.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          <strong>Bee suit or Jacket and Veil</strong>. Which you use is
          completely up to you, some people are comfortable with just using a
          veil, where some people like the full protection of the suit.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          <strong>Smoker, material to burn and a lighter</strong>. This helps to
          calm the bees, as the smoke limits them from communicating with each
          other, meaning if one bee recognizes you as an attacker, the whole
          hive won’t follow suit.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          <strong>Hive tool</strong>. A beekeepers best friend, this handy tool
          will allow you to easily handle the frames, open and clean the boxes.
          They come in a multitude of styles, materials and brands. Choose
          whichever is available and reliable.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          <strong>Notepad, pen and optionally a camera</strong>. You need to at
          least have a notepad and pen/pencil. This will allow you to take notes
          on any observations you make and have a record for the future. This is
          incredibly important for diagnosing disease, finding/tracking pests
          and monitoring hive health. A camera will help a lot here, allowing to
          you quickly document the hive and you can diagnose the conditions at a
          later time.
        </Typography>
      </Paper>
      <Paper className="in-article__content">
        <Typography
          variant="h5"
          className="in-article__content-header"
          component="h3"
          id="during-the-inspection"
        >
          During the beehive Inspection
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          First thing you will want to do is don your protective gear, light
          your smoker and make sure you have access to all your tools. Take some
          notes on the activity outside of the hive, are they bringing in
          pollen? Any signs of robbing? Excess dead bees at the entrance? Any
          signs pests have disturbed the hive since the last inspection?
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          Then when you are ready, give the hive a few puffs of smoke, and open
          the lid. It may be a bit stuck as the bees tend to glue it together
          with propolis, so use your hive tool to wedge it open carefully.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          Now you should have access to your frames, depending on what your
          setup looks like you may be looking at a honey super or a brood box.
          Which frames you take out completely depend on your inspection goal.
          If you need to check honey stores, you should begin in the honey
          supers. If so, carefully take some out using your hive tool and begin
          checking the levels.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          For a full store, it should be fully capped honey, if it is full but
          not capped, that means they have not evaporated enough liquid yet. If
          you tried to harvest that honey, it could very easily spoil, causing
          anyone who eats it to get very ill. Only harvest capped honey.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          Once you are happy with the stores, move down to the brood box. You
          likely have a queen excluder here, so carefully take that off with
          your hive tool. Take a smell of the hive while you are here. If you
          get a foul sour smell, it is quite possibly a sign of disease. Take
          not and closely inspect the frames for disease, take photos if you can
          as other beekeepers can help you identify the problem.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          To begin, use your hive tool to take out one of the frames. Be extra
          careful in the brood box, as the queen resides in her and if you harm
          or kill her, it is a painful process to replace her, for yourself and
          the hive.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          When inspecting the frame inside the brood box, you ideally want to
          see bee development in all stages, that is eggs, uncapped larvae,
          capped larvae, and new bees emerging. If you see all of these then you
          know the queen has been there in the last three days, otherwise the
          eggs would usually not be present. This is often enough to satisfy
          beekeepers of the queen's presence.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          However if you need to spot the queen, to mark her for example, then
          you may need to keep looking. Before you place this frame back, double
          check to make sure the queen is not present, she looks like a regular
          worker but with an extra long abdomen.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          Continue this process until you have checked everything off you list,
          taking notes on what you see, including pests and disease. Record
          everything and close up the hive the same way you opened it.
        </Typography>
      </Paper>
      <Paper className="in-article__content">
        <Typography
          variant="h5"
          className="in-article__content-header"
          component="h3"
          id="after-the-inspection"
        >
          After the hive inspection
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          Once the hive is all packed up, take everything you prepared away from
          the hive. Empty out your smoker and make sure you soak the embers, you
          do not want to start a fire. Make sure there are no bees left on you
          and take off your suit/jacket.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          Clean off your tools and safely store them for the next inspection,
          taking care of your tools will guarantee a longer life for them. So
          keep them out of the sun and dry them off if they are wet after
          cleaning.
        </Typography>
        <Typography component="p" className="in-article-paragraph">
          Transfer your notes to whatever storage system you use. I use google
          docs, but you may use anything that works. If you had anything you
          were unsure of, go to some beekeeping community, like a facebook page,
          and ask for help. Be descriptive and if you took any photos post them
          as well.
        </Typography>
      </Paper>

      <AboutInspectNext />
    </div>
  );
}

export default BeehiveInspectionArticle;
