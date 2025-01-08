import React, { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import Rating from '@mui/material/Rating';

const FilterBar = ({ onFilterChange }) => {
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState([0, 1000000]);

  const handleRatingChange = (event) => {
    const value = parseFloat(event.target.value);
    setRating(value);
    onFilterChange({ rating: value, price });
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
    onFilterChange({ rating, price: newValue });
  };

  return (
    <Box sx={{ mt: 4, maxWidth: '80%' }}>
      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <Typography variant="h6" component="legend">Rating</Typography>
        <RadioGroup value={rating} onChange={handleRatingChange}>
          {[5, 4.5, 4, 3.5, 3].map((value) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={
                <Box display="flex" alignItems="center">
                  <Rating value={value} readOnly precision={0.5} />
                  <Typography sx={{ ml: 1 }}>{value} & up</Typography>
                </Box>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Typography variant="h6" gutterBottom>
        Price Range
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Slider
          value={price}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={15000000}
          step={200000}
        />
      </Box>
    </Box>
  );
};

export default FilterBar;