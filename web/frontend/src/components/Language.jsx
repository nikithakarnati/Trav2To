// components/LanguageExchange.jsx
import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const Language = ({ selectedLang, setSelectedLang, languages, handleTranslator }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Dropdown
        value={selectedLang}
        options={languages}
        onChange={(e) => setSelectedLang(e.value)}
        placeholder="Select Language"
        className="w-full"
      />
      <Button
        label="Use Translator 📷"
        className="p-button-secondary w-full"
        onClick={handleTranslator}
      />
    </div>
  );
};

export default Language;
