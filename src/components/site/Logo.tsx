import logoAsset from "@/assets/ekorrit-logo.png.asset.json";

export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  /** Mörk bakgrund: logotypen får en ljus platta bakom sig så den syns. */
  onDark?: boolean;
}) {
  const img = (
    <img
      src={logoAsset.url}
      alt="Ekorrit AB – ekonomi & rådgivning"
      width={279}
      height={113}
      className={onDark ? "h-8 w-auto" : "h-9 w-auto"}
    />
  );

  if (onDark) {
    return (
      <span
        className={`inline-flex items-center rounded-2xl bg-background px-3.5 py-2.5 ${className ?? ""}`}
      >
        {img}
      </span>
    );
  }

  return <span className={`inline-flex items-center ${className ?? ""}`}>{img}</span>;
}
