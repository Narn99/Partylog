import React, { createContext, useState, useContext } from 'react';

const FollowContext = createContext();



export const FollowProvider = ({ children }) => {
  const [followings, setFollowings] = useState(['following1', 'following2', 'following3']);

  return (
    <FollowContext.Provider value={{ followings, setFollowings }}>
      {children}
    </FollowContext.Provider>
  );
};

export const useFollow = () => {
  const context = useContext(FollowContext);
  if (context === undefined) {
    throw new Error('useFollow must be used within a FollowProvider');
  }
  return context;
};
