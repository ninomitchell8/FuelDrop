import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FontAwesome = () => {
  return (
    <div>
      {/* Use the FontAwesomeIcon component and pass the icon as a prop */}
      <FontAwesomeIcon icon={faCoffee} />
      <p>Have some coffee!</p>
    </div>
  );
};

export default FontAwesome;