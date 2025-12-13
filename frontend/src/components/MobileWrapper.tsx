import React from 'react';

interface MobileWrapperProps {
  children: React.ReactNode;
}

const MobileWrapper: React.FC<MobileWrapperProps> = ({ children }) => {
  return <>{children}</>;
};

export default MobileWrapper;