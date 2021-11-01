import { Text, View } from 'react-native';
import { Style } from '../../style';
import I18n from '../../../../components/I18n';
import { translation } from '../../message';
import React from 'react';
import { colors } from '../../../../utils/colors';

const TermsOfUseContents = ({
  displayTitle = true,
  textColor = colors.WHITE,
  subTitleCustomStyle,
  descriptionCustomStyle,
}) => (
  <>
    {displayTitle && (
      <Text style={Style.textTitle(textColor)}>
        <I18n {...translation.title} />
      </Text>
    )}
    <Text style={[Style.textDescription(textColor), descriptionCustomStyle]}>
      <I18n {...translation.description} />
    </Text>
    <Text style={[Style.textSubTitle(textColor), subTitleCustomStyle]}>
      <I18n {...translation.collectPersonalInfoSubTitle} />
    </Text>
    <Text style={[Style.textDescription(textColor), descriptionCustomStyle]}>
      <I18n {...translation.collectPersonalInfoContent} />
    </Text>
    {Array(4)
      .fill(0)
      .map((_, index) => (
        <View key={`${index}`} style={Style.listContainer}>
          <View style={Style.dot(textColor)} />
          <Text
            style={[
              Style.textDescription(textColor),
              Style.textList,
              descriptionCustomStyle,
            ]}
          >
            <I18n {...translation[`collectPersonalInfoList${index + 1}`]} />
          </Text>
        </View>
      ))}
    <Text style={[Style.textSubTitle(textColor), subTitleCustomStyle]}>
      <I18n {...translation.governingLawTitle} />
    </Text>
    <Text style={[Style.textDescription(textColor), descriptionCustomStyle]}>
      <I18n {...translation.governingLawContent} />
    </Text>
    <Text style={[Style.textSubTitle(textColor), subTitleCustomStyle]}>
      <I18n {...translation.privacyPolicyTitle} />
    </Text>
    <Text style={[Style.textDescription(textColor), descriptionCustomStyle]}>
      <I18n {...translation.privacyPolicyContent} />
    </Text>
    {Array(7)
      .fill(0)
      .map((_, index) => (
        <View key={`${index}`} style={Style.listContainer}>
          <View style={Style.dot(textColor)} />
          <Text
            style={[
              Style.textDescription(textColor),
              Style.textList,
              descriptionCustomStyle,
            ]}
          >
            <I18n {...translation[`privacyPolicyList${index + 1}`]} />
          </Text>
        </View>
      ))}
  </>
);
export default TermsOfUseContents;
