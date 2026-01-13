// src/components/Common/SectionTitle.tsx
import React from "react";

interface SectionTitleProps {
  title: string;
  paragraph?: string;
  width?: string;
  center?: boolean;
  mb?: string;
}

const SectionTitle = ({
  title,
  paragraph,
  width = "635px",
  center,
  mb = "100px",
}: SectionTitleProps) => {
  return (
    <div
      className={`w-full ${center ? "mx-auto text-center" : ""}`}
      style={{ maxWidth: width, marginBottom: mb }}
    >
      <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[45px]">
        {title}
      </h2>
      {paragraph && (
        <p className="text-base leading-relaxed text-body-color md:text-lg">
          {paragraph}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;