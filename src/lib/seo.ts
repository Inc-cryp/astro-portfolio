interface SeoProps {
  title: string;
  description: string;
}

export function seo({ title, description }: SeoProps) {
  return { title, description };
}