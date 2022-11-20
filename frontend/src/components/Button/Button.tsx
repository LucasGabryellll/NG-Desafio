import React from "react";
import classNames from 'classnames';

type Props = {
  variant?: 'default' | 'primary' | 'light' | 'dark' | 'darkRed' | 'lightRed'
  children: React.ReactNode;
  onPress: () => void
}

export function Button({ variant, children, onPress }: Props) {
  let bgColor = 'text-black';
  if (variant === 'lightRed') bgColor = 'bg-primaryRed hover:bg-primaryRedLight active:bg-primaryRedDark transation-all text-white';
  if (variant === 'primary') bgColor = 'bg-primary hover:bg-primaryLight active:bg-primaryDark transation-all text-black';
  if (variant === 'light') bgColor = 'bg-primaryLight text-white';

  return (
    <button className={classNames(
      'py-2 px-5 rounded-md font-bold',
      bgColor
    )} onClick={onPress}>
      {children}
    </button>
  );
}