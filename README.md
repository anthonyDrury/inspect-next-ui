## Inspect Next

Website to view optimal, viable and inadvisable beehive inspection times, allowing beekeepers to better manage their time and resources.

https://inspectnext.com

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Start the Server locally:

`npm run dev`

To Visit App:

`localhost:3000`

## Reflection

I wanted a project to be a useful tool to the beekeeping community, which I am apart of. Hence `inspectnext` was coined, allowing beekeepers to view inspection times for locations all over the world.

The project is developed with `Next.js, React, Typescript`, heavily using functional components and hooks. This was also a precursor to the `InspectNext App` which is currently on the Google play store: https://play.google.com/store/apps/details?id=com.honeytech.inspectnext

The InspectNext App is React Native, though I have not made the repository public as of yet.

I host the Front End through Vercel, building and serving whenever any change is made the the `develop` or `master` branches. I utilise a self-built `Node/Typescript` serverless functions hosted through aws to proxy API calls to `OpenWeatherAPI` for the weather data, and `Googles Autocomplete places API` for locations.

One of the main challenges I face is SEO, which I plan to solve in the future by changing this project to be `server-side rendered`, though I have no time frame for completion of this.

In closing, I utilized `React, Next.js, Redux, SCSS, Typescript` to create a quick and responsive UI to modify weather data to assist beekeepers in choosing the best times to inspect their beehives.

## Technology Used

Cut the chat, right to brass tacks.
`React, Next.js, Redux, SCSS, CSS, React-Router, Jest, Typescript, Javascript, HTML`
