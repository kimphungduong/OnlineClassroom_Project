import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CustomBreadcrumbs = ({ links, current }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
      {links.map((link, index) => (
        <Link key={index} underline="hover" color="inherit" href={link.href}>
          {link.label}
        </Link>
      ))}
      <Typography color="text.primary">{current}</Typography>
    </Breadcrumbs>
  );
};

CustomBreadcrumbs.propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ).isRequired,
    current: PropTypes.string.isRequired,
  };
export default CustomBreadcrumbs;