import React, { useCallback, useState, useMemo, memo } from 'react';
import { View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapsStyle from '../../utils/mapsStyle';
import { Style } from './style';
import SearchBar from '../../components/SearchBar';
import i18n from '../../config/i18n';
import { translation } from './messages';
import FilterItem from '../../components/FilterItem';
import Button from '../../components/Buttons/Button';
import SliderContainer from './components/Slider';
import { debounce } from 'lodash';
import CheckBox from '../../components/CheckBox';
import InputNumber from '../../components/Inputs/InputNumber';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Dates from './components/Dates';
import {
  INDIVIDUAL,
  GROUP,
  BEGINNER,
  INTERMEDIATE,
  PROFESSIONAL,
  SURF_GUIDING,
  MAD,
  EURO,
} from '../../config/app.constant';
import { dateRange, getMonthsDays } from '../../utils/date/datesRange';
import { startOfToday, addYears } from 'date-fns';
import { dateFromMonthAndDay } from '../../utils/date/dateFormater';
import { routes } from '../../utils/navigation/routes';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { getCurrentUser } from '../Auth/store/selectors';
import { createStructuredSelector } from 'reselect';
import GoBackHeader from '../../components/Headers/GobackHeader';

const { width, height } = Dimensions.get('window');

const buttonSize = {
  width: width * 0.8,
  height: height * 0.06,
  font: 18,
  radius: 10,
};
const initialRegion = {
  latitude: 33.597739,
  longitude: -7.635933,
  latitudeDelta: 0.04864195044303443,
  longitudeDelta: 0.040142817690068,
};

export const Filter = ({ navigation, currentUser }) => {
  const initialPackagesParams = useMemo(() => {
    return {
      indivSessions: false,
      groupSessions: false,
    };
  }, []);

  const initialSkillsLevels = useMemo(() => {
    return {
      beginner: false,
      intermediate: false,
      professional: false,
      surfGiding: false,
    };
  }, []);

  const getMaxPrice = () => {
    return currentUser?.currency === EURO ? 1500 : 15000;
  };

  const getStep = () => {
    return currentUser?.currency === EURO ? 5 : 15;
  };

  const delayedSlider = debounce((value) => handleSliderChange(value), 500);
  const months = useMemo(
    () => dateRange(startOfToday(), addYears(startOfToday(), 1)),
    [],
  );
  const [location, setLocation] = useState('');
  const [monthsDays, setMonthsDays] = useState(getMonthsDays(months[0].value));
  const [selectedMonth, setSelectedMonth] = useState(months[0].value);
  const [selectedDay, setSelectedDay] = useState(monthsDays[0].number);
  const [slider, setSlider] = useState(getMaxPrice());
  const [packagesParams, setPackagesParams] = useState(initialPackagesParams);
  const [numberOfAdults, setNumberOfAdults] = useState(0);
  const [skillsLevelsParams, setSkillsLevelsParams] = useState(
    initialSkillsLevels,
  );

  const skillsLevels = [
    {
      id: 0,
      title: i18n.t(translation.beginner.id),
      selected: skillsLevelsParams.beginner,
      setSelected: (value) =>
        setSkillsLevelsParams({ ...skillsLevelsParams, beginner: value }),
    },
    {
      id: 1,
      title: i18n.t(translation.intermediate.id),
      selected: skillsLevelsParams.intermediate,
      setSelected: (value) =>
        setSkillsLevelsParams({ ...skillsLevelsParams, intermediate: value }),
    },
    {
      id: 2,
      title: i18n.t(translation.profesional.id),
      selected: skillsLevelsParams.professional,
      setSelected: (value) =>
        setSkillsLevelsParams({ ...skillsLevelsParams, professional: value }),
    },
    {
      id: 3,
      title: i18n.t(translation.surfGiding.id),
      selected: skillsLevelsParams.surfGiding,
      setSelected: (value) =>
        setSkillsLevelsParams({ ...skillsLevelsParams, surfGiding: value }),
    },
  ];

  const packagesItems = [
    {
      id: 0,
      title: i18n.t(translation.indivSessions.id),
      selected: packagesParams.indivSessions,
      label: INDIVIDUAL,
      setSelected: (value) =>
        setPackagesParams({ ...packagesParams, indivSessions: value }),
    },
    {
      id: 1,
      title: i18n.t(translation.groupSessions.id),
      selected: packagesParams.groupSessions,
      label: GROUP,
      setSelected: (value) =>
        setPackagesParams({ ...packagesParams, groupSessions: value }),
    },
  ];

  const personsItems = [
    {
      id: 0,
      title: i18n.t(translation.numberOfAdults.id),
      stateNumber: numberOfAdults,
      setStateNumber: setNumberOfAdults,
    },
  ];

  const handleCheckBoxPressed = (item) => () => {
    item.setSelected(!item.selected);
  };

  const getUserCurrency = useCallback(() => {
    return currentUser?.currency || MAD;
  }, [currentUser]);

  const filterItems = [
    {
      title: i18n.t(translation.priceRange.id),
      details: (
        <SliderContainer
          min={0}
          max={getMaxPrice()}
          step={getStep()}
          currency={getUserCurrency()}
          value={slider}
          onChange={delayedSlider}
        />
      ),
    },
    {
      title: i18n.t(translation.packages.id),
      details: (
        <View style={Style.checkboxContainer}>
          {packagesItems.map((item) => {
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
      title: i18n.t(translation.numberOfPersons.id),
      details: (
        <View style={Style.numberOfPersons}>
          {personsItems.map((item) => {
            return (
              <View key={item.id} style={Style.inputNumberContainer}>
                <InputNumber {...item} />
              </View>
            );
          })}
        </View>
      ),
      display: packagesParams.groupSessions,
    },
    {
      title: i18n.t(translation.dates.id),
      details: (
        <View>
          <Dates
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            setSelectedMonth={setSelectedMonth}
            setMonthsDays={setMonthsDays}
            monthsDays={monthsDays}
            months={months}
            selectedMonth={selectedMonth}
          />
        </View>
      ),
    },
    {
      title: i18n.t(translation.skills.id),
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
  ];

  const handleSliderChange = useCallback((value) => {
    setSlider(value);
  }, []);

  const getGroupSize = useCallback(() => {
    return packagesItems.groupSessions ? numberOfAdults : 1;
  }, [numberOfAdults, packagesItems.groupSessions]);

  const matchTitleWithSkillValues = useCallback((item) => {
    switch (item.id) {
      case 0:
        return BEGINNER;
      case 1:
        return INTERMEDIATE;
      case 2:
        return PROFESSIONAL;
      case 3:
        return SURF_GUIDING;
    }
  }, []);

  const getSkillLevels = useCallback(() => {
    let skills = [];
    skillsLevels.map((item) =>
      item.selected ? skills.push(matchTitleWithSkillValues(item)) : null,
    );
    return skills;
  }, [matchTitleWithSkillValues, skillsLevels]);

  const handleSearchPressed = useCallback(() => {
    let reservationDate = dateFromMonthAndDay(selectedMonth, selectedDay);
    const packageTypes = packagesItems.reduce((a, b) => {
      b.selected ? a.push(b.label) : null;
      return a;
    }, []);

    navigation.navigate(routes.LIST_OFFERS, {
      filters: {
        packageTypes,
        maxPrice: slider,
        minPrice: 0,
        reservationDate,
        location: location.trim(),
        currency: getUserCurrency(),
        groupSize: getGroupSize(),
        skillLevels: getSkillLevels(),
      },
    });
  }, [
    selectedMonth,
    selectedDay,
    packagesItems,
    navigation,
    slider,
    location,
    getUserCurrency,
    getGroupSize,
    getSkillLevels,
  ]);

  return (
    <View style={Style.container}>
      <GoBackHeader />
      <MapView
        initialRegion={initialRegion}
        style={Style.maps}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapsStyle}
        maxZoomLevel={2}
      />
      <View style={Style.topLayer}>
        <View style={Style.searchBox}>
          <SearchBar
            width={width * 0.87}
            placeholder={i18n.t(translation.searchPlaceholder.id)}
            onChangeText={setLocation}
            value={location}
            withFilterIcon={false}
          />
        </View>
        <KeyboardAwareScrollView
          style={Style.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {filterItems.map((item) => {
            return item?.display !== false ? (
              <FilterItem
                title={item.title}
                children={item.details}
                key={item.title}
              />
            ) : null;
          })}

          <View style={Style.buttonContainer}>
            <Button
              title={i18n.t(translation.search.id)}
              size={buttonSize}
              onPress={handleSearchPressed}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: getCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(memo(Filter));
