import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.coachPending';

export const translation = defineMessage({
  submissionPending: {
    id: `${scope}.submissionPending`,
    defaultMessage: 'your submission is pending',
  },
  willGoBack: {
    id: `${scope}.willGoBack`,
    defaultMessage: "we'll get back to you once your app is confirmed",
  },
  goBack: {
    id: `${scope}.goBack`,
    defaultMessage: 'Back to discover',
  },
});
