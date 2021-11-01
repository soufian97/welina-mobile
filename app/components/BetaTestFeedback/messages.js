import { defineMessage } from '../I18n/defineMessage';

const scope = 'app.components.betaTestModal';

export const translation = defineMessage({
  selectFeedBack: {
    id: `${scope}.selectFeedBack`,
    defaultMessage:
      'Select the type of feedback you want to share with us regarding current screen :',
  },
  explain: {
    id: `${scope}.explain`,
    defaultMessage: 'Explain to us :',
  },
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Send',
  },
  clickToEnd: {
    id: `${scope}.clickToEnd`,
    defaultMessage: 'Click here if you’re finished Browsing the app!',
  },
  rewardsTitle1: {
    id: `${scope}.rewardsTitle1`,
    defaultMessage: 'What I like',
  },
  rewardsTitle2: {
    id: `${scope}.rewardsTitle2`,
    defaultMessage: "What I don't like",
  },
  rewardsTitle3: {
    id: `${scope}.rewardsTitle3`,
    defaultMessage: 'I have a suggestion/ recommendation',
  },
  rewardsTitle4: {
    id: `${scope}.rewardsTitle4`,
    defaultMessage: 'Report a bug/ issue',
  },
  stringBlankError: {
    id: `${scope}.stringBlankError`,
    defaultMessage: '{{name}} is required',
  },
  cancelQuestion: {
    id: `${scope}.cancelQuestion`,
    defaultMessage: 'Are you done beta testing?',
  },
  cancelContent: {
    id: `${scope}.cancelContent`,
    defaultMessage: 'If you press confirm this popup will never appear',
  },
});
