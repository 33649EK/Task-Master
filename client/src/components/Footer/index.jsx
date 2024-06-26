import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto text-dark p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button

            className="custom-footer-button"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
