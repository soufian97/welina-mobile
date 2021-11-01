import { defineMessage } from '../../../../components/I18n/defineMessage';

const scope = 'app.components.coachDescription';

export const translation = defineMessage({
  basicInformation: {
    id: `${scope}.basicInformation`,
    defaultMessage: 'Basic information',
  },
  myWorkExperience: {
    id: `${scope}.myWorkExperience`,
    defaultMessage: 'My work experience',
  },
  licensed: {
    id: `${scope}.licensed`,
    defaultMessage: 'I am licensed to teach surfing',
  },
  years: {
    id: `${scope}.years`,
    defaultMessage: '🎖{{years}} years of {{skill}} in {{location}}',
  },
  workExperience: {
    id: `${scope}.workExperience`,
    defaultMessage: 'Work Experience',
  },
  language: {
    id: `${scope}.language`,
    defaultMessage: 'Language',
  },
  gallery: {
    id: `${scope}.gallery`,
    defaultMessage: 'Gallery',
  },
});
