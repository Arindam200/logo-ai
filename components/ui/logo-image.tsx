"use client";

interface LogoImageProps {
  src: string;
  index: number;
}

export function LogoImage({ src, index }: LogoImageProps) {
  return (
    <div className="relative aspect-[4/3] h-full overflow-hidden rounded-xl group">
      <img
        src={src}
        alt={`Artwork ${index + 1}`}
        className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
        // sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        loading={index < 4 ? "eager" : "lazy"}
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
