import React from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useFontSizeStore } from '../stores/fontSizeStore';

export default function FontSizeToggle() {
  const { fontSize, setFontSize } = useFontSizeStore();

  const handleDecrease = () => {
    const sizes: ('small' | 'medium' | 'large')[] = [
      'small',
      'medium',
      'large',
    ];
    const currentIndex = sizes.indexOf(fontSize);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    setFontSize(sizes[newIndex]);
  };

  const handleIncrease = () => {
    const sizes: ('small' | 'medium' | 'large')[] = [
      'small',
      'medium',
      'large',
    ];
    const currentIndex = sizes.indexOf(fontSize);
    const newIndex =
      currentIndex < sizes.length - 1 ? currentIndex + 1 : currentIndex;
    setFontSize(sizes[newIndex]);
  };

  const canDecrease = fontSize !== 'small';
  const canIncrease = fontSize !== 'large';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        backgroundColor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
        p: 0.5,
      }}
    >
      <Tooltip
        title={canDecrease ? 'Decrease Font Size' : 'Minimum Font Size Reached'}
        arrow
      >
        <span>
          <IconButton
            onClick={handleDecrease}
            size="small"
            disabled={!canDecrease}
            sx={{
              backgroundColor: canDecrease ? 'grey.300' : 'grey.100',
              color: canDecrease ? 'grey.700' : 'grey.400',
              '&:hover': {
                backgroundColor: canDecrease ? 'grey.400' : 'grey.100',
              },
              '&:disabled': {
                backgroundColor: 'grey.100',
                color: 'grey.400',
              },
            }}
          >
            <Remove />
          </IconButton>
        </span>
      </Tooltip>

      <Typography
        variant="body2"
        sx={{
          minWidth: '50px',
          textAlign: 'center',
          fontWeight: 'medium',
          textTransform: 'capitalize',
          fontSize: '0.75rem',
        }}
      >
        {fontSize}
      </Typography>

      <Tooltip
        title={canIncrease ? 'Increase Font Size' : 'Maximum Font Size Reached'}
        arrow
      >
        <span>
          <IconButton
            onClick={handleIncrease}
            size="small"
            disabled={!canIncrease}
            sx={{
              backgroundColor: canIncrease ? 'primary.main' : 'grey.100',
              color: canIncrease ? 'primary.contrastText' : 'grey.400',
              '&:hover': {
                backgroundColor: canIncrease ? 'primary.dark' : 'grey.100',
              },
              '&:disabled': {
                backgroundColor: 'grey.100',
                color: 'grey.400',
              },
            }}
          >
            <Add />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}
