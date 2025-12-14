import { View, StyleSheet, Text, Pressable } from "react-native";
import IconTextInput from "@/components/forms/IconTextInput";
import { Search } from "lucide-react-native";

import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Challenge from "@/models/challenge";
import VerticalDivider from "../ui/verticalSeparator";
//styles
import { Colors } from "@/constants/Colors";
import {Filter,ArrowDownWideNarrow, ArrowUpWideNarrow} from "lucide-react-native"
interface ChallengeExplorerProps {
    challenges: Challenge[];
    onFiltered: (filtered: Challenge[]) => void; 
}

function ChallengeExplorer({ challenges, onFiltered }: ChallengeExplorerProps) {
    const [search, setSearch] = useState("");
    const { t } = useTranslation();
    const [isProximityAsc, setIsProximityAsc] = useState(true);

    const filteredChallenges = useMemo(() => {
        if (!search.trim()) return challenges;

        return challenges.filter(challenge =>
            challenge.title?.toLowerCase().includes(search.toLowerCase()) ||
            challenge.short_description?.toLowerCase().includes(search.toLowerCase()) ||
            challenge.long_description?.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, challenges]); 

    function orderByProximity() {
        var sorted: Challenge[] = [];
        if (isProximityAsc){
            sorted = [...challenges].sort((a, b) => {
                    if (a.distance_from_challenge_to_city_center === undefined) return 1;
                    if (b.distance_from_challenge_to_city_center === undefined) return -1;
                    return b.distance_from_challenge_to_city_center - a.distance_from_challenge_to_city_center;
                });
        }else{
             sorted = [...challenges].sort((a, b) => {
                if (a.distance_from_challenge_to_city_center === undefined) return 1;
                if (b.distance_from_challenge_to_city_center === undefined) return -1;
                return a.distance_from_challenge_to_city_center - b.distance_from_challenge_to_city_center;
            });
        }
           

        onFiltered(sorted);
        setIsProximityAsc(!isProximityAsc);
    }

    useEffect(() => {
        onFiltered(filteredChallenges);
    }, [filteredChallenges]);

    return (
        <View style={styles.container}>
            <IconTextInput
                placeholder={t("challengeExplorer.searchPlaceholder")}
                value={search}
                onChangeText={setSearch}
                icon={<Search size={24} color={Colors.colors.text.primary} />}
            />
            <View style={styles.filterContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Filter size={20} color={Colors.colors.text.primary} />
                    <Text>Filter</Text>
                </View>
                <VerticalDivider height={35} color={Colors.colors.border.default} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Pressable onPress={orderByProximity}>
                        {isProximityAsc ? <ArrowUpWideNarrow size={20} color={Colors.colors.text.primary} /> : 
                        <ArrowDownWideNarrow size={20} color={Colors.colors.text.primary} />}
                        <Text>{t('challengeExplorer.proximity')}</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom: 16,
        gap: 16,
    },
    filterContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 20,
    }
});
export default ChallengeExplorer;
