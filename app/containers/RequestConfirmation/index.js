import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import GoBackHeader from '../../components/Headers/GobackHeader';
import I18n from '../../components/I18n';
import i18n from '../../config/i18n';
import { translation } from './messages';
import { Style } from './style';
import avatar from '../../assets/images/avatar.png';
import {
  OptionsIcon,
  SurferLogo,
  ProfileIcon,
  ProfileFilledIcon,
} from '../../assets/svgs';
import Button from '../../components/Buttons/Button';
import { colors } from '../../utils/colors';
import Menu, { MenuItem } from 'react-native-material-menu';
import { dateRange, getMonthsDays } from '../../utils/date/datesRange';
import { addYears, format, startOfToday } from 'date-fns';
import DayPicker from '../../components/DayPicker';
import { routes } from '../../utils/navigation/routes';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import { getRequestDetails, acceptRequest } from './store/actions.creator';
import requestDetailsReducerConfig from './store/reducer';
import requestDetailsSagaConfig from './store/saga';
import {
  getRequestDetailsLoaderSelector,
  getRequestDetailsSelector,
} from './store/selectors';
import { getCurrentUser } from '../Auth/store/selectors';
import { isEmpty } from 'lodash';
import { BOOKED, ERROR_MODAL, PAST } from '../../config/app.constant';
import { openModal } from '../Modal/store/actions.creator';

const size = {
  radius: 20,
  height: 45,
  width: Dimensions.get('window').width * 0.35,
};

const RequestConfirmation = ({
  navigation,
  route,
  getRequestDetails,
  acceptRequest,
  requestsDetails,
  currentCoach,
  isLoading,
  openModal,
}) => {
  useInjectReducer(requestDetailsReducerConfig);
  useInjectSaga(requestDetailsSagaConfig);
  const { requestId, source } = route.params;
  const { surfer, offer, reservationDate } = requestsDetails;
  const months = useMemo(
    () => dateRange(new Date(reservationDate), addYears(startOfToday(), 1)),
    [reservationDate],
  );

  const [monthsDays, setMonthsDays] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const getRequestDetailsCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      }
    },
    [openModal],
  );
  useEffect(() => {
    getRequestDetails(requestId, getRequestDetailsCallback);
  }, [getRequestDetails, getRequestDetailsCallback, requestId]);

  useEffect(() => {
    if (reservationDate) {
      setMonthsDays(
        getMonthsDays(new Date(reservationDate), new Date(reservationDate)),
      );
      setSelectedMonth(new Date(reservationDate));
      setSelectedDay(format(new Date(reservationDate), 'd'));
    }
  }, [reservationDate]);
  const menu = useRef();

  const showMenu = () => {
    menu.current.show();
  };

  const handleDeclinePressed = useCallback(() => {
    navigation.navigate(routes.REQUEST_CANCELATION, {
      requestId: requestsDetails?.id,
    });
  }, [navigation, requestsDetails]);

  const handleSurferProfilePressed = useCallback(() => {
    menu.current.hide();
    navigation.navigate(routes.SURFER_PROFILE, { surferId: surfer?.id });
  }, [navigation, surfer]);

  const acceptRequestCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        navigation.replace(routes.COACH_REQUESTS);
      }
    },
    [navigation, openModal],
  );
  const handleOfferAccepted = useCallback(() => {
    acceptRequest(requestsDetails.id, acceptRequestCallback);
  }, [acceptRequest, acceptRequestCallback, requestsDetails]);

  const renderMenuOptions = () => (
    <View style={Style.menuContainer}>
      <Menu
        ref={menu}
        button={
          <TouchableOpacity onPress={showMenu} style={Style.menuIcon}>
            <OptionsIcon />
          </TouchableOpacity>
        }
      >
        <MenuItem
          onPress={handleSurferProfilePressed}
          style={Style.menuItemMainContainer}
        >
          <View style={Style.menuItemContainer}>
            <ProfileFilledIcon />
            <Text style={Style.textMenu}>
              <I18n {...translation.profile} />
            </Text>
          </View>
        </MenuItem>
      </Menu>
    </View>
  );
  const calendarTitle = (
    <Text style={Style.textDuration}>
      {i18n.t(translation.duration.id)}
      <Text style={Style.textDay}>
        {i18n.t(translation.day.id, {
          day: offer?.numberOfDays,
        })}
      </Text>
    </Text>
  );

  const getRequestTitle = () => {
    switch (source) {
      case BOOKED:
        return <I18n {...translation.reservationDetails} />;
      case PAST:
        return <I18n {...translation.pastSessionTitle} />;
      default:
        return <I18n {...translation.recivingRequest} />;
    }
  };

  const getRequestType = () => {
    switch (source) {
      case BOOKED:
        return <I18n {...translation.scheduledSessionTitle} />;
      case PAST:
        return <I18n {...translation.pastSessionBody} />;
      default:
        return <I18n {...translation.youRecivedNewRequest} />;
    }
  };

  return (
    <View style={Style.screen}>
      <GoBackHeader />
      {isLoading || isEmpty(requestsDetails) ? (
        <ActivityIndicator
          size={'large'}
          color={colors.PRIMARY}
          style={Style.activityIndicator}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={Style.textScreenTitle}>{getRequestTitle()}</Text>
          <View style={Style.mainCardContainer}>
            <Text style={Style.textCardTitle}>
              {i18n.t(translation.hi.id, { name: currentCoach?.firstName })}
            </Text>
            <Text style={Style.textCardSubTitle}>{getRequestType()}</Text>
            <View style={Style.offerImageContainer}>
              <View style={Style.titleContainer}>
                <Text style={Style.textOfferTitle}>{offer?.title}</Text>
                <Text style={Style.textOfferCity}>{offer?.city?.label}</Text>
              </View>
              {offer?.gallery.slice(0, 3).map((image, index) => (
                <Image
                  key={`${index}`}
                  source={{ uri: image }}
                  style={Style.offerImage(index)}
                />
              ))}
            </View>
            <View style={Style.dayPicker}>
              <DayPicker
                title={calendarTitle}
                selectedMonth={selectedMonth}
                selectedDay={selectedDay}
                monthsDays={monthsDays}
                months={months}
                editable={false}
              />
            </View>
            <View style={Style.surferInformation}>
              <View style={Style.surferContainer}>
                <TouchableOpacity
                  style={Style.surferProfileContainer}
                  onPress={handleSurferProfilePressed}
                >
                  <Image
                    source={surfer?.photo ? { uri: surfer.photo } : avatar}
                    style={Style.avatarImage}
                  />
                  <View style={Style.surferNameContainer}>
                    <Text
                      style={Style.textSurferName}
                      numberOfLines={1}
                    >{`${surfer.firstName} ${surfer.lastName}`}</Text>
                    <Text style={Style.textSurferBadge}>{surfer.type}</Text>
                  </View>
                </TouchableOpacity>
                {renderMenuOptions()}
              </View>
              <View style={Style.surferContainer}>
                <SurferLogo />
                <Text style={Style.textServicePrice}>
                  <I18n {...translation.servicePrice} />
                </Text>
                <Text style={Style.textServiceTotalPrice}>
                  {i18n.t(translation.total.id, {
                    price: `${requestsDetails.currency} ${requestsDetails.totalAmount}`,
                  })}
                </Text>
              </View>
              <View style={Style.surferContainer}>
                <ProfileIcon iconColor={colors.PRIMARY_DARK} />
                <Text style={Style.textGroupSize}>
                  {i18n.t(translation.groupSize.id, {
                    number: requestsDetails.numberOfPeople,
                  })}
                </Text>
                <Text style={Style.textSecurePayment}>
                  <I18n {...translation.securePayment} />
                </Text>
              </View>
            </View>
          </View>
          {!source && (
            <View style={Style.buttonContainer}>
              <Button
                size={size}
                title={i18n.t(translation.accept.id)}
                onPress={handleOfferAccepted}
              />
              <Button
                color={[colors.BLUE_DARK, colors.BLUE_DARK]}
                size={size}
                title={i18n.t(translation.decline.id)}
                onPress={handleDeclinePressed}
              />
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  requestsDetails: getRequestDetailsSelector(),
  currentCoach: getCurrentUser(),
  isLoading: getRequestDetailsLoaderSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getRequestDetails,
      acceptRequest,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RequestConfirmation);
