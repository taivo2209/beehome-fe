import { useRouter } from 'next/router';

function FormEdit({ id }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/edit-listing?id=${id}`);
  };

  return (
    <>
      <span className="flaticon-edit" onClick={handleClick}></span>
    </>
  );
}

export default FormEdit;
