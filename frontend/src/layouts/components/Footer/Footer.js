import React from "react";
import { Grid, Typography, Box, Link } from "@mui/material";
import styles from "./Footer.module.scss";
import { Facebook, Pinterest, Twitter } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box className={styles.footer}>
      <Grid container spacing={2} justifyContent="center" sx={{ minWidth: '100%' }}>
        {/* Cột 1 */}
        <Grid item xs={12} sm={4} textAlign="center">
          <img
            src="/logo.png"
            alt="Logo"
            className={styles.logo}
          />
          <Typography className={styles.text}>
            Khoa Công nghệ Thông tin, Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM
          </Typography>
          <Typography className={styles.text}>
            Faculty of Information Technology, VNUHCM-University of Science
          </Typography>
        </Grid>

        {/* Cột 2 */}
        <Grid item xs={12} sm={4} textAlign="center">
            <Typography sx={{ fontSize: 30 }} className={styles.sectionTitle}>
                Info
            </Typography>
            <Link href="#" className={styles.link}>
                Website Trường
            </Link>
            <Link href="#" className={styles.link}>
                Website Khoa
            </Link>
            <Link href="#" className={styles.link}>
                HCMUS Portal
            </Link>
        </Grid>

        {/* Cột 3 */}
        <Grid item xs={12} sm={4} textAlign="center">
            <Typography sx={{ fontSize: 30 }} className={styles.sectionTitle}>
                Contact us
            </Typography>
            <Typography className={styles.text}>
                227 Nguyen Van Cu, District 5, Ho Chi Minh city, Vietnam
            </Typography>
            <Typography className={styles.text}>
                Phone: (028) 3835 4266
            </Typography>
            <Typography className={styles.text}>
                E-mail: info@fit.hcmus.edu.vn
            </Typography>
            <Box className={styles.socialLinks}>
                <Link href="#" className={styles.icon}>
                <Facebook fontSize="large" />
                </Link>
                <Link href="#" className={styles.icon}>
                <Pinterest fontSize="large" />
                </Link>
                <Link href="#" className={styles.icon}>
                <Twitter fontSize="large" />
                </Link>
            </Box>
        </Grid>
      </Grid>
      <Box className={styles.powered}>
        Powered by{" "}
        <Link
          href="https://moodle.org"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkMoodle}
        >
          Moodle
        </Link>
      </Box>
    </Box>
  );
}
