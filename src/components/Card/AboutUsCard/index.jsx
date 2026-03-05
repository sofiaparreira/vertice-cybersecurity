import { div } from "motion/react-client";

const AboutUsCard = ({ title, description}) => {
    return (
        <div className="py-8 border-t border-b border-gray-200/10">
                  <h3 className="text-2xl font-medium mb-2">{title}</h3>
                  <p className="text-gray-200/90">{description}</p>
                </div>
    )
}

export default AboutUsCard;