// Real, unstaged photos from trips and vehicles in service — sourced from
// public/gallery/. No stock or AI-generated imagery.

export const galleryImages = [
  { id: "gallery-01", src: "/gallery/gallery-01.jpg", alt: "View from the back seat on a Bangalore highway", category: "On the Road" },
  { id: "gallery-02", src: "/gallery/gallery-02.jpg", alt: "On the road during an outstation trip", category: "On the Road" },
  { id: "gallery-02b", src: "/gallery/gallery-02b.jpg", alt: "On the road during an outstation trip", category: "On the Road" },
  { id: "gallery-03", src: "/gallery/gallery-03.jpg", alt: "Fleet vehicle in service", category: "Fleet" },
  { id: "gallery-04", src: "/gallery/gallery-04.jpg", alt: "Fleet vehicle in service", category: "Fleet" },
  { id: "gallery-05", src: "/gallery/gallery-05.jpg", alt: "Interior of a Tempo Traveller coach", category: "Fleet" },
  { id: "gallery-06", src: "/gallery/gallery-06.jpg", alt: "Fleet vehicle on a trip", category: "Fleet" },
  { id: "gallery-07", src: "/gallery/gallery-07.jpg", alt: "Tempo Traveller parked on a trip", category: "Fleet" },
  { id: "gallery-08", src: "/gallery/gallery-08.jpg", alt: "Fleet vehicle in service", category: "Fleet" },
];

// A handful of destination shots, folded in for visual variety.
const destinationHighlights = [
  { id: "dest-ooty", src: "/images/destinations/ooty.png", alt: "Ooty, Tamil Nadu", category: "Destinations" },
  { id: "dest-coorg", src: "/images/destinations/coorg.png", alt: "Coorg (Madikeri), Karnataka", category: "Destinations" },
  { id: "dest-mysore", src: "/images/destinations/mysuru.png", alt: "Mysore Palace, Karnataka", category: "Destinations" },
  { id: "dest-nandi", src: "/images/destinations/nandi-hills.png", alt: "Nandi Hills, near Bangalore", category: "Destinations" },
];

export const galleryItems = [...galleryImages, ...destinationHighlights];

export const galleryCategories = ["All", ...new Set(galleryItems.map((i) => i.category))];
