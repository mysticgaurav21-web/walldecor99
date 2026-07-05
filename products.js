// Walldecor99 — Product & Category data
// This file is the "source of truth" for the live site.
// The Admin Panel edits a working copy in this browser (localStorage).
// When you're happy with changes, use Admin → Export to download an
// updated products.js, then upload it to your hosting to replace this file.

window.CATEGORIES = [
  { slug: "pvc-panel", name: "PVC Panels", subcategories: ["Plain Panel", "Printed Panel", "Marble Design Panel", "Wooden Design Panel"] },
  { slug: "wallpaper", name: "Wallpaper", subcategories: ["Roll Wallpaper", "Customized Wallpaper"] },
  { slug: "glass-film", name: "Glass Film", subcategories: ["Frosted Film", "Designer Film", "One-Way Film", "Colored Film"] },
  { slug: "artificial-grass", name: "Artificial Grass", subcategories: [] },
  { slug: "3d-panels", name: "3D Panels", subcategories: [] },
  { slug: "mosaic-tiles", name: "Mosaic Tiles", subcategories: [] }
];

window.PRODUCTS = [
  { id: "p1", name: "Classic White PVC Panel", category: "pvc-panel", subcategory: "Plain Panel", price: 65, unit: "sq.ft", image: "https://picsum.photos/seed/pvcplain1/600/450", description: "Smooth matte-white PVC wall panel, waterproof and easy to clean.", tag: "" },
  { id: "p2", name: "Floral Printed PVC Panel", category: "pvc-panel", subcategory: "Printed Panel", price: 85, unit: "sq.ft", image: "https://picsum.photos/seed/pvcprint1/600/450", description: "High-definition floral print fused on durable PVC board.", tag: "New" },
  { id: "p3", name: "Italian Marble PVC Panel", category: "pvc-panel", subcategory: "Marble Design Panel", price: 95, unit: "sq.ft", image: "https://picsum.photos/seed/pvcmarble1/600/450", description: "Realistic marble-vein finish, ideal for living rooms and lobbies.", tag: "Best Seller" },
  { id: "p4", name: "Teak Wood Grain Panel", category: "pvc-panel", subcategory: "Wooden Design Panel", price: 90, unit: "sq.ft", image: "https://picsum.photos/seed/pvcwood1/600/450", description: "Warm wood-grain texture without the maintenance of real wood.", tag: "" },

  { id: "p5", name: "Damask Roll Wallpaper", category: "wallpaper", subcategory: "Roll Wallpaper", price: 45, unit: "sq.ft", image: "https://picsum.photos/seed/wproll1/600/450", description: "Classic damask pattern roll wallpaper, easy peel-and-stick install.", tag: "" },
  { id: "p6", name: "Botanical Roll Wallpaper", category: "wallpaper", subcategory: "Roll Wallpaper", price: 48, unit: "sq.ft", image: "https://picsum.photos/seed/wproll2/600/450", description: "Fresh botanical print, great for bedrooms and cafes.", tag: "New" },
  { id: "p7", name: "Custom Photo Wallpaper", category: "wallpaper", subcategory: "Customized Wallpaper", price: 70, unit: "sq.ft", image: "https://picsum.photos/seed/wpcustom1/600/450", description: "Send us your design or photo — we print it to your wall size.", tag: "Made to Order" },
  { id: "p8", name: "Custom Kids Room Wallpaper", category: "wallpaper", subcategory: "Customized Wallpaper", price: 72, unit: "sq.ft", image: "https://picsum.photos/seed/wpcustom2/600/450", description: "Personalised theme wallpaper for kids' rooms, any character or colour.", tag: "Made to Order" },

  { id: "p9", name: "Frosted Privacy Film", category: "glass-film", subcategory: "Frosted Film", price: 40, unit: "sq.ft", image: "https://picsum.photos/seed/gffrosted1/600/450", description: "Soft frosted finish for privacy without blocking light.", tag: "" },
  { id: "p10", name: "Geometric Designer Film", category: "glass-film", subcategory: "Designer Film", price: 55, unit: "sq.ft", image: "https://picsum.photos/seed/gfdesign1/600/450", description: "Etched geometric pattern film for partitions and doors.", tag: "" },
  { id: "p11", name: "One-Way Mirror Film", category: "glass-film", subcategory: "One-Way Film", price: 60, unit: "sq.ft", image: "https://picsum.photos/seed/gfoneway1/600/450", description: "See out, not in — popular for street-facing windows.", tag: "" },
  { id: "p12", name: "Amber Tint Colored Film", category: "glass-film", subcategory: "Colored Film", price: 50, unit: "sq.ft", image: "https://picsum.photos/seed/gfcolor1/600/450", description: "Warm amber tone film for a cosy, boutique feel.", tag: "" },

  { id: "p13", name: "Premium Artificial Grass 25mm", category: "artificial-grass", subcategory: "", price: 55, unit: "sq.ft", image: "https://picsum.photos/seed/grass1/600/450", description: "Dense, soft-touch synthetic grass for balconies and lawns.", tag: "Best Seller" },
  { id: "p14", name: "Artificial Grass 35mm Thick", category: "artificial-grass", subcategory: "", price: 70, unit: "sq.ft", image: "https://picsum.photos/seed/grass2/600/450", description: "Extra-thick pile for a lush, natural lawn look.", tag: "" },

  { id: "p15", name: "Brick Effect 3D Panel", category: "3d-panels", subcategory: "", price: 110, unit: "sq.ft", image: "https://picsum.photos/seed/3dpanel1/600/450", description: "Textured brick-effect 3D wall panel for accent walls.", tag: "New" },
  { id: "p16", name: "Diamond Cut 3D Panel", category: "3d-panels", subcategory: "", price: 120, unit: "sq.ft", image: "https://picsum.photos/seed/3dpanel2/600/450", description: "Faceted diamond pattern that plays with light and shadow.", tag: "Best Seller" },

  { id: "p17", name: "Classic Blue Mosaic Tile", category: "mosaic-tiles", subcategory: "", price: 130, unit: "sq.ft", image: "https://picsum.photos/seed/mosaic1/600/450", description: "Hand-set glass mosaic in ocean-blue tones, ideal for kitchens & bathrooms.", tag: "" },
  { id: "p18", name: "Gold Fleck Mosaic Tile", category: "mosaic-tiles", subcategory: "", price: 150, unit: "sq.ft", image: "https://picsum.photos/seed/mosaic2/600/450", description: "Luxury gold-fleck mosaic for feature walls and backsplashes.", tag: "New" }
];
