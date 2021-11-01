import { defineMessage } from '../I18n/defineMessage';

const scope = 'app.containers.aboutSession';

export const translation = defineMessage({
  offerDetails: {
    id: `${scope}.offerDetails`,
    defaultMessage: 'Details of {{type}}',
  },
  whatIsIncluded: {
    id: `${scope}.whatIsIncluded`,
    defaultMessage: "What's included:",
  },
  duration: {
    id: `${scope}.duration`,
    defaultMessage: 'Duration: up to {{duration}} hours',
  },
  numberOfDays: {
    id: `${scope}.numberOfDays`,
    defaultMessage: 'Package of {{days}} x day',
  },
  skillLevel: {
    id: `${scope}.skillLevel`,
    defaultMessage: 'Skill level : {{skillLevel}}',
  },
  languages: {
    id: `${scope}.languages`,
    defaultMessage: 'Languages : {{languages}}',
  },
  groupSize: {
    id: `${scope}.groupSize`,
    defaultMessage: 'Max group size: {{groupSize}}',
  },
  withKids: {
    id: `${scope}.withKids`,
    defaultMessage: 'With kids',
  },
});
