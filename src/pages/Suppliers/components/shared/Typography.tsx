import React from 'react';
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { Variant } from '@mui/material/styles/createTypography';
import { TypographyPropsVariantOverrides } from '@mui/material/Typography';

// Define our custom variants
interface CustomTypographyPropsVariantOverrides extends TypographyPropsVariantOverrides {
  pageTitle: true;
  sectionHeader: true;
  cardTitle: true;
  dataLabel: true;
  dataValue: true;
  supportingText: true;
}

// Extend the MuiTypographyProps with our custom variant
interface TypographyProps extends Omit<MuiTypographyProps, 'variant'> {
  variant?: OverridableStringUnion<
    Variant | 'inherit',
    CustomTypographyPropsVariantOverrides
  >;
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