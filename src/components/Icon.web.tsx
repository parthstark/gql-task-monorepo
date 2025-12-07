import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#000' }) => {
  return (
    <i
      className={`mdi mdi-${name}`}
      style={{
        fontSize: size,
        color: color,
        lineHeight: 1,
      }}
    />
  );
};

export default Icon;
