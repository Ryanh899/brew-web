import React from "react";

import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export default function Footer() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ marginTop: "25px" }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/vpvnguyen/project-3-react-web">
        Brew
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
