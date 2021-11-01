import React, {
  useCallback,
  useState,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
} from 'react-native';
import { UploadIcon, PlusFitIcon, MinusFitIcon } from '../../assets/svgs';
import { Style } from './style';
import i18n from '../../config/i18n';
import { translation } from './messages';
import FilterItem from '../../components/FilterItem';
import Button from '../../components/Buttons/Button';
import CheckBox from '../../components/CheckBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CountryPicker from 'react-native-country-picker-modal';
import { MultiselectDropdown } from 'sharingan-rn-modal-dropdown';
import { colors } from '../../utils/colors';
import I18n from '../../components/I18n';
import {
  WEBSITE_PREFIX,
  PHOTO,
  SESSION,
  PACKAGE,
  ERROR_MODAL,
} from '../../config/app.constant';
import InputNumber from '../../components/Inputs/InputNumber';
import ImagePicker from 'react-native-image-crop-picker';
import { routes } from '../../utils/navigation/routes';
import GoBackHeader from '../../components/Headers/GobackHeader';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import { setBasicInfo, getLanguages } from './store/actions.creator';
import {
  getBasicInfoLoaderSelector,
  getLanguagesSelector,
} from './store/selectors';
import basicInfoReducerConfig from './store/reducer';
import basicInfoSagaConfig from './store/saga';
import { useForm } from '../../utils/hooks';
import { stringNotBlank } from '../../utils/validators';
import { isEmpty, tail } from 'lodash';
import ProgressLoader from 'rn-progress-loader';
import { checkCurrent } from '../Auth/store/actions.creator';
import coachDetailsReducerConfig from '../CoachDetails/store/reducer';

import { getDescriptionSelector } from '../CoachDetails/store/selectors';
import { openModal } from '../Modal/store/actions.creator';

const { width, height } = Dimensions.get('window');
const buttonSize = {
  width: width * 0.8,
  height: height * 0.07,
  font: 18,
  radius: 10,
};
const MAX_GALLERY_IMAGE = 9;
const MAX_EXPERIENCES = 10;

export const BasicInfo = ({
  navigation,
  setBasicInfo,
  checkCurrent,
  getLanguages,
  isLoading,
  languages,
  basicInfo,
  route,
  openModal,
}) => {
  useInjectReducer(basicInfoReducerConfig);
  useInjectReducer(coachDetailsReducerConfig);
  useInjectSaga(basicInfoSagaConfig);
  const isUpdateBasicInfo = route.params?.update;
  const experience = useMemo(() => {
    return {
      skill: '',
      location: 'MA',
      yearsOfExperience: 1,
    };
  }, []);

  const scrollRef = useRef();
  const [experiences, setExperiences] = useState([experience]);

  const [offerTypesParams, setOfferTypesParams] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [countryVisibility, setCountryVisibility] = useState([false]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [coverImage, setCoverImage] = useState('');
  const description = useForm('description', '', [
    stringNotBlank(
      i18n.t(translation.stringBlankError.id, { name: 'description' }),
    ),
  ]);
  const url = useForm('url', '', [
    stringNotBlank(
      i18n.t(translation.stringBlankError.id, { name: 'instagram link' }),
    ),
  ]);

  const [formState, changeFormState] = useState({
    dirty: false,
    isSucceeded: false,
    isSubmitting: false,
    rootCause: null,
    isUpdating: isUpdateBasicInfo,
  });

  const getLanguagesCallback = useCallback(
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

  const updateOrApplyBasicInfoCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        navigation.navigate(
          isUpdateBasicInfo ? routes.COACH_DASHBOARD : routes.PENDING_PAGE,
        );
      }
    },
    [isUpdateBasicInfo, navigation, openModal],
  );

  useEffect(() => {
    checkCurrent(getLanguagesCallback);
  }, [checkCurrent, getLanguagesCallback]);

  useEffect(() => {
    getLanguages(getLanguagesCallback);
  }, [getLanguages, getLanguagesCallback]);

  const experienceFieldOnChangeHandler = (number, field) => (text) => {
    let tmpExperiences = [...experiences];
    tmpExperiences[number] = {
      ...tmpExperiences[number],
      [field]: text,
    };
    setExperiences([...tmpExperiences]);
  };

  const experienceFieldsErrorChecker = useCallback(
    () =>
      !experiences.some((experience) => experience.skill !== '') ||
      selectedLanguages.length === 0,

    [experiences, selectedLanguages.length],
  );

  useEffect(() => {
    if (isUpdateBasicInfo && formState.isUpdating) {
      description.changeModel(basicInfo.description);
      url.changeModel(basicInfo?.urls[0] || '');
      setExperiences(
        basicInfo.workExperiences.map(
          ({ id, skill, code, yearsOfExperience }) => ({
            id,
            skill,
            yearsOfExperience,
            location: code,
          }),
        ),
      );
      setSelectedLanguages(basicInfo.languages.map(({ id }) => id));
      setOfferTypesParams(basicInfo.offerTypes);
      setGallery(basicInfo.gallery);
      setCoverImage(basicInfo.coverPicture);
      changeFormState({ ...formState, isUpdating: false });
    }
  }, [basicInfo, description, formState, isUpdateBasicInfo, url]);

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

  const onChangeLanguages = useCallback((value) => {
    setSelectedLanguages(value);
  }, []);

  const setBasicInfoCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        checkCurrent(updateOrApplyBasicInfoCallback);
      }
    },
    [checkCurrent, openModal, updateOrApplyBasicInfoCallback],
  );

  const onCloseCountryPicker = (index) => () => {
    let tmpCountryVisibility = [...countryVisibility];
    tmpCountryVisibility[index] = false;
    setCountryVisibility([...tmpCountryVisibility]);
  };

  const onOpenCountryPicker = (index) => () => {
    let tmpCountryVisibility = [...countryVisibility];
    tmpCountryVisibility[index] = true;
    setCountryVisibility([...tmpCountryVisibility]);
  };

  const onSelectHandler = (index) => (country) => {
    experienceFieldOnChangeHandler(index, 'location')(country.cca2);
  };

  const onCheckOfferTypeHandler = useCallback(
    (value) => () => {
      setOfferTypesParams(
        offerTypesParams.includes(value)
          ? offerTypesParams.filter((offer) => offer !== value)
          : [...offerTypesParams, value],
      );
    },
    [offerTypesParams],
  );

  const skillsLevels = [
    {
      id: 0,
      title: i18n.t(translation.individual.id),
      selected: offerTypesParams.includes(SESSION),
      setSelected: onCheckOfferTypeHandler(SESSION),
    },
    {
      id: 1,
      title: i18n.t(translation.group.id),
      selected: offerTypesParams.includes(PACKAGE),
      setSelected: onCheckOfferTypeHandler(PACKAGE),
    },
  ];

  const getExperience = (index) => {
    return (
      <View key={index}>
        <TextInput
          style={Style.surfExperienceTextInput}
          placeholder={i18n.t(translation.title.id)}
          maxLength={100}
          numberOfLines={1}
          placeholderTextColor={colors.GRAY}
          onChangeText={experienceFieldOnChangeHandler(index, 'skill')}
          value={experiences[index].skill}
        />
        <View style={Style.experienceContainer}>
          <TouchableOpacity
            style={Style.countryContainer}
            onPress={onOpenCountryPicker(index)}
          >
            <CountryPicker
              visible={countryVisibility[index]}
              onClose={onCloseCountryPicker(index)}
              onSelect={onSelectHandler(index)}
              countryCode={experiences[index].location}
              withFilter={true}
              withAlphaFilter={true}
            />
            <Text style={Style.countryCodeText}>
              {experiences[index].location}
            </Text>
          </TouchableOpacity>
          <InputNumber
            stateNumber={experiences[index].yearsOfExperience}
            setStateNumber={experienceFieldOnChangeHandler(
              index,
              'yearsOfExperience',
            )}
            minValue={1}
            width={width * 0.4 - 10}
          />
        </View>
      </View>
    );
  };

  const handleAddExperiencePressed = useCallback(() => {
    if (experiences.length < MAX_EXPERIENCES) {
      setExperiences([...experiences, experience]);
    }
  }, [experiences, experience]);

  const handleDeleteLastExperiencePressed = useCallback(() => {
    if (experiences.length > 1) {
      let newExperiences = [...experiences];
      newExperiences.pop();
      setExperiences(newExperiences);
    }
  }, [experiences]);

  const cropImages = useCallback(async (props, images) => {
    while (props.current) {
      const cImg = await cropImage(images[props.length - props.current]);
      props.cropped.push(cImg);
      props.current = props.current - 1;
    }
  }, []);

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

  const cropImage = async (img) => {
    return await ImagePicker.openCropper({
      path: img.path,
      includeBase64: true,
      width: width,
      height: width * 1.1,
    });
  };

  const uploadImageHandler = useCallback(
    (index) => async () => {
      try {
        if (index === -1) {
          const image = await ImagePicker.openPicker({
            width: width * 1.5,
            height: height / 3,
            cropping: true,
            mediaType: PHOTO,
            includeBase64: true,
          });
          setCoverImage(image);
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
      } catch (_err) {}
    },
    [cropMulti, gallery.length],
  );

  const removeImageHandler = useCallback(
    (index) => () => {
      if (index === -1) {
        setCoverImage(null);
      } else {
        const oldSelectedImages = [...gallery];
        setGallery(
          oldSelectedImages.filter((_, imageIndex) => imageIndex !== index),
        );
      }
    },
    [gallery],
  );

  const getImagePreview = useCallback((imageData) => {
    if (!isEmpty(imageData) && typeof imageData === 'object') {
      return imageData.path;
    }
    return imageData;
  }, []);

  const handleCheckBoxPressed = useCallback(
    (item) => () => {
      item.setSelected(!item.selected);
    },
    [],
  );

  const filterItems = [
    {
      title: i18n.t(translation.description.id),
      hasErrors: description.hasErrors && formState.dirty,
      details: (
        <>
          <TextInput
            value={description.value}
            style={Style.descriptionText}
            placeholder={i18n.t(translation.descriptionPlaceholder.id)}
            multiline={true}
            maxLength={1000}
            numberOfLines={10}
            placeholderTextColor={colors.GRAY}
            onChangeText={onChangeHandler(description.changeModel)}
          />
          {inputErrors(description)}
        </>
      ),
    },
    {
      title: i18n.t(translation.experienceAndQualifications.id),
      hasErrors: experienceFieldsErrorChecker() && formState.dirty,
      details: (
        <View style={Style.experiencesContainer}>
          <Text style={Style.surfExperienceText}>
            <I18n {...translation.surfExperience} />
          </Text>
          {experiences.map((_, index) => getExperience(index))}
          <View style={Style.minusPlusFitIcons}>
            <TouchableOpacity
              style={Style.addExperienceContainer}
              onPress={handleDeleteLastExperiencePressed}
            >
              <MinusFitIcon />
            </TouchableOpacity>
            <TouchableOpacity
              style={Style.addExperienceContainer}
              onPress={handleAddExperiencePressed}
            >
              <PlusFitIcon />
            </TouchableOpacity>
          </View>

          <Text style={Style.languagesText}>
            <I18n {...translation.languages} />
          </Text>
          <View style={Style.languagesContainer}>
            <MultiselectDropdown
              data={languages}
              value={selectedLanguages}
              onChange={onChangeLanguages}
              mainContainerStyle={Style.dropDownContainer}
              underlineColor={colors.WHITE_BACKGROUND}
              removeLabel
              disableSelectionTick
            />
          </View>
        </View>
      ),
    },
    {
      title: i18n.t(translation.offersAndTarifications.id),
      hasErrors: offerTypesParams.length === 0 && formState.dirty,
      details: (
        <View style={Style.checkboxContainer}>
          {skillsLevels.map((item) => {
            return (
              <CheckBox
                key={item.title}
                label={item.title}
                isSelected={item.selected}
                onPress={handleCheckBoxPressed(item)}
              />
            );
          })}
        </View>
      ),
    },
    {
      title: i18n.t(translation.photos.id),
      hasErrors: formState.dirty && (isEmpty(gallery) || isEmpty(coverImage)),
      details: (
        <View style={Style.uploadMainContainer}>
          <TouchableOpacity
            style={Style.coverImageContainer}
            onPress={uploadImageHandler(-1)}
          >
            {coverImage ? (
              <View style={Style.imagePreview}>
                <TouchableOpacity
                  style={Style.removeImageContainer}
                  onPress={removeImageHandler(-1)}
                >
                  <Text style={Style.removeImageIcon}>X</Text>
                </TouchableOpacity>
                <Image
                  source={{ uri: getImagePreview(coverImage) }}
                  style={Style.imagePreview}
                />
              </View>
            ) : (
              <View style={[Style.uploadMainContainer]}>
                <UploadIcon />
                <Text style={Style.textUpload}>
                  {i18n.t(translation.coverText.id)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <View style={Style.galleryContainer}>
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
                <View style={Style.uploadCardContainer}>
                  <UploadIcon />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ),
    },
    {
      title: i18n.t(translation.instagramUsername.id),
      hasErrors: (formState.dirty || url.dirty) && url.hasErrors,
      details: (
        <View>
          <TextInput
            value={url.value}
            style={Style.socialMediaText}
            placeholder={WEBSITE_PREFIX}
            maxLength={100}
            numberOfLines={1}
            placeholderTextColor={colors.GRAY}
            onChangeText={onChangeHandler(url.changeModel)}
            keyboardType={'url'}
            textContentType={'URL'}
            autoCapitalize={'none'}
          />
        </View>
      ),
    },
  ];

  const handleApplyPressed = useCallback(() => {
    changeFormState({ ...formState, dirty: true });
    if (
      !description.hasErrors &&
      !experienceFieldsErrorChecker() &&
      !url.hasErrors &&
      !isEmpty(offerTypesParams) &&
      !isEmpty(gallery) &&
      !isEmpty(coverImage)
    ) {
      let basicInfo = {
        description: description.value,
        workExperiences: experiences.filter(({ skill }) => !isEmpty(skill)),
        languageIds: selectedLanguages,
        offerTypes: offerTypesParams,
        urls: [url.value],
        coverPicture: coverImage,
        gallery,
        isUpdateBasicInfo,
      };
      setBasicInfo(basicInfo, setBasicInfoCallback);
    } else {
      scrollRef.current.scrollToPosition(0, 0);
    }
  }, [
    coverImage,
    description.hasErrors,
    description.value,
    experienceFieldsErrorChecker,
    experiences,
    formState,
    gallery,
    isUpdateBasicInfo,
    offerTypesParams,
    setBasicInfo,
    setBasicInfoCallback,
    url,
    selectedLanguages,
  ]);

  const getButtonTitle = useCallback(
    () =>
      isUpdateBasicInfo
        ? i18n.t(translation.updateBasicInfo.id)
        : i18n.t(translation.apply.id),
    [isUpdateBasicInfo],
  );

  return (
    <View style={Style.container}>
      <GoBackHeader />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
      >
        <View style={Style.basicInfoTextContainer}>
          <Text style={Style.basicInfoText}>
            {isUpdateBasicInfo ? (
              <I18n {...translation.updateBasicInfoTitle} />
            ) : (
              <I18n {...translation.basicInfo} />
            )}
          </Text>
        </View>
        {filterItems.map((item) => {
          return (
            <FilterItem
              title={item.title}
              children={item.details}
              key={item.title}
              hasError={item?.hasErrors}
            />
          );
        })}

        <View style={Style.buttonContainer}>
          <Button
            title={getButtonTitle()}
            size={buttonSize}
            onPress={handleApplyPressed}
          />
        </View>
      </KeyboardAwareScrollView>
      <ProgressLoader
        visible={isLoading}
        isModal={true}
        isHUD={true}
        hudColor={colors.SECONDARY}
        color={colors.PRIMARY}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: getBasicInfoLoaderSelector(),
  languages: getLanguagesSelector(),
  basicInfo: getDescriptionSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      checkCurrent,
      setBasicInfo,
      getLanguages,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BasicInfo);
