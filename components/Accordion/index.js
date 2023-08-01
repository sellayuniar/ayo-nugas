import React from "react";
import { Accordion } from "flowbite-react";
import { dataAccordion } from "@/data/dataAccordion";

const AccordionItems = () => {
  return (
    <Accordion>
      {dataAccordion.map((data) => (
        <Accordion.Panel key={data.id}>
          <Accordion.Title>{data.title}</Accordion.Title>
          <Accordion.Content>
            <div className="mb-2 text-gray-500 dark:text-gray-400">
              <p>{data.description}</p>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      ))}
    </Accordion>
  );
};

export default AccordionItems;
