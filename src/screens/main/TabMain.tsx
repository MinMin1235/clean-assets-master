import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MyCourse } from "../my-course";
import { BottomTabT } from "../../navigations/types";
import { Profile } from "../profile";
import { Home, Reports } from "..";
import { CustomTab } from "../../components/custom-tab/CustomTab";

const Tab = createBottomTabNavigator<BottomTabT>();

export default function BottomTab() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTab {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="MyCourse" component={MyCourse} />
            <Tab.Screen name="Reports" component={Reports} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}
