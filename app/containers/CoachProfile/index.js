import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import { Style } from './style';
import blurredProfile from '../../assets/images/BluredPlaceholder.jpg';
import { UpdateIcon, MapPin, CoachBadge } from '../../assets/svgs';
import { colors } from '../../utils/colors';
import { routes } from '../../utils/navigation/routes';
import I18n from '../../components/I18n';
import { translation } from './messages';
import i18n from '../../config/i18n';
import Reviews from '../../components/Reviews';
import { getCurrentUser } from '../Auth/store/selectors';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { API_URL } from '../../utils/http/http';
import {
  getReviews,
  getDescription,
  getOffers,
} from '../CoachDetails/store/actions.creator';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import {
  deleteOffer,
  addOfferSuccess,
} from '../AddOffer/store/actions.creator';
import coachDetailsReducerConfig from '../CoachDetails/store/reducer';
import coachDetailsSagaConfig from '../CoachDetails/store/saga';
import addOfferReducerConfig from '../AddOffer/store/reducer';
import addOfferSagaConfig from '../AddOffer/store/saga';

import {
  getIsLastReviewsPage,
  getReviewsSelector,
  getDescriptionSelector,
  getOffersSelector,
  getIsLastOffersPage,
} from '../CoachDetails/store/selectors';
import { USER_NOT_FOUND } from '../../utils/http/errorCodes';
import LogoutPopup from '../DrawerMenu/components/LogoutPopup';
import OffersContainer from './components/OffersContainer';
import ProfileDescription from './components/ProfileDescription';
import CoverPictureWithData from './components/CoverPictureWithData';
import CoverImageNoData from './components/CoverPictureNoData';
import { ERROR_MODAL } from '../../config/app.constant';
import { openModal } from '../Modal/store/actions.creator';

const { width } = Dimensions.get('window');
const localhostLink = 'http://localhost:8080/api/v1';
const MAX_GALLERY_ITEMS = 9;

export const CoachProfile = ({
  navigation,
  route,
  currentUser,
  getReviews,
  getDescription,
  getOffers,
  isLastReviewsPage,
  reviews,
  description,
  isLastOffersPage,
  offers,
  deleteOffer,
  addOfferSuccess,
  openModal,
}) => {
  useInjectReducer(coachDetailsReducerConfig);
  useInjectSaga(coachDetailsSagaConfig);
  useInjectReducer(addOfferReducerConfig);
  useInjectSaga(addOfferSagaConfig);

  const [selectedTab, setSelectedTab] = useState(0);
  const [reviewsPage, setReviewsPage] = useState(0);
  const [offersPage, setOffersPage] = useState(0);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [offerToDeleteId, setOfferToDeleteId] = useState(null);

  const flatListRef = useRef(null);

  const tabs = [
    i18n.t(translation.description.id),
    i18n.t(translation.offers.id),
    i18n.t(translation.reviews.id),
  ];

  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onImagePress = useCallback(
    (indexTop, indexBottom) => () => {
      setCurrentIndex(indexTop * MAX_GALLERY_ITEMS + indexBottom);
      setIsVisible(true);
    },
    [],
  );
  const onRequestClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleUpdateProfilePressed = useCallback(() => {
    navigation.navigate(routes.COACH_UPDATE_PROFILE);
  }, [navigation]);

  const handleUpdateBasicInfoPressed = useCallback(() => {
    navigation.navigate(routes.BASIC_INFO, { update: true });
  }, [navigation]);

  const detailsCallback = useCallback(
    (err) => {
      if (err && err?.response?.code !== USER_NOT_FOUND) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      }
    },
    [openModal],
  );
  const deleteOfferCallback = useCallback(
    (err) => {
      setDeleteModalVisibility(false);
      if (err && err?.response?.code !== USER_NOT_FOUND) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        navigation.replace(routes.COACH_PROFILE, { selectedTab });
      }
    },
    [navigation, openModal, selectedTab],
  );

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: selectedTab,
    });
  }, [selectedTab]);

  useEffect(() => {
    if (route?.params?.selectedTab) {
      setSelectedTab(route?.params?.selectedTab);
    }
  }, [route]);

  useEffect(() => {
    currentUser && getDescription({ coachId: currentUser.id }, detailsCallback);
  }, [currentUser, detailsCallback, getDescription, selectedTab]);

  useEffect(() => {
    currentUser &&
      getReviews({ id: currentUser.id, page: reviewsPage }, detailsCallback);
  }, [currentUser, detailsCallback, getReviews, reviewsPage, selectedTab]);

  const getMoreReviews = useCallback(
    () => !isLastReviewsPage && setReviewsPage(reviewsPage + 1),
    [isLastReviewsPage, reviewsPage],
  );

  useEffect(() => {
    currentUser &&
      getOffers({ id: currentUser.id, page: offersPage }, detailsCallback);
  }, [currentUser, detailsCallback, getOffers, offersPage, selectedTab]);

  const getMoreOffers = useCallback(
    () => !isLastOffersPage && setOffersPage(offersPage + 1),
    [isLastOffersPage, offersPage],
  );

  const tab = (backgroundColor, txtColor, item) => {
    return (
      <View style={Style.tab(backgroundColor)}>
        <Text style={Style.textTab(txtColor)}>{item}</Text>
      </View>
    );
  };
  const handleTab = (item) =>
    item === tabs[selectedTab]
      ? tab(colors.BLUE_HIGH_OPACITY, colors.BLUE, item)
      : tab(colors.WHITE, colors.BLUE_TEXT, item);
  const handlePress = useCallback(
    (index) => () => {
      setSelectedTab(index);
    },
    [],
  );

  const handleCreateOffer = useCallback(() => {
    addOfferSuccess();
    navigation.navigate(routes.ADD_OFFER);
  }, [addOfferSuccess, navigation]);

  const onPressUpdateHandler = useCallback(
    (item) => {
      setSelectedTab(0);
      navigation.navigate(routes.ADD_OFFER, { offerId: item?.id });
    },
    [navigation],
  );

  const onPressDeleteOfferOpenModalHandler = useCallback((item) => {
    setOfferToDeleteId(item.id);
    setDeleteModalVisibility(true);
  }, []);

  const onPressDeleteOfferHandler = useCallback(() => {
    deleteOffer(offerToDeleteId, deleteOfferCallback);
  }, [deleteOffer, deleteOfferCallback, offerToDeleteId]);

  const onPressCancelDeleteOfferHandler = useCallback(() => {
    setOfferToDeleteId(null);
    setDeleteModalVisibility(false);
  }, []);

  const data = useMemo(
    () => [
      <ProfileDescription
        description={description}
        currentIndex={currentIndex}
        onImagePress={onImagePress}
        onRequestClose={onRequestClose}
        handleUpdateBasicInfoPressed={handleUpdateBasicInfoPressed}
        isVisible={isVisible}
      />,
      <OffersContainer
        offers={offers}
        getMoreOffers={getMoreOffers}
        handleCreateOffer={handleCreateOffer}
        onPressDeleteOfferOpenModalHandler={onPressDeleteOfferOpenModalHandler}
        onPressUpdateHandler={onPressUpdateHandler}
      />,
      <Reviews
        review={reviews}
        scoreAverage={description?.averageScore}
        canWriteReview={false}
        getMoreReviews={getMoreReviews}
      />,
    ],
    [
      currentIndex,
      description,
      getMoreOffers,
      getMoreReviews,
      handleCreateOffer,
      handleUpdateBasicInfoPressed,
      isVisible,
      offers,
      onImagePress,
      onPressDeleteOfferOpenModalHandler,
      onPressUpdateHandler,
      onRequestClose,
      reviews,
    ],
  );

  const getProfilePicture = () => {
    return currentUser?.photo
      ? { uri: currentUser?.photo.replace(localhostLink, API_URL) }
      : blurredProfile;
  };

  const getCoverPicture = () =>
    currentUser?.coverPicture ? (
      <CoverPictureWithData
        handleGoBack={handleGoBack}
        currentUser={currentUser}
      />
    ) : (
      <CoverImageNoData handleGoBack={handleGoBack} />
    );
  return (
    <View style={Style.container}>
      {getCoverPicture()}
      <View style={Style.profilePicture}>
        <Image source={getProfilePicture()} style={Style.blurredProfile} />
      </View>
      <View style={Style.generalInfoContainer}>
        <View style={Style.nameAndUpdate}>
          <Text style={Style.fullNameText}>
            {`${currentUser?.lastName} ${currentUser?.firstName}`}
          </Text>
          <TouchableOpacity
            style={Style.updateIcon}
            onPress={handleUpdateProfilePressed}
          >
            <UpdateIcon />
          </TouchableOpacity>
        </View>
        <View style={Style.nameAndUpdate}>
          <TouchableOpacity
            style={Style.coachBadgeIcon}
            onPress={handleUpdateProfilePressed}
          >
            <CoachBadge />
          </TouchableOpacity>
          <Text style={Style.coachTitle}>
            <I18n {...translation.coachTitle} />
          </Text>
        </View>
        {currentUser?.city && (
          <View style={Style.locationContainer}>
            <MapPin width={12} height={15} color={colors.SECONDARY_LIGHT} />
            <Text style={Style.locationText}>{currentUser.city}</Text>
          </View>
        )}
      </View>
      <View style={Style.inputsContainer}>
        <View style={Style.tabBar}>
          {tabs.map((_, index) => {
            return (
              <TouchableOpacity key={`${index}`} onPress={handlePress(index)}>
                {handleTab(tabs[index])}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={Style.flatListContent}>
          <FlatList
            ref={flatListRef}
            horizontal
            data={data}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item }) => item}
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.9}
            scrollEnabled={false}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            windowSize={10}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise((resolve) => setTimeout(resolve, 500));
              wait.then(() => {
                flatListRef.current?.scrollToIndex({
                  index: info.index,
                  animated: true,
                });
              });
            }}
          />
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisibility}
      >
        <LogoutPopup
          agreePressed={onPressDeleteOfferHandler}
          disagreePressed={onPressCancelDeleteOfferHandler}
          question={i18n.t(translation.deleteOffer.id)}
          questionDetails={i18n.t(translation.deleteOfferContent.id)}
        />
      </Modal>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: getCurrentUser(),
  isLastReviewsPage: getIsLastReviewsPage(),
  reviews: getReviewsSelector(),
  description: getDescriptionSelector(),
  isLastOffersPage: getIsLastOffersPage(),
  offers: getOffersSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getReviews,
      getDescription,
      getOffers,
      deleteOffer,
      addOfferSuccess,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CoachProfile);
