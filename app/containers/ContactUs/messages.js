import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.contactUs';

export const translation = defineMessage({
  contactUs: {
    id: `${scope}.contactUs`,
    defaultMessage: 'Contact us',
  },
  ifYouNeedOurHelp: {
    id: `${scope}.ifYouNeedOurHelp`,
    defaultMessage:
      'If you need our help, have questions about how to use the platform or you are experiencing technical difficulties, please do not hesitate to contact us.',
  },
  yourEmail: {
    id: `${scope}.yourEmail`,
    defaultMessage: 'Your Email*',
  },
  yourName: {
    id: `${scope}.yourName`,
    defaultMessage: 'Your name*',
  },
  yourMessage: {
    id: `${scope}.yourMessage`,
    defaultMessage: 'Your message*',
  },
  typeYourName: {
    id: `${scope}.typeYourName`,
    defaultMessage: 'Type your name...',
  },
  typeYourEmail: {
    id: `${scope}.typeYourEmail`,
    defaultMessage: 'Type your Email...',
  },
  typeYourMessage: {
    id: `${scope}.typeYourMessage`,
    defaultMessage: 'Type your message...',
  },
  bySubmitting: {
    id: `${scope}.bySubmitting`,
    defaultMessage:
      'By submitting this form you agree to our terms and conditions and our Privacy Policy which explains how we may collect, use and disclose your personal information including to third parties.',
  },
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Send',
  },
  emailUs: {
    id: `${scope}.emailUs`,
    defaultMessage: 'Email us',
  },
  emailUsFor: {
    id: `${scope}.emailUsFor`,
    defaultMessage:
      'Email us for general queries, including marketing and partnership opportunities.',
  },
  callUs: {
    id: `${scope}.callUs`,
    defaultMessage: 'Call us',
  },
  callUsToSpeak: {
    id: `${scope}.callUsToSpeak`,
    defaultMessage:
      'Call us to speak to a member of our team. We are always happy to help.',
  },
  emaillSuccess: {
    id: `${scope}.emaillSuccess`,
    defaultMessage: 'Your message was sent successfully',
  },
  okay: {
    id: `${scope}.okay`,
    defaultMessage: 'Okay',
  },
  stringBlankError: {
    id: `${scope}.stringBlankError`,
    defaultMessage: '{{name}} is required',
  },
});
