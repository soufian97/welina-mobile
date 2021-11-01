import React, { useCallback, useState, createRef, useEffect } from 'react';
import { TextInput, View, Text } from 'react-native';
import { Style } from './style';
import { BACKSPACE } from '../../../../config/app.constant';

const OtpInput = ({ onChangeOtpText, hasError, otpValue }) => {
  const [fields, setField] = useState(Array(4).fill(''));
  const [refs, setRefs] = useState([]);
  const arrLength = 4;
  useEffect(() => {
    if (!otpValue) {
      setField(Array(4).fill(''));
    }
  }, [otpValue]);

  useEffect(() => {
    setRefs((refs) =>
      Array(arrLength)
        .fill()
        .map((_, i) => refs[i] || createRef()),
    );
  }, [arrLength]);

  const handleValueChange = useCallback(
    (index) => (newVal) => {
      const newFields = [...fields];
      newFields[index] = newVal;

      if (index < arrLength - 1 && newVal) {
        refs[index + 1].current.focus();
      }
      onChangeOtpText(newFields.join(''));
      setField(newFields);
    },
    [fields, onChangeOtpText, refs],
  );

  const handleKeyPress = useCallback(
    (event, index) => {
      if (event.key === BACKSPACE) {
        const newFields = [...fields];
        newFields[index] = '';
        setField(newFields);
        if (index > 0 && fields[index].length === 0) {
          refs[index - 1].current.focus();
        }
      }
    },
    [fields, refs],
  );

  return (
    <View>
      <View style={Style.container}>
        {fields.map((item, index) => (
          <TextInput
            key={index}
            ref={refs[index]}
            maxLength={1}
            style={[Style.textInput, hasError && Style.textInputError]}
            keyboardType="numeric"
            onChangeText={handleValueChange(index)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, index)}
            value={item}
          />
        ))}
      </View>
      {hasError && (
        <Text>Invalid OTP, please enter the code you received </Text>
      )}
    </View>
  );
};

export default OtpInput;
