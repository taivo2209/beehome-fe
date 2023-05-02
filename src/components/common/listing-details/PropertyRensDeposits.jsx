import { useState } from 'react';

const PropertyRenDeposits = ({ renDeposits }) => {
  const [click, setClick] = useState(true);
  const handleClick = () => setClick(!click);

  return (
    <>
      <p
        className="mb25"
        dangerouslySetInnerHTML={{
          __html: renDeposits?.replace(/\n/g, '<br/>'),
        }}
      ></p>
    </>
  );
};

export default PropertyRenDeposits;
