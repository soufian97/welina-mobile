import React from 'react';
import { View, Text, Dimensions, FlatList } from 'react-native';
import Style from './style';
import { Star, Write } from '../../assets/svgs';
import IconButton from '../Buttons/IconButton';
import Review from '../Review';
import I18n from '../../components/I18n';
import i18n from '../../config/i18n';
import { getDateFormatter } from '../../utils/date/dateFormater';
import { translation } from '../../containers/CoachDetails/messages';
import { colors } from '../../utils/colors';
import RenderNoData from '../RenderNoData';
const { width, height } = Dimensions.get('window');

const size = {
  radius: 8,
  width: width * 0.35,
  height: height * 0.051,
  font: width * 0.029,
};

const Reviews = ({
  review,
  getMoreReviews,
  scoreAverage,
  onPressWriteReview,
  canWriteReview = true,
}) => {
  const { totalElements, content } = review;

  const getNumberOfStars = () =>
    scoreAverage ? Number(scoreAverage).toFixed(1) : null;

  const getReviewerName = ({ reviewer }) =>
    reviewer?.firstName
      ? `${reviewer.firstName} ${reviewer.lastName}`
      : i18n.t(translation.anonymous.id);

  const getReviewerAvatar = ({ reviewer }) => reviewer?.photo || null;

  return (
    <View style={Style.container}>
      <View style={Style.reviewsContainer}>
        <View style={Style.header}>
          <View style={Style.infoContainer}>
            <Text style={Style.title}>
              <I18n {...translation.reviewsText} />
            </Text>
            <View style={Style.rating}>
              <Star color={colors.BLACK} />
              <Text style={Style.value}>{getNumberOfStars()}</Text>
              <Text style={Style.total}>
                {i18n.t(translation.reviews.id, {
                  reviews: totalElements || 0,
                })}
              </Text>
            </View>
          </View>
          {canWriteReview && (
            <View style={Style.iconButton}>
              <IconButton
                title={i18n.t(translation.write.id)}
                icon={<Write />}
                right={false}
                size={size}
                onPress={onPressWriteReview}
              />
            </View>
          )}
        </View>
        <View style={Style.reviews}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={content}
            onEndReached={getMoreReviews}
            onEndReachedThreshold={0.1}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            windowSize={10}
            renderItem={({ item }) => (
              <Review
                name={getReviewerName(item)}
                avatar={getReviewerAvatar(item)}
                rating={item.score}
                date={getDateFormatter(item.createdAt)}
                review={item.comment}
                key={`${item.id}`}
              />
            )}
            ListEmptyComponent={
              <RenderNoData
                title={i18n.t(translation.noReviews.id)}
                iconHeight={height / 6}
                iconWidth={width / 2}
              />
            }
          />
        </View>
      </View>
    </View>
  );
};
export default Reviews;
