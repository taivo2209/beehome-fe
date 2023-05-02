import { useState } from 'react';

const PropertyRule = ({ rule }) => {
  const [click, setClick] = useState(true);
  const handleClick = () => setClick(!click);

  return (
    <>
      <p
        className="mb25"
        dangerouslySetInnerHTML={{
          __html: rule?.replace(/\n/g, '<br/>'),
        }}
      ></p>
    </>
  );
};

export default PropertyRule;
