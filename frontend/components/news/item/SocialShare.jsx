import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP, FaInstagram } from "react-icons/fa";

const SocialShare = ({ title, url, description }) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    const encodedDescription = encodeURIComponent(description);

    const socialLinks = [
        {
            platform: "Facebook",
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            icon: <FaFacebookF />,
        },
        {
            platform: "Twitter",
            url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            icon: <FaTwitter />,
        },
        {
            platform: "LinkedIn",
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            icon: <FaLinkedinIn />,
        },
        {
            platform: "Pinterest",
            url: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedDescription}`,
            icon: <FaPinterestP />,
        },
        {
            platform: "Instagram",
            url: `https://www.instagram.com/`, // Instagram doğrudan paylaşımı desteklemiyor
            icon: <FaInstagram />,
        },
    ];

    return (
        <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-semibold">Paylaş:</span>
            <div className="flex space-x-2">
                {socialLinks.map((social, index) => (
                    <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition"
                        title={`Paylaş ${social.platform}`}
                    >
                        {social.icon}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SocialShare;
