import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Style } from './style';
import { translation } from './messages';
import i18n from '../../config/i18n';
import GoBackHeader from '../../components/Headers/GobackHeader';
import Question from './components/Question';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapsStyle from '../../utils/mapsStyle';
import TermsOfUseContents from '../TermsOfUse/components/TermsOfUseContents';
import { colors } from '../../utils/colors';
import HelpCenterClickParagraph from './components/HelpCenterClickParagraph';
import { routes } from '../../utils/navigation/routes';
import { useDispatch, useSelector } from 'react-redux';
import { openBetaTestModalAction } from '../Splash/store/actions.creator';
import { getCurrentUser } from '../Auth/store/selectors';

const Faq = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser());
  const onPressContactUs = useCallback(
    () => navigation.navigate(routes.CONTACT_US),
    [navigation],
  );

  const onPressGiveUsFeedback = useCallback(() => {
    if (currentUser) {
      dispatch(openBetaTestModalAction());
    } else {
      navigation.navigate(routes.AUTH);
    }
  }, [currentUser, dispatch, navigation]);

  const questionsData = useMemo(
    () => [
      {
        question: i18n.t(translation.whatIsWelina.id),
        answer: (
          <Text style={Style.textAnswer}>
            {i18n.t(translation.whatIsWelinaAnswer.id)}
          </Text>
        ),
      },
      {
        question: i18n.t(translation.howWelinaWorks.id),
        answer: null,
      },
      {
        question: i18n.t(translation.termsOfService.id),
        answer: (
          <Text style={Style.textAnswer}>
            {i18n.t(translation.comingSoon.id)}
          </Text>
        ),
      },
      {
        question: i18n.t(translation.termsOfUseTile.id),
        answer: (
          <TermsOfUseContents
            textColor={colors.BLACK}
            displayTitle={false}
            descriptionCustomStyle={Style.textAnswer}
            subTitleCustomStyle={Style.textSubtitle}
          />
        ),
      },
      {
        question: i18n.t(translation.giveUsFeedbackTitle.id),
        answer: (
          <HelpCenterClickParagraph
            firstContent={i18n.t(translation.giveUsFeedbackContent1.id)}
            secondContent={i18n.t(translation.giveUsFeedbackContent2.id)}
            onPress={onPressGiveUsFeedback}
          />
        ),
      },
      {
        question: i18n.t(translation.reportUserTitle.id),
        answer: (
          <Text style={Style.textAnswer}>
            {i18n.t(translation.reportUserContent.id)}
          </Text>
        ),
      },
      {
        question: i18n.t(translation.contactUsTitle.id),
        answer: <HelpCenterClickParagraph onPress={onPressContactUs} />,
      },
    ],
    [onPressContactUs, onPressGiveUsFeedback],
  );

  const _map = useRef(null);
  const initialRegion = {
    latitude: 33.597739,
    longitude: -7.635933,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  };
  useEffect(() => {
    _map.current &&
      _map.current.animateToRegion(
        {
          ...initialRegion,
        },
        800,
      );
  });
  return (
    <View style={Style.screen}>
      <MapView
        ref={_map}
        style={Style.maps}
        provider={PROVIDER_GOOGLE}
        maxZoomLevel={2}
        customMapStyle={mapsStyle}
      />
      <View style={Style.container}>
        <GoBackHeader />
        <ScrollView
          style={Style.marginTopStyle}
          showsVerticalScrollIndicator={false}
        >
          {questionsData.map((question, index) => (
            <View key={`${index}`}>
              <Question {...question} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Faq;
