import React from 'react';
import RocketIcon from '../svgs/rocket.svg';
import PlanetIcon from '../svgs/planet.svg';

interface TabBarIconProps {
  route: { name: string };
  color: string;
}

/**
 * Component for rendering tab bar icons.
 * Displays a Rocket or Planet icon depending on the route name.
 */
const TabBarIcon: React.FC<TabBarIconProps> = ({ route, color }) => {
  return route.name === 'Rockets' ? (
    <RocketIcon width={25} height={25} fill={color} />
  ) : (
    <PlanetIcon width={25} height={25} fill={color} />
  );
};

export default TabBarIcon;
