import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const I18n = ({ id, defaultMessage }) => {
  const { i18n } = useTranslation();
  return <>{i18n.t(id, defaultMessage)}</>;
};

export default memo(I18n);
