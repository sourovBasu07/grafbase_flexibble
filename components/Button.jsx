import Image from "next/image";

const Button = ({
  type,
  submitting,
  textColor,
  bgColor,
  leftIcon,
  title,
  rightIcon,
  handleClick,
}) => (
  <button
    type={type || "button"}
    disabled={submitting || false}
    className={`flexCenter gap-3 px-4 py-3 ${
      textColor ? textColor : "text-white"
    } ${
      submitting ? "bg-black/50" : bgColor ? bgColor : "bg-primary-purple"
    } rounded-xl text-sm font-medium max-md:w-full`}
    onClick={handleClick}
  >
    {leftIcon && (
      <Image src={leftIcon} width={14} height={14} alt="left icon" />
    )}
    {title}
    {rightIcon && (
      <Image src={rightIcon} width={14} height={14} alt="right icon" />
    )}
  </button>
);

export default Button;
