import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface BadgeProps {
  label: string;
  color: string;
  IconComponent?: SvgIconComponent;
  tooltip?: string;
}

const Badge: React.FC<BadgeProps> = ({ label, color, IconComponent, tooltip }) => {
  const chip = (
    <Chip
      label={label}
      icon={IconComponent ? <IconComponent /> : undefined}
      sx={{
        backgroundColor: color,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '0.875rem',
        margin: '0.50em',
        height: '1.75em',
      }}
      role="listitem"
      tabIndex={0}
      aria-label={tooltip || label}
    />
  );

  return tooltip ? <Tooltip title={tooltip}>{chip}</Tooltip> : chip;
};

export default Badge;
