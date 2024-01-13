type IconProps = {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export function Icon({ id, ...rest }: IconProps) {
  return (
    <svg {...rest}>
      <use href={`/assets/icons/sprite.svg#${id}`} />
    </svg>
  );
}
