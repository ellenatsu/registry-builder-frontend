import { OFFICIAL_FB_URL, OFFICIAL_INSTA_URL } from "../../constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagramSquare } from "@fortawesome/free-brands-svg-icons";

const SocialMediaIcons = ({classname}:{classname:string}) => {
  return (
    <div className="flex flex-row text-base space-x-1">
      <p>Follow us</p>
      <div
        onClick={() => {
          window.open(OFFICIAL_FB_URL, "_blank");
        }}
        className="cursor-pointer"
      >
        <FontAwesomeIcon icon={faFacebookSquare} className={classname} />
      </div>

      <div
        onClick={() => {
          window.open(OFFICIAL_INSTA_URL, "_blank");
        }}
        className="cursor-pointer"
      >
        <FontAwesomeIcon icon={faInstagramSquare} className={classname} />
      </div>
    </div>
  );
};

export default SocialMediaIcons;
