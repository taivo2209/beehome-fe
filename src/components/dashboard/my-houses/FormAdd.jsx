import { useRouter } from 'next/router';

function FormAdd() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/create-listing');
  };

  return (
    <>
      <button
        className={`list-inline-item add_listing`}
        style={{
          border: 'none',
          backgroundColor: '#ee7b35',
          padding: '10px',
          color: 'white',
          borderRadius: '30px',
        }}
        onClick={handleClick}
      >
        <span className="flaticon-plus"></span>
        <span className="dn-lg"> Create Houses</span>
      </button>
    </>
  );
}

export default FormAdd;
