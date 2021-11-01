import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.discussion';

export const translation = defineMessage({
  coach: {
    id: `${scope}.coach`,
    defaultMessage: 'Coach',
  },
  surfer: {
    id: `${scope}.surfer`,
    defaultMessage: 'Surfer',
  },
});
