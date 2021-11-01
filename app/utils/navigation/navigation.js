import React, { useCallback, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Dimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import MapsImage from '../../assets/images/MapsImage.png';
import DiscoverSessions from '../../assets/images/DiscoverSessions.webp';
import Splash from '../../containers/Splash';
import Discover from '../../containers/Discover';
import Details from '../../containers/OfferDetails';
import CoachDetails from '../../containers/CoachDetails';
import Auth from '../../containers/Auth';
import Filter from '../../containers/OfferFilter';
import RequestSession from '../../containers/RequestSession';
import TermsOfService from '../../containers/TrermsOfService';
import Offers from '../../containers/FilterResults';
import WriteReview from '../../containers/WriteReview';
import Discussion from '../../containers/Discussion';
import Faq from '../../containers/Faq';
import BookingList from '../../containers/BookingList';
import UpdateInfo from '../../containers/UpdateSurferInfo';
import CoachSchedule from '../../containers/CoachSchedule';
import RequestConfirmation from '../../containers/RequestConfirmation';
import AddOffer from '../../containers/AddOffer';
import RequestCancelation from '../../containers/RequestCancellation';
import BasicInfo from '../../containers/BasicInfo';
import PendingPage from '../../containers/PendingPage';
import CoachUpdateProfile from '../../containers/CoachUpdateProfile';
import DrawerMenu from '../../containers/DrawerMenu';
import CoachProfile from '../../containers/CoachProfile';
import CoachDashboard from '../../containers/CoachDashboard';
import CoachRequests from '../../containers/CoachRequests';
import Notifications from '../../containers/Notifications';
import SurferProfile from '../../containers/SurferProfile';
import Messages from '../../containers/Messages';
import ContactUs from '../../containers/ContactUs';
import CoachPastEvents from '../../containers/CoachPastEvents';
import TermsOfUse from '../../containers/TermsOfUse';
import { routes } from './routes';
import { colors } from '../colors';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';
import { checkCurrent } from '../../containers/Auth/store/actions.creator';

const stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const { width, height } = Dimensions.get('screen');

const Screens = ({ animatedStyle }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, animatedStyle])}>
      <stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
          headerTitle: null,
          gestureEnabled: false,
        }}
        initialRouteName={routes.SPLASH}
      >
        <stack.Screen name={routes.SPLASH} component={Splash} />
        <stack.Screen name={routes.DISCOVER} component={Discover} />
        <stack.Screen name={routes.DETAILS} component={Details} />
        <stack.Screen name={routes.COACH_DETAILS} component={CoachDetails} />
        <stack.Screen name={routes.AUTH} component={Auth} />
        <stack.Screen name={routes.FILTER} component={Filter} />
        <stack.Screen
          name={routes.REQUEST_SESSION}
          component={RequestSession}
        />
        <stack.Screen
          name={routes.TERMS_OF_SERVICE}
          component={TermsOfService}
        />
        <stack.Screen name={routes.LIST_OFFERS} component={Offers} />
        <stack.Screen name={routes.WRITE_REVIEW} component={WriteReview} />
        <stack.Screen name={routes.DISCUSSION} component={Discussion} />
        <stack.Screen name={routes.FAQ} component={Faq} />
        <stack.Screen name={routes.BOOKING_LIST} component={BookingList} />
        <stack.Screen name={routes.UPDATE_INFO} component={UpdateInfo} />
        <stack.Screen name={routes.COACH_SCHEDULE} component={CoachSchedule} />
        <stack.Screen
          name={routes.REQUEST_CONFIRMATION}
          component={RequestConfirmation}
        />
        <stack.Screen
          name={routes.COACH_PASTE_EVENTS}
          component={CoachPastEvents}
        />
        <stack.Screen name={routes.ADD_OFFER} component={AddOffer} />
        <stack.Screen
          name={routes.REQUEST_CANCELATION}
          component={RequestCancelation}
        />
        <stack.Screen name={routes.BASIC_INFO} component={BasicInfo} />
        <stack.Screen name={routes.PENDING_PAGE} component={PendingPage} />
        <stack.Screen
          name={routes.COACH_UPDATE_PROFILE}
          component={CoachUpdateProfile}
        />
        <stack.Screen name={routes.COACH_PROFILE} component={CoachProfile} />
        <stack.Screen
          name={routes.COACH_DASHBOARD}
          component={CoachDashboard}
        />
        <stack.Screen name={routes.COACH_REQUESTS} component={CoachRequests} />
        <stack.Screen name={routes.NOTIFICATION} component={Notifications} />
        <stack.Screen name={routes.SURFER_PROFILE} component={SurferProfile} />
        <stack.Screen name={routes.MESSAGES} component={Messages} />
        <stack.Screen name={routes.CONTACT_US} component={ContactUs} />
        <stack.Screen name={routes.TERMS_OF_USE} component={TermsOfUse} />
      </stack.Navigator>
    </Animated.View>
  );
};

export default () => {
  let animatedStyle = {};

  const dispatch = useDispatch();
  const checkCurrentCallback = useCallback(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    dispatch(checkCurrent(checkCurrentCallback));
  }, [checkCurrentCallback, dispatch]);

  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={[colors.PRIMARY_DARK, colors.PRIMARY]}
      style={styles.flexOne}
    >
      <Image style={styles.imageContainer} source={MapsImage} />
      <Image style={styles.virtualImageContainer} source={DiscoverSessions} />
      <Drawer.Navigator
        backBehavior="order"
        drawerType="slide"
        overlayColor="transparent"
        backgroundColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={styles.flexOne}
        sceneContainerStyle={styles.sceneContainerStyle}
        drawerContent={(props) => {
          const scale = Animated.interpolateNode(props.progress, {
            inputRange: [0, 1],
            outputRange: [1, 0.8],
            extrapolate: Animated.Extrapolate.CLAMP,
          });
          const borderRadius = Animated.interpolateNode(props.progress, {
            inputRange: [0, 1],
            outputRange: [1, 30],
            extrapolate: Animated.Extrapolate.CLAMP,
          });
          animatedStyle = {
            borderRadius: borderRadius,
            transform: [
              {
                scale: scale,
              },
            ],
          };
          return <DrawerMenu {...props} />;
        }}
      >
        <stack.Screen name="Screens">
          {(props) => <Screens {...props} animatedStyle={animatedStyle} />}
        </stack.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: colors.WHITE,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    overlayColor: 'transparent',
  },
  drawerStyles: {
    flex: 1,
    width: '70%',
    backgroundColor: 'transparent',
  },
  sceneContainerStyle: {
    backgroundColor: 'transparent',
  },
  flexOne: {
    flex: 1,
  },
  drawerItem: {
    alignItems: 'flex-start',
    marginVertical: 0,
  },
  drawerLabel: {
    color: colors.WHITE,
    marginLeft: -16,
  },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: colors.WHITE,
    borderWidth: StyleSheet.hairlineWidth,
  },
  imageContainer: {
    position: 'absolute',
    zIndex: -10,
    height,
    width,
  },
  virtualImageContainer: {
    position: 'absolute',
    zIndex: -8,
    height: height * 0.7,
    width: width * 0.8,
    borderRadius: 25,
    left: width * 0.7,
    top: height * 0.15,
    bottom: 0,
    opacity: 0.3,
  },
  betaScticker: {
    position: 'absolute',
    right: 15,
    bottom: 20,
    zIndex: 150,
  },
});
