import React from "react";

interface SocialButtonProps {
  label: string;
  icon: any;
  url: string;
  showToolTip?: boolean;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  label,
  icon,
  url,
  showToolTip,
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-2xl relative group hover:scale-110 transition-transform after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-br after:from-white/40 after:to-white after:opacity-0 hover:after:opacity-100 after:blur-md"
    >
      {icon}
      {showToolTip && (
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max bg-gray-800 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all">
          {label}
        </span>
      )}
    </a>
  );
};

export default SocialButton;
