import React, { FC, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CheckBox, Icon } from "react-native-elements";

// STYLES
import colors from "../styles/variables/colors";

interface Props {
  label: string;
  data: string[];
  multipleOptions: boolean;
  checkAll?: string;
}

const Dropdown: FC<Props> = ({ label, data, multipleOptions, checkAll }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState([label]);
  const [checked, setChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const handleSelect = (item: string) => {
    setSelected((prev) => {
      if (multipleOptions) {
        const updatedSelection = prev.filter((i) => i !== label);
        if (updatedSelection.includes(item)) {
          return updatedSelection.filter((i) => i !== item);
        } else {
          return [...updatedSelection, item];
        }
      } else {
        return [item];
      }
    });

    if (!multipleOptions) {
      setVisible(false);
    }
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleCheckAll = () => {
    if (checked) {
      // Если "Все" выбрано, добавляем все элементы
      setSelected(data);
      setCheckedItems(
        data.reduce((acc, item) => ({ ...acc, [item]: true }), {})
      );
    } else {
      // Если "Все" снято, очищаем выбор
      setSelected([label]);
      setCheckedItems({});
    }
  };

  // Следит за изменением checkAll и обновляет выбор
  useEffect(() => {
    handleCheckAll();
  }, [checked]);

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={checkedItems[item] ? styles.itemChecked : styles.item}
      onPress={() => handleSelect(item)}
    >
      <Text style={styles.itemText}>{item}</Text>
      {multipleOptions && (
        <View pointerEvents="none">
          <CheckBox
            checked={checkedItems[item] || false}
            containerStyle={{ margin: 0, padding: 0 }}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.select,
          selected[0] === label ? styles.selectBorderGrey : styles.selectBorder,
        ]}
        onPress={toggleDropdown}
      >
        <Text
          style={
            selected[0] === label ? styles.selectTextGrey : styles.selectText
          }
          numberOfLines={1}
        >
          {selected.join(", ")}
        </Text>

        <Icon
          type="font-awesome"
          name={visible ? "chevron-up" : "chevron-down"}
          size={16}
        />
      </TouchableOpacity>

      {visible && (
        <View style={styles.dropdown}>
          {multipleOptions && (
            <TouchableOpacity
              style={styles.item}
              onPress={() => setChecked(!checked)}
            >
              <Text style={styles.itemText}>Все</Text>
              <View pointerEvents="none">
                <CheckBox
                  checked={checked}
                  containerStyle={{ margin: 0, padding: 0 }}
                />
              </View>
            </TouchableOpacity>
          )}
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
  },
  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    padding: 10,
  },
  selectBorder: {
    borderBottomColor: colors.primaryElements,
  },
  selectBorderGrey: {
    borderBottomColor: "#BDBDBD",
  },
  selectText: {
    width: 300,
    color: "black",
  },
  selectTextGrey: {
    color: "#BDBDBD",
  },
  dropdown: {
    marginTop: 5,
    zIndex: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  itemChecked: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryElements,
  },
  itemText: {
    fontSize: 16,
    maxWidth: 200,
  },
});

export default Dropdown;
