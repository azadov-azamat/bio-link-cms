"use client";

import { OnboardingData, TEMPLATE_NAMES } from "./utils";
import { TemplateCard } from "./template-card";

interface PreviewCardProps {
  data: OnboardingData;
  compact?: boolean;
}

export function PreviewCard({ data, compact = false }: PreviewCardProps) {
  const safeTemplate = TEMPLATE_NAMES.includes(
    data.template as (typeof TEMPLATE_NAMES)[number],
  )
    ? data.template
    : TEMPLATE_NAMES[0];

  return (
    <TemplateCard
      templateName={safeTemplate}
      data={data}
      variant={compact ? "compact" : "preview"}
    />
  );
}
