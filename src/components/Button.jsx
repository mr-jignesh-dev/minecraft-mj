
import clsx from "clsx";

const Button = ({
  id,
  title,
  rightIcon,
  leftIcon,
  containerClass,
  onClick
}) => {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden  ",
        containerClass
      )}
    >
      {leftIcon}

      <span className="relative inline-flex overflow-hidden">
        <span className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[160%] group-hover:skew-y-12">
          {title}
        </span>

        <span className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </span>
      </span>

      {rightIcon}
    </button>
  );
};

export default Button;
