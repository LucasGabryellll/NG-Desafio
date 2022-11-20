import React from "react";

import { IconBaseProps } from 'react-icons';

type Props = {
  title: string
  value: string
  icon?: React.ComponentType<IconBaseProps>
}

export function CardItems({ title, icon: Icon, value }: Props) {
  return (
    <div className="flex flex-col items-center bg-white border-2 px-1.5 py-4 w-1/3 max-w-3xl">
      <div className="flex items-center justify-center w-1/12 gap-2">
        <p className="text-lg">{title}</p>
        {Icon && <Icon size={23} color="#000" />}
      </div>

      <span className="font-bold text-3xl">{value}</span>
    </div>
  );
}