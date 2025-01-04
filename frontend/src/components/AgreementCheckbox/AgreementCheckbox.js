import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const AgreementCheckbox = ({ agree, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name="agree"
          checked={agree}
          onChange={onChange}
        />
      }
      label="Bạn có đồng ý với các điều khoản đăng ký?"
    />
  );
};

export default AgreementCheckbox;
