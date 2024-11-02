import { useState } from "react";
import { Text, View } from "react-native";
import Dropdown from "./CustomDropdown";
// STYLES
import layoutStyles from "../styles/general";

const specialization = [
  "Адвокат",
  "Банкротство",
  "Взыскание задолженности",
  "Защита прав потребителей",
  "Имущественные споры",
  "Консалтинг",
  "Кредиты и займы",
  "Строительство и недвижимость",
  "Финансовые рынки",
];
const lawFields = [
  "Банковское право",
  "Гражданское право",
  "Договорное право",
  "Земельное право и Градостроительство",
  "Корпоративное право",
  "Медицинское право",
  "Процессуальное право",
  "Семейное право",
];

const Registration = () => {
  const [phone, setPhone] = useState("");

  return (
    <View style={layoutStyles.container}>
      <Dropdown
        label={"Выберите вид деятельности"}
        data={specialization}
        multipleOptions={false}
      />
      <Dropdown
        label={"Выберите отрасли права"}
        data={lawFields}
        multipleOptions={true}
        checkAll="Выбрать все"
      />
    </View>
  );
};

export default Registration;
