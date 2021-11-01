import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.coachSchedule';

export const translation = defineMessage({
  mySchedule: {
    id: `${scope}.mySchedule`,
    defaultMessage: 'My schedule',
  },
  today: {
    id: `${scope}.today`,
    defaultMessage: 'Today',
  },
  schedule: {
    id: `${scope}.schedule`,
    defaultMessage: 'Schedule',
  },
  allDay: {
    id: `${scope}.allDay`,
    defaultMessage: 'ALL DAY',
  },
  afternoon: {
    id: `${scope}.afternoon`,
    defaultMessage: 'AFTERNOON',
  },
  morning: {
    id: `${scope}.morning`,
    defaultMessage: 'MORNING',
  },
  spot: {
    id: `${scope}.spot`,
    defaultMessage: 'Spot: {{city}}',
  },
  sessionWith: {
    id: `${scope}.sessionWith`,
    defaultMessage: 'Session with {{surfer}}',
  },
});
