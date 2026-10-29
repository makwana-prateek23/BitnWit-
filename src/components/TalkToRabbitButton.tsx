'use client';

import { ReactNode } from 'react';

interface TalkToRabbitButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function TalkToRabbitButton({
  children = 'Talk to White Rabbit',
  className = '',
  onClick
}: TalkToRabbitButtonProps) {
  const handleClick = () => {
    if (onClick) onClick();
    window.dispatchEvent(new CustomEvent('open-white-rabbit-chat'));
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
