import { Link } from "@remix-run/react";
import { SketchLogoIcon } from "@radix-ui/react-icons";

function Logo() {
  return (
   <h1 id="logo">
    <SketchLogoIcon />
    <Link to="/"> Expenses</Link>
    </h1>
  );
}

export default Logo;
