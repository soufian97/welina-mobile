import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Style } from './style';
import { ArrowBottom, ArrowTop } from '../../../../assets/svgs';
import { isEmpty } from 'lodash';
import { translation } from '../../messages';
import i18n from '../../../../config/i18n';

const Question = ({ question, answer }) => {
  const [collapse, setCollapse] = useState(false);

  const renderArrow = () => {
    return collapse ? <ArrowTop /> : <ArrowBottom />;
  };
  const onPressCollapseHandler = useCallback(() => setCollapse(!collapse), [
    collapse,
  ]);

  const renderSurferContent = useCallback(
    () => (
      <>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <View key={`${index}`}>
              <Text style={[Style.textAnswer, Style.textSubtitle]}>
                {i18n.t(
                  translation[`howWelinaWorksAnswerSubtitle${index + 1}`].id,
                )}
              </Text>
              <Text style={Style.textSubAnswer}>
                {i18n.t(
                  translation[`howWelinaWorksAnswerParagraph${index + 1}`].id,
                )}
              </Text>
            </View>
          ))}
      </>
    ),
    [],
  );
  const renderCoachContent = useCallback(
    () => (
      <>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <View key={`${index}`}>
              <Text style={[Style.textAnswer, Style.textSubtitle]}>
                {i18n.t(
                  translation[`howWelinaWorksCoachesAnswerSubtitle${index + 1}`]
                    .id,
                )}
              </Text>
              <Text style={Style.textSubAnswer}>
                {i18n.t(
                  translation[
                    `howWelinaWorksCoachesAnswerParagraph${index + 1}`
                  ].id,
                )}
              </Text>
            </View>
          ))}
      </>
    ),
    [],
  );

  const renderContent = useCallback(() => {
    return (
      <>
        {renderSurferContent()}
        {renderCoachContent()}
      </>
    );
  }, [renderCoachContent, renderSurferContent]);

  return (
    <>
      <TouchableOpacity
        onPress={onPressCollapseHandler}
        style={Style.container}
      >
        <Text style={Style.textQuestion}>{question}</Text>
        {renderArrow()}
      </TouchableOpacity>
      {collapse && (
        <>
          {isEmpty(answer) ? (
            <View style={Style.textAnswer}>{renderContent()}</View>
          ) : (
            <View>{answer}</View>
          )}
        </>
      )}
    </>
  );
};

export default Question;
