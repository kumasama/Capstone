import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import BottomNav from './BottomNav';
import AuthNav from './AuthNav';

export default createSwitchNavigator({
	Auth: AuthNav,
	App: BottomNav
})
