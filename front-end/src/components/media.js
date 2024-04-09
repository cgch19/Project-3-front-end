import React, { useEffect } from 'react';
import ReactMedia from 'react-media';

const CustomMedia = ({ children }) => {
    useEffect(() => {
      return () => {
        
      };
    }, []);
  return (
    <ReactMedia 
      queries={{
        small: '(max-width: 767px)',
        medium: '(min-width: 768px) and (max-width: 991px)',
        large: '(min-width: 992px)'
      }}
    >
      {matches => (
       <div>
       {matches.phone && children.phone}
       {matches.tablet && children.tablet}
       {matches.laptop && children.laptop}
     </div>
      )}
    </ReactMedia>
  );
};

export default CustomMedia;
