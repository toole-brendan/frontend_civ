import React from 'react';
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';

interface TypographyProps extends MuiTypographyProps {
  variant?: 'pageTitle' | 'sectionHeader' | 'cardTitle' | 'dataLabel' | 'dataValue' | 'supportingText' | MuiTypographyProps['variant'];
}

const Typography: React.FC<TypographyProps> = ({ variant, children, ...props }) => {
  let typographyProps: MuiTypographyProps = { ...props };
  
  switch (variant) {
    case 'pageTitle':
      typographyProps = {
        variant: 'h4',
        fontWeight: 700,
        fontSize: '24px',
        ...props
      };
      break;
    case 'sectionHeader':
      typographyProps = {
        variant: 'h5',
        fontWeight: 600,
        fontSize: '20px',
        ...props
      };
      break;
    case 'cardTitle':
      typographyProps = {
        variant: 'h6',
        fontWeight: 500,
        fontSize: '16px',
        ...props
      };
      break;
    case 'dataLabel':
      typographyProps = {
        variant: 'body2',
        fontWeight: 400,
        fontSize: '14px',
        color: 'text.secondary',
        ...props
      };
      break;
    case 'dataValue':
      typographyProps = {
        variant: 'body1',
        fontWeight: 600,
        fontSize: '14px',
        ...props
      };
      break;
    case 'supportingText':
      typographyProps = {
        variant: 'body2',
        fontSize: '12px',
        color: 'text.secondary',
        ...props
      };
      break;
    default:
      // Use the provided variant or default to body1
      typographyProps = {
        variant: variant as MuiTypographyProps['variant'] || 'body1',
        ...props
      };
  }
  
  return <MuiTypography {...typographyProps}>{children}</MuiTypography>;
};

export default Typography; 