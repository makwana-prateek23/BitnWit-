'use client';

import React, { ReactNode } from 'react';

interface TalkToRabbitButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'span' | 'div';
}

export default function TalkToRabbitButton({
  children = 'Talk to White Rabbit',
  className = '',
  onClick,
  as = 'span'
}: TalkToRabbitButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Prevent event bubbling if clicking nested button
    e.stopPropagation();
    if (onClick) onClick();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-white-rabbit-chat'));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as unknown as React.MouseEvent);
    }
  };

  const Component = as;

  return (
    <Component
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`cursor-pointer inline-flex items-center ${className}`}
    >
      {children}
    </Component>
  );
}
