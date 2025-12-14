import { Detail } from "@/models/detail"
import { View, Text } from "react-native";
import tablesStyles from "@/styles/tables";
import { useTranslation } from "react-i18next";
import globalStyles from "@/styles/global";

interface detailTableProps {
    detail: Detail;
}
export default function detailTable({ detail }: detailTableProps) {
    const {t} = useTranslation();
    return detail ? (
        <View >
            <View style={{...tablesStyles.row}}>
                <View style={{...tablesStyles.cell}}>
                    <Text style={{...globalStyles.smallBodyRegular}}>{t("challengeDetail.estimatedTime")}</Text>
                    <Text>{detail.duration}h</Text>
                </View>
                <View style={{...tablesStyles.cell}}>
                    <Text style={{...globalStyles.smallBodyRegular}}>{t("challengeDetail.price")}</Text>
                    <Text>{detail.price} $</Text>
                </View>
            </View>
            <View style={{...tablesStyles.row}}>
                <View style={{...tablesStyles.cell}}>
                    <Text style={{...globalStyles.smallBodyRegular}}>{t("challengeDetail.availablity")}</Text>
                    <Text>Sin reserva</Text>
                </View>
                <View style={{...tablesStyles.cell}}>
                    <Text style={{...globalStyles.smallBodyRegular}}>{t("challengeDetail.experience")}</Text>
                    <Text>{detail.xp} xp</Text>
                </View>
            </View> 
        </View>
    ) : null;
}