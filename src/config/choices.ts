// Central definition of the four project directions and their build
// artifacts. Update copy, colors, or artwork references here — nothing
// else in the app needs to change.
//
// exampleProject is the short teaser shown on the choice picker cards.
// buildDetails is the longer, approved copy shown on the reveal screen —
// keep these distinct; buildDetails is too long for the picker cards.

export type ChoiceId =
  | "interactive-tool"
  | "live-data"
  | "signed-in-portal"
  | "standalone-app";

export interface Choice {
  id: ChoiceId;
  label: string;
  artifactName: string;
  description: string;
  exampleProject: string;
  buildDetails: string;
  resourceLabel: string;
  resourceUrl: string;
  accentColor: string;
  artworkSrc: string;
  artworkAlt: string;
}

export const CHOICES: Choice[] = [
  {
    id: "interactive-tool",
    label: "An interactive tool",
    artifactName: "Control Deck",
    description:
      "A pocket-sized command center, alive with dials, buttons, and switches. Every choice sets a new possibility in motion.",
    exampleProject: "A calculator, configurator, quiz, or planning tool.",
    buildDetails:
      "A calculator, configurator, quiz, or planning tool. Webflow Cloud becomes useful when the experience needs to save shared results, make secure requests, or connect to another service.",
    resourceLabel: "Explore data storage",
    resourceUrl: "https://developers.webflow.com/webflow-cloud/storing-data/overview",
    accentColor: "#FF6B00",
    artworkSrc: "/artifacts/interactive-tool.png",
    artworkAlt:
      "Control Deck, a low-poly control panel with glowing buttons, a joystick, and switches.",
  },
  {
    id: "live-data",
    label: "A live data experience",
    artifactName: "Signal Beacon",
    description:
      "A curious beacon tuned to signals from every direction, gathering each update and bringing the latest picture into view.",
    exampleProject:
      "A property search, availability lookup, live schedule, or job listings.",
    buildDetails:
      "A property search, availability lookup, live schedule, or job listings. A Cloud app can request current data from another system without exposing private credentials.",
    resourceLabel: "See a live-data example",
    resourceUrl: "https://github.com/Webflow-Examples/careers-page-webapp",
    accentColor: "#146EF5",
    artworkSrc: "/artifacts/live-data.png",
    artworkAlt:
      "Signal Beacon, a low-poly glowing blue orb radiating pulses of light from a dark pedestal.",
  },
  {
    id: "signed-in-portal",
    label: "A signed-in portal",
    artifactName: "Key Portal",
    description:
      "A quiet doorway that knows who is knocking, opening onto a space arranged just for them.",
    exampleProject:
      "A customer account, employee resource, member dashboard, or private document center.",
    buildDetails:
      "A customer account, employee resource, member dashboard, or private document center. The app can connect to an identity provider and check access before returning protected information.",
    resourceLabel: "Explore authentication examples",
    resourceUrl: "https://github.com/Webflow-Examples/auth-cloud-webapp",
    accentColor: "#7A3DFF",
    artworkSrc: "/artifacts/signed-in-portal.png",
    artworkAlt:
      "Key Portal, a low-poly glowing archway with a key fragment floating beside it.",
  },
  {
    id: "standalone-app",
    label: "A standalone app",
    artifactName: "Launch Pod",
    description:
      "A small vessel carrying a complete idea, ready to lift off and find a place of its own online.",
    exampleProject:
      "An event planner, internal tool, focused web product, or experimental experience.",
    buildDetails:
      "An event planner, internal tool, focused web product, or experimental experience. Webflow Cloud can host it on its own domain without requiring a parent Webflow site.",
    resourceLabel: "Deploy a standalone app",
    resourceUrl: "https://developers.webflow.com/webflow-cloud/getting-started",
    accentColor: "#00D722",
    artworkSrc: "/artifacts/standalone-app.png",
    artworkAlt:
      "Launch Pod, a low-poly cracked-open orb glowing from within, mounted on a stand.",
  },
];

export function getChoiceById(id: string): Choice | undefined {
  return CHOICES.find((choice) => choice.id === id);
}

export const CHOICE_IDS = CHOICES.map((choice) => choice.id) as ChoiceId[];
