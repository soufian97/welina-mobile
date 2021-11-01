import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import { Style } from './style';
import GoBackHeader from '../../components/Headers/GobackHeader';
import { translation } from './messages';
import I18n from '../../components/I18n';
import i18n from '../../config/i18n';
import FilterItem from '../../components/FilterItem';
import CheckBox from '../../components/CheckBox';
import { colors } from '../../utils/colors';
import { MultiselectDropdown, Dropdown } from 'sharingan-rn-modal-dropdown';
import InputNumber from '../../components/Inputs/InputNumber';
import { Upload, DropdownArrow, SuccessCheckIcon } from '../../assets/svgs';
import ImagePicker from 'react-native-image-crop-picker';
import CountryPicker from 'react-native-country-picker-modal';
import mrc_flag from '../../assets/images/mrc-flag.png';
import euro_flag from '../../assets/images/euro-flag.png';
import { useForm } from '../../utils/hooks';
import { stringNotBlank } from '../../utils/validators';
import Button from '../../components/Buttons/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  getCurrentDateFormatter,
  getDateFormatter,
} from '../../utils/date/dateFormater';
import { addDays } from 'date-fns';
import CalendarSlot from '../../components/CalendarSlot';
import {
  CURRENCY,
  MAD,
  PACKAGE,
  PHOTO,
  SESSION,
  SKILL_LEVEL,
  EURO,
  NONE,
  ERROR_MODAL,
} from '../../config/app.constant';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import {
  addOffer,
  getCities,
  getSkills,
  getOffer,
  getStates,
  getStateCities,
  addOfferSuccess,
} from './store/actions.creator';
import {
  getCitiesSelector,
  getSkillsSelector,
  getaddOfferLoaderSelector,
  getOfferSelector,
  getStatesSelector,
} from './store/selectors';
import {
  getSuccessModalVisibilitySelector,
  getMessageSelector,
} from '../Splash/store/selectors';
import {
  openSuccessModalAction,
  closeSuccessModalAction,
} from '../Splash/store/actions.creator';
import addOfferReducerConfig from './store/reducer';
import addOfferSagaConfig from './store/saga';
import { isEmpty, isNull, tail } from 'lodash';
import PopupIcon from '../../components/PopupModals/PopupIcon';
import { routes } from '../../utils/navigation/routes';
import basicInfoSagaConfig from '../BasicInfo/store/saga';
import basicInfoReducerConfig from '../BasicInfo/store/reducer';
import { getLanguages } from '../BasicInfo/store/actions.creator';
import {
  getLanguagesSelector,
  getBasicInfoLoaderSelector,
} from '../BasicInfo/store/selectors';
import FullScreenLoader from '../../components/FullScreenLoader';
import { openModal } from '../Modal/store/actions.creator';

const { width } = Dimensions.get('screen');

const size = { radius: 25, height: 45 };
const skillLevelData = [
  {
    value: SKILL_LEVEL.BEGINNER,
    label: i18n.t(translation.beginner.id),
  },
  {
    value: SKILL_LEVEL.INTERMEDIATE,
    label: i18n.t(translation.intermediate.id),
  },
  {
    value: SKILL_LEVEL.PROFESSIONAL,
    label: i18n.t(translation.professional.id),
  },
  {
    value: SKILL_LEVEL.SURF_GUIDING,
    label: i18n.t(translation.proguiding.id),
  },
];
const MAX_GALLERY_IMAGE = 6;

const AddOffer = ({
  navigation,
  addOffer,
  openSuccessModalAction,
  getLanguages,
  getCities,
  getStateCities,
  getStates,
  getSkills,
  getOffer,
  skills,
  cities,
  states,
  closeSuccessModalAction,
  isLanguagesLoading,
  languages,
  isLoading,
  successModalVisibility,
  route,
  offerToUpdate,
  message,
  addOfferSuccess,
  openModal,
}) => {
  useInjectReducer(addOfferReducerConfig);
  useInjectSaga(addOfferSagaConfig);
  useInjectReducer(basicInfoReducerConfig);
  useInjectSaga(basicInfoSagaConfig);
  const offerToUpdateId = route.params?.offerId;
  const offerTitle = useForm('offerTitle', '', [
    stringNotBlank(i18n.t(translation.stringBlankError.id, { name: 'title' })),
  ]);
  const offerDescription = useForm('offerDescription', '', [
    stringNotBlank(
      i18n.t(translation.stringBlankError.id, { name: 'description' }),
    ),
  ]);

  const [selectedSkills, setSelectedSkills] = useState([]);

  const onCheckSelectSkill = (id) => () => {
    if (selectedSkills.includes(id)) {
      setSelectedSkills(selectedSkills.filter((itemId) => itemId !== id));
    } else {
      setSelectedSkills([...selectedSkills, id]);
    }
  };

  const scrollRef = useRef(null);
  const [formState, changeFormState] = useState({
    dirty: false,
    isSucceeded: false,
    isSubmitting: false,
    rootCause: null,
    isUpdating: !isEmpty(offerToUpdateId),
  });

  const [selectedSkillLevel, setSelectedSkillLevel] = useState([]);
  const [language, setLanguage] = useState([]);
  const [groupSizeNumber, setGroupSizeNumber] = useState(1);
  const [madPrice, setMadPrice] = useState(200);
  const [euroPrice, setEuroPrice] = useState(20);
  const [sessionNumber, setSessionNumber] = useState(1);
  const [countryCode, setCountryCode] = useState('MA');
  const [city, setCity] = useState(NONE);
  const [state, setState] = useState(null);
  const [
    countryPickerModalVisibility,
    setCountryPickerModalVisibility,
  ] = useState(false);
  const [checkedFormData, setCheckedFormData] = useState({
    session: true,
    package: false,
    gallery: [],
  });
  const [selectedRange, setSelectedRange] = useState({
    startingDay: getCurrentDateFormatter(),
    endingDay: getDateFormatter(
      addDays(new Date(getCurrentDateFormatter()), 3),
    ),
  });
  const [photo, setPhoto] = useState(null);
  const [gallery, setGallery] = useState([]);

  const getImagePreview = useCallback((imageData) => {
    if (!isEmpty(imageData) && typeof imageData === 'object') {
      return imageData.path;
    }
    return imageData;
  }, []);

  const onOpenCountryPicker = useCallback(() => {
    setCountryPickerModalVisibility(true);
  }, []);
  const onCloseCountryPicker = useCallback(() => {
    setCountryPickerModalVisibility(false);
  }, []);
  const onSelectHandler = useCallback(
    (countryInfo) => {
      setCheckedFormData({ ...checkedFormData, country: countryInfo.name });
      setCountryCode(countryInfo.cca2);
      setCity(NONE);
      setState(null);
    },
    [checkedFormData],
  );

  const onChangeLocationStateHandler = useCallback((value) => {
    setCity(NONE);
    setState(value);
  }, []);

  const onCheckHandler = (field) => () => {
    if ([field] in checkedFormData) {
      setCheckedFormData({
        ...checkedFormData,
        [field]: !checkedFormData[field],
      });
    } else {
      setCheckedFormData({ ...checkedFormData, [field]: true });
    }
  };

  const offerTypePicker = (field) => () => {
    if (field === 'session') {
      setCheckedFormData({
        ...checkedFormData,
        session: true,
        package: false,
      });
    } else {
      setCheckedFormData({
        ...checkedFormData,
        session: false,
        package: true,
      });
    }
  };

  const cropMulti = useCallback(
    async (images) => {
      const props = {
        cropped: [],
        length: images.length,
        current: images.length,
      };
      await cropImages(props, images);
      return props.cropped;
    },
    [cropImages],
  );

  const cropImages = useCallback(async (props, images) => {
    while (props.current) {
      const cImg = await cropImage(images[props.length - props.current]);
      props.cropped.push(cImg);
      props.current = props.current - 1;
    }
  }, []);

  const cropImage = async (img) => {
    return await ImagePicker.openCropper({
      path: img.path,
      includeBase64: true,
      width: width,
      height: width * 1.1,
      mediaType: PHOTO,
      forceJpg: true,
    });
  };

  const uploadImageHandler = (index) => async () => {
    try {
      if (index === -1) {
        const image = await ImagePicker.openPicker({
          width: width,
          height: width,
          cropping: true,
          mediaType: PHOTO,
          includeBase64: true,
        });
        setPhoto(image);
      } else {
        const images = await ImagePicker.openPicker({
          width: width,
          height: width * 1.1,
          cropping: true,
          mediaType: PHOTO,
          includeBase64: true,
          multiple: true,
          maxFiles:
            MAX_GALLERY_IMAGE - gallery.length > 0
              ? MAX_GALLERY_IMAGE - gallery.length
              : 1,
        });
        const cropped = await cropMulti(images);
        setGallery((prev) => {
          let tmpGallery = [...prev];
          tmpGallery[index] = cropped[0];
          return [...tmpGallery, ...tail(cropped)];
        });
      }
    } catch (err) {}
  };

  const removeImageHandler = (index) => () => {
    if (index === -1) {
      setPhoto(null);
    } else {
      const oldSelectedImages = [...gallery];
      setGallery(
        oldSelectedImages.filter((_, imageIndex) => imageIndex !== index),
      );
    }
  };

  const onChangeHandler = useCallback(
    (notify) => (value) => {
      notify(value);
    },
    [],
  );

  const inputErrors = (value) => {
    const hasErrors = formState.dirty && value.hasErrors;
    if (hasErrors) {
      return <Text style={Style.textError}>{value.errors[0]}</Text>;
    }
    return null;
  };

  const onPressFormHandler = useCallback(() => {
    changeFormState({ ...formState, dirty: true });
    if (
      !offerTitle.hasErrors &&
      !offerDescription.hasErrors &&
      !isEmpty(gallery) &&
      !isEmpty(photo) &&
      !isEmpty(city)
    ) {
      let offer = {
        id: offerToUpdateId,
        type: checkedFormData.package ? PACKAGE : SESSION,
        title: offerTitle.value,
        description: offerDescription.value,
        cityId: city,
        prices: [
          { currency: MAD, unitAmount: madPrice },
          { currency: EURO, unitAmount: euroPrice },
        ],
        skillIds: selectedSkills,
        gallery,
        photo,
        startDate: selectedRange.startingDay,
        endDate: selectedRange.endingDay || selectedRange.startingDay,
        numberOfDays: sessionNumber,
        offerDetails: {
          duration: checkedFormData?.duration ? 2 : 0,
          languageIds: language,
          groupSize: groupSizeNumber,
          skillLevels: selectedSkillLevel,
          withKids: checkedFormData?.withKids ? true : false,
        },
      };
      addOffer(offer, addOfferCallback);
    } else {
      scrollRef.current.scrollToPosition(0, 0);
    }
  }, [
    formState,
    offerTitle.hasErrors,
    offerTitle.value,
    offerDescription.hasErrors,
    offerDescription.value,
    gallery,
    photo,
    offerToUpdateId,
    checkedFormData,
    city,
    madPrice,
    euroPrice,
    selectedSkills,
    selectedRange.startingDay,
    selectedRange.endingDay,
    sessionNumber,
    language,
    groupSizeNumber,
    selectedSkillLevel,
    addOffer,
    addOfferCallback,
  ]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formItems = [
    {
      title: i18n.t(translation.chooseType.id),
      children: (
        <View style={Style.childrenContainer}>
          <CheckBox
            onPress={offerTypePicker('session')}
            isSelected={checkedFormData.session}
            label={i18n.t(translation.oneSession.id)}
          />
          <CheckBox
            onPress={offerTypePicker('package')}
            isSelected={checkedFormData.package}
            label={i18n.t(translation.packageMultiple.id)}
          />
        </View>
      ),
    },
    {
      title: i18n.t(translation.yourOfferTitle.id, {
        name: checkedFormData.package
          ? PACKAGE.toLowerCase()
          : SESSION.toLowerCase(),
      }),
      hasError: formState.dirty && offerTitle.hasErrors,
      children: (
        <View style={Style.childrenContainerCenter}>
          <TextInput
            style={Style.textInput}
            value={offerTitle.value}
            onChangeText={onChangeHandler(offerTitle.changeModel)}
          />
          {inputErrors(offerTitle)}
        </View>
      ),
    },
    {
      title: i18n.t(translation.offerDescription.id, {
        name: checkedFormData.package
          ? capitalizeFirstLetter(PACKAGE.toLowerCase())
          : capitalizeFirstLetter(SESSION.toLowerCase()),
      }),
      hasError: formState.dirty && offerDescription.hasErrors,
      children: (
        <View style={Style.childrenContainerCenter}>
          <TextInput
            style={Style.paragraphInput}
            multiline
            numberOfLines={7}
            placeholder={i18n.t(translation.describeOffer.id)}
            placeholderTextColor={colors.GRAY}
            value={offerDescription.value}
            onChangeText={onChangeHandler(offerDescription.changeModel)}
          />
          {inputErrors(offerDescription)}
        </View>
      ),
    },
    {
      title: i18n.t(translation.detailsOfSession.id, {
        name: checkedFormData.package
          ? PACKAGE.toLowerCase()
          : SESSION.toLowerCase(),
      }),
      children: (
        <View style={Style.childrenContainer}>
          {checkedFormData.package ? (
            <View style={Style.fieldContainer}>
              <CheckBox
                customStyle={Style.checkBoxCustomStyle}
                label={i18n.t(translation.sessionNumber.id)}
                isSelected={checkedFormData?.sessionNumber}
                onPress={onCheckHandler('sessionNumber')}
              />
              <InputNumber
                minValue={1}
                setStateNumber={setSessionNumber}
                stateNumber={sessionNumber}
                width={width * 0.35}
                disabled={!checkedFormData?.sessionNumber}
              />
            </View>
          ) : (
            <CheckBox
              label={i18n.t(translation.duration.id)}
              isSelected={checkedFormData?.duration}
              onPress={onCheckHandler('duration')}
            />
          )}
          <View style={Style.fieldContainer}>
            <CheckBox
              customStyle={Style.checkBoxCustomStyle}
              label={i18n.t(translation.skillLevel.id)}
              isSelected={checkedFormData?.skillLevel}
              onPress={onCheckHandler('skillLevel')}
            />
            <View style={Style.dropDownStyle}>
              <MultiselectDropdown
                data={skillLevelData}
                value={selectedSkillLevel}
                onChange={setSelectedSkillLevel}
                textInputStyle={Style.textInputDD}
                chipStyle={Style.chipStyle}
                underlineColor={'transparent'}
                emptySelectionText={i18n.t(translation.selectSkillLevel.id)}
                mainContainerStyle={Style.mainMultiDropdownContainerStyle}
                disabled={!checkedFormData?.skillLevel}
                disableSort={true}
              />
            </View>
          </View>
          <View style={Style.fieldContainer}>
            <CheckBox
              customStyle={Style.checkBoxCustomStyle}
              label={i18n.t(translation.language.id)}
              isSelected={checkedFormData?.language}
              onPress={onCheckHandler('language')}
            />
            <View style={Style.dropDownStyle}>
              <MultiselectDropdown
                data={languages}
                value={language}
                onChange={setLanguage}
                textInputStyle={Style.textInputDD}
                chipStyle={Style.chipStyle}
                underlineColor={'transparent'}
                mainContainerStyle={Style.mainMultiDropdownContainerStyle}
                disabled={!checkedFormData?.language}
              />
            </View>
          </View>
          <View style={Style.fieldContainer}>
            <CheckBox
              customStyle={Style.checkBoxCustomStyle}
              label={i18n.t(translation.groupSize.id)}
              isSelected={checkedFormData?.groupSize}
              onPress={onCheckHandler('groupSize')}
            />
            <InputNumber
              minValue={1}
              maxValue={8}
              setStateNumber={setGroupSizeNumber}
              stateNumber={groupSizeNumber}
              width={width * 0.35}
              disabled={!checkedFormData?.groupSize}
            />
          </View>
          <View style={Style.fieldContainer}>
            <CheckBox
              customStyle={Style.checkBoxCustomStyle}
              label={i18n.t(translation.withKids.id)}
              isSelected={checkedFormData?.withKids}
              onPress={onCheckHandler('withKids')}
            />
          </View>
        </View>
      ),
    },
    {
      title: i18n.t(translation.whatIncluded.id),
      children: (
        <View style={Style.childrenContainer}>
          {skills.map(({ id, labelEn }) => (
            <CheckBox
              key={id}
              label={labelEn}
              isSelected={selectedSkills.includes(id)}
              onPress={onCheckSelectSkill(id)}
            />
          ))}
        </View>
      ),
    },
    {
      title: i18n.t(translation.pricing.id),
      hasError: formState.dirty && (madPrice <= 0 || euroPrice <= 0),
      children: (
        <View style={Style.pricingContainer}>
          <View style={Style.fieldContainer}>
            <View style={Style.pricingInputContainer}>
              <View style={Style.inputNumber}>
                <InputNumber
                  minValue={200}
                  setStateNumber={setMadPrice}
                  stateNumber={madPrice}
                  width={width * 0.45}
                  maxValue={15000}
                />
              </View>
              <View style={[Style.dropDownStyle, Style.customDropDown]}>
                <Image source={mrc_flag} style={Style.currencyIcon} />
                <Text>{CURRENCY.MAD}</Text>
              </View>
            </View>
          </View>
          <View style={Style.fieldContainer}>
            <View style={Style.pricingInputContainer}>
              <View style={Style.inputNumber}>
                <InputNumber
                  minValue={20}
                  setStateNumber={setEuroPrice}
                  stateNumber={euroPrice}
                  width={width * 0.45}
                  maxValue={1500}
                />
              </View>
              <View style={[Style.dropDownStyle, Style.customDropDown]}>
                <Image source={euro_flag} style={Style.currencyIcon} />
                <Text>{CURRENCY.EURO}</Text>
              </View>
            </View>
          </View>
        </View>
      ),
    },
    {
      title: i18n.t(translation.location.id),
      hasError: formState.dirty && (isEmpty(city) || city === NONE),
      children: (
        <View style={Style.childrenContainerCenter}>
          <View style={Style.locationInfoContainer}>
            <View style={Style.locationFieldContainer}>
              <Text style={Style.textLabel}>
                <I18n {...translation.country} />
              </Text>
              <TouchableOpacity
                onPress={onOpenCountryPicker}
                style={[Style.dropDownStyle, Style.countryPickerDropdown]}
              >
                <CountryPicker
                  theme={{ fontSize: 14 }}
                  visible={countryPickerModalVisibility}
                  onOpen={onOpenCountryPicker}
                  onClose={onCloseCountryPicker}
                  withAlphaFilter
                  withModal
                  onSelect={onSelectHandler}
                  countryCode={countryCode}
                />
                <Text>{countryCode}</Text>
                <DropdownArrow />
              </TouchableOpacity>
            </View>
            {!isEmpty(states) && (
              <View style={Style.locationFieldContainer}>
                <Text style={Style.textLabel}>
                  <I18n {...translation.state} />
                </Text>
                <View style={Style.dropDownStyle}>
                  <Dropdown
                    data={states}
                    chipStyle={Style.chipStyle}
                    underlineColor={'transparent'}
                    mainContainerStyle={Style.mainDropdownContainerStyle}
                    value={state}
                    onChange={onChangeLocationStateHandler}
                    enableSearch={true}
                    floating={true}
                  />
                </View>
              </View>
            )}
            <View style={Style.locationFieldContainer}>
              <Text style={Style.textLabel}>
                <I18n {...translation.city} />
              </Text>
              <View style={Style.dropDownStyle}>
                <Dropdown
                  data={[...cities, { label: '', value: NONE }]}
                  chipStyle={Style.chipStyle}
                  underlineColor={'transparent'}
                  mainContainerStyle={Style.mainDropdownContainerStyle}
                  value={city}
                  removeLabel={true}
                  onChange={setCity}
                  enableSearch={true}
                  floating={true}
                  disabled={!isEmpty(states) && isNull(state)}
                />
              </View>
            </View>
          </View>
        </View>
      ),
    },
    {
      title: i18n.t(translation.dates.id),
      children: (
        <View style={Style.childrenContainerCenter}>
          <CalendarSlot
            setSelectedRange={setSelectedRange}
            selectedRange={selectedRange}
          />
        </View>
      ),
    },
    {
      title: i18n.t(translation.gallery.id),
      hasError: formState.dirty && (isEmpty(gallery) || isEmpty(photo)),
      children: (
        <View style={Style.childrenContainerCenter}>
          <View style={Style.galleryContainer}>
            <TouchableOpacity
              style={Style.uploadContainer}
              onPress={uploadImageHandler(-1)}
            >
              {photo ? (
                <View style={Style.imagePreview}>
                  <TouchableOpacity
                    style={Style.removeImageContainer}
                    onPress={removeImageHandler(-1)}
                  >
                    <Text style={Style.removeImageIcon}>X</Text>
                  </TouchableOpacity>
                  <Image
                    source={{ uri: getImagePreview(photo) }}
                    style={Style.imagePreview}
                  />
                </View>
              ) : (
                <View style={[Style.uploadMainContainer]}>
                  <Upload />
                  <Text style={Style.textUpload}>
                    {i18n.t(translation.coverPicture.id)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            {gallery.map((image, index) => (
              <TouchableOpacity
                key={`${index}`}
                onPress={uploadImageHandler(index)}
                style={Style.uploadSecondaryContainer}
              >
                <View style={Style.imagePreview}>
                  <TouchableOpacity
                    style={Style.removeImageContainer}
                    onPress={removeImageHandler(index)}
                  >
                    <Text style={Style.removeImageIcon}>X</Text>
                  </TouchableOpacity>
                  <Image
                    source={{ uri: getImagePreview(image) }}
                    style={Style.imagePreview}
                  />
                </View>
              </TouchableOpacity>
            ))}
            {gallery.length < MAX_GALLERY_IMAGE && (
              <TouchableOpacity
                style={Style.uploadSecondaryContainer}
                onPress={uploadImageHandler(gallery.length)}
              >
                <View style={[Style.uploadMainContainer]}>
                  <Upload />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ),
    },
  ];

  const getFormResourceCallback = useCallback(
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

  const addOfferCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        openSuccessModalAction(
          offerToUpdateId
            ? i18n.t(translation.offerUpdatedSuccessfully.id)
            : i18n.t(translation.offerCreatedSuccessfully.id),
        );
      }
    },
    [offerToUpdateId, openModal, openSuccessModalAction],
  );

  useEffect(() => {
    if (state) {
      getStateCities(state, getFormResourceCallback);
    } else {
      getCities(countryCode, getFormResourceCallback);
    }
  }, [countryCode, getCities, getFormResourceCallback, getStateCities, state]);

  useEffect(() => {
    getStates(countryCode, getFormResourceCallback);
  }, [countryCode, getFormResourceCallback, getStates]);

  useEffect(() => {
    getSkills(getFormResourceCallback);
    getLanguages(getFormResourceCallback);
  }, [getFormResourceCallback, getLanguages, getSkills]);

  const onConfirmSuccessModalPress = useCallback(() => {
    closeSuccessModalAction();
    navigation.replace(routes.COACH_DASHBOARD);
  }, [closeSuccessModalAction, navigation]);

  useEffect(() => {
    if (offerToUpdateId) {
      getOffer(offerToUpdateId, getFormResourceCallback);
    }
  }, [getFormResourceCallback, getOffer, offerToUpdateId]);

  useEffect(() => {
    if (!isEmpty(offerToUpdate) && formState.isUpdating) {
      setCity(offerToUpdate?.city.id);
      setState(offerToUpdate?.state?.id);
      setCountryCode(offerToUpdate?.countryCode);
      setGroupSizeNumber(offerToUpdate?.groupSize);
      setMadPrice(
        offerToUpdate?.prices.find((item) => item.currency === CURRENCY.MAD)
          .unitAmount,
      );
      setEuroPrice(
        offerToUpdate?.prices.find((item) => item.currency === CURRENCY.EURO)
          .unitAmount,
      );
      setSelectedSkillLevel(offerToUpdate?.skillLevels);
      setSelectedSkills(offerToUpdate?.skills.map((item) => item.id));
      setLanguage(offerToUpdate?.languages.map((item) => item.id));
      setSessionNumber(offerToUpdate?.numberOfDays);
      offerTitle.changeModel(offerToUpdate?.title);
      offerDescription.changeModel(offerToUpdate?.description);
      setCheckedFormData({
        ...checkedFormData,
        withKids: offerToUpdate?.withKids,
        session: offerToUpdate?.type === SESSION,
        package: offerToUpdate?.type === PACKAGE,
        groupSize: offerToUpdate?.groupSize !== 1,
        skillLevel: !isEmpty(offerToUpdate?.skillLevels),
        language: !isEmpty(offerToUpdate?.languages),
        duration: offerToUpdate?.duration,
        sessionNumber: sessionNumber > 1,
      });
      setSelectedRange({
        startingDay: offerToUpdate?.startDate,
        endingDay: offerToUpdate?.endDate,
      });
      setPhoto(offerToUpdate?.photo);
      setGallery(offerToUpdate?.gallery);
      changeFormState({ ...formState, isUpdating: false });
    }
  }, [
    checkedFormData,
    formState,
    offerDescription,
    offerTitle,
    offerToUpdate,
    sessionNumber,
  ]);

  const onPressGoBackHandler = useCallback(() => {
    addOfferSuccess();
    navigation.goBack();
  }, [addOfferSuccess, navigation]);

  return (
    <View style={Style.screen}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisibility}
      >
        <PopupIcon
          confirmPressed={onConfirmSuccessModalPress}
          message={message}
          buttonTitle={i18n.t(translation.goToHomeDashboard.id)}
          icon={<SuccessCheckIcon />}
        />
      </Modal>
      <GoBackHeader leftButtonAction={onPressGoBackHandler} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={Style.scrollContainer}
        ref={scrollRef}
      >
        <Text style={Style.textScreenTitle}>
          {isEmpty(offerToUpdateId) ? (
            <I18n {...translation.addNewOffer} />
          ) : (
            <I18n {...translation.updateOffer} />
          )}
        </Text>

        {formItems.map((item, index) => (
          <FilterItem key={index} {...item} />
        ))}
        <Button
          title={
            offerToUpdateId
              ? i18n.t(translation.update.id)
              : i18n.t(translation.create.id)
          }
          size={size}
          containerStyle={Style.buttonStyle}
          onPress={onPressFormHandler}
        />
      </KeyboardAwareScrollView>
      <FullScreenLoader visible={isLoading || isLanguagesLoading} />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  offerToUpdate: getOfferSelector(),
  isLoading: getaddOfferLoaderSelector(),
  isLanguagesLoading: getBasicInfoLoaderSelector(),
  languages: getLanguagesSelector(),
  skills: getSkillsSelector(),
  cities: getCitiesSelector(),
  states: getStatesSelector(),
  message: getMessageSelector(),
  successModalVisibility: getSuccessModalVisibilitySelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getOffer,
      getLanguages,
      getCities,
      getSkills,
      addOffer,
      openSuccessModalAction,
      closeSuccessModalAction,
      getStates,
      getStateCities,
      addOfferSuccess,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AddOffer);
