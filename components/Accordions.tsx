import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

export default function SimpleAccordion() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <div className="dark:bg-[hsl(228,12%,8%)] rounded-lg">
      <Accordion
        className={expanded === "panel1" ? "mt-[40px] shadow-xl" : "mt-[40px]"}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="text-base font-semibold">
            Best houses on the market
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="p-[1.25rem_2.5rem_0_2.75rem]">
            The price we provide is the best for you, we guarantee no price
            changes on your property due to various unexpected costs that may
            come.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        className={expanded === "panel2" ? "shadow-xl" : ""}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="text-base font-semibold">
            Get ahead of price instabilities
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="p-[1.25rem_2.5rem_0_2.75rem]">
            The price we provide is the best for you, we guarantee no price
            changes on your property due to various unexpected costs that may
            come.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        className={expanded === "panel3" ? "shadow-xl" : ""}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="text-base font-semibold">
            Best prices on the market
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="p-[1.25rem_2.5rem_0_2.75rem]">
            The price we provide is the best for you, we guarantee no price
            changes on your property due to various unexpected costs that may
            come.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        className={expanded === "panel4" ? "shadow-xl" : ""}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="text-base font-semibold">
            Security of your data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="p-[1.25rem_2.5rem_0_2.75rem]">
            The price we provide is the best for you, we guarantee no price
            changes on your property due to various unexpected costs that may
            come.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
