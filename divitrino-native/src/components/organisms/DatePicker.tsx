import { format } from "date-fns";
import React, { FunctionComponent, useState } from "react";
import { StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { unit } from "../../constants/ui";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

const DatePicker: FunctionComponent<Props> = ({ onConfirm, date }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <>
      <View style={[styles.dateRow, styles.paragraph]}>
        <Text size="s" text="Data" />
        <Button
          onPress={showDatePicker}
          style={styles.dateButton}
          label={format(date, "dd/MM/yyyy")}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(props) => {
          onConfirm(props);
          hideDatePicker();
        }}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  dateButton: {
    paddingVertical: unit,
    paddingHorizontal: unit * 3,
    marginHorizontal: unit * 2,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    marginVertical: unit * 3,
  },
});

interface Props {
  onConfirm: (date: Date) => void;
  date: Date;
}
