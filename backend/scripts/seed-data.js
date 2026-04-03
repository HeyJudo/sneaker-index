const categories = [
  {
    name: "Running",
    slug: "running",
    description:
      "Performance-driven silhouettes built for pace, endurance, and engineered comfort.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9tTJxEZZsngJ4feFg2ZFOpwa7xTJePe4nH63obLsnSUC5l3lfvzfy8vXDAq0grnerVR69SM5wVFas3x2vS-6zPEqzz7eRpGUSknN0jBKa3fOJ6QfxHCefA5lDcdiwVZ6-YDlDMJdELh1A_NvjSpU3XhWN6XliRGDlnqJUKhTdmuRur8KsC9Pr61Ccm1qixxUpJLMrQJmnXvOjfWi-8ijnOXcpItqjJ5X-LpeTlk4EMdT0vaOMY9S-e6LOHvDKpVRCNeiR_oXoIJY",
    isFeatured: true,
  },
  {
    name: "Basketball",
    slug: "basketball",
    description:
      "Court-rooted icons with archival attitude and statement-making presence.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD217JuUDGF3qVBGsJRNacLfMScKYsQdmTtd3DrRw8EKjJ3apf_jEbgA7aklIYGVGu1pn6Eo5Zup8HPhKwLrJPMG4-g3T1YTKzHGwB_CJYVcfiRCNvWoWIAwIkgHe_y5d8mqrVR7gm9CtHb2QZjIERmFZVITylRFOTcN45ZuaSJAlBekQ_0qukT4SBBYxHl9wJTUuSkl3zFR2GdGvV94WiNiJa1qegYVV1o8jFJO7u1xnOyUxmpIZLX4TDb9OONmhMXu4qExq0TdLY",
    isFeatured: true,
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    description:
      "Daily-wear staples curated through a luxury editorial lens.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBHpGJj0XWVfSsaAE1APLmOFTcPuDn_NzRItoL_2OHtHqm62OcLd-40mFmVcrh3UtOJfAkR9tz3HnNqLSkIsT0SqTCYUEZoHIyoKrN_wfXyna_9ASRvLjCmQCx-Wf14k6g5hfyNUgWOHxBBokZJTGu1KjYStznoFOmPfTNZ5dp_hJTBZYJytunWFl7dB3beYsLdv8g3HpAsLYKSZ8wEvT6cI4TIIsxnnhZE3aPfKp7Pm_eS3wpHAGcsuZ0qW_yQZd2IfqNl52EOOF8",
    isFeatured: true,
  },
  {
    name: "Outdoor",
    slug: "outdoor",
    description:
      "Grip-heavy, weather-ready footwear for elevated off-grid movement.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1dw1QbvICT7X2_oo-DiqEKiuTI_JSrUJ_QDcXf_nZvggtlH9zBLCV4j0EgwwlH_ASDUW94fTQ7WzLC3d_NtrpmPl-G1Se4Ux_97w4W2ancyAHCEiLncB9TP0QN2melo2-SIJD1N1ch6agsopbagLKddL-m5hkjJ__kl-Vua9QR54sKhOTaVMrzcl0t6Eh4-H52vKLyaPXuCmNLX8WZ4_P1n-KSZr5jKafPmut89pXDMs60-iVjBUpvCSUhvvLrd2ZVNdAWX2fBjw",
    isFeatured: false,
  },
  {
    name: "Training",
    slug: "training",
    description:
      "Versatile cross-functional pairs balancing support, agility, and durability.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSEhs6-2aMuXfcmSZSr5F4c4DKEDEQrESUtgZggD5PzobbrBeZ0VxyTX1yHzhXjHR-eU_KzCEpsC9Ek6Ltqv2ej3QtrS-BA9Vbb7J_zJg9CFT9QqENB6zo5Ki5IXj8n4aZ28hFQxkUhkLFObUI2gZflsKiK6WAjdvzILwKBQnpdA4xnOVXdNmbEl3Tfxji3iDp3dxB5AGbD_UfL7jBNoZTWeaMtNHkeCqbu2oFwKcKpKcXgvpqrdQ1NDkyZL639_Kcwu3k4V_Bvbo",
    isFeatured: false,
  },
  {
    name: "Skate",
    slug: "skate",
    description:
      "Minimal, low-slung silhouettes with grip, board feel, and cultural edge.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgwPV7Cs9e-io4lysSjfzv-R63kpZX4Pp3KSRKRDqFQitdfnOiaz6BV8Aw--qEHPBfM7YpstquRs4KY0JBRT--cmTduDzfoFqnbeZYnFFJrQwt3MyleF0mdG1Q6xNF4QEAqPu9CmbOVjI4D44TGjNuGX4fUNt6Xst3RFlOb8pDil1XOf6-hKspHXUFb69orRDyUR5jGRjh1rUbrxa5LlioJecg6kaRggj6VPedbQnBQxJ8UC_1lMeg_5rrwOKqYlTgqxEQPUGge9I",
    isFeatured: false,
  },
];

const products = [
  {
    name: "Air Max Pulse",
    brand: "Nike",
    categorySlug: "running",
    description:
      "A modern Nike runner shaped for the urban collector, balancing sculpted cushioning with a crisp, cobalt-led visual profile.",
    price: 160,
    compareAtPrice: 190,
    tags: ["featured", "editorial", "running"],
    sizes: [
      { label: "8", stock: 6, sku: "AMP-8" },
      { label: "9", stock: 8, sku: "AMP-9" },
      { label: "10", stock: 5, sku: "AMP-10" },
      { label: "11", stock: 3, sku: "AMP-11" },
    ],
    colors: [
      { name: "Cobalt White", hex: "#DDE1FF" },
      { name: "Midnight", hex: "#0D1B4B" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXrqAUNKItQswVa23_XrGuevEmumuua7DpT8o0p8o9OVuq64uRw64i5Td5ssB98lReqrhVeM9oJVsOYvUIl0YpN6kH3H1tf1VmvoR-dMt8rDFifXYcwL4QWK67iTXu7xUa26wHuLbzEtPLnUJZ0D4AdqgJWod2w9drSuxBwjRvEaF3xYFaMQWEMCKQRKyOKdEVBG42KYp4krNSvbjbOpBqzqWn4JwEh3ksy2rM-wpjHVRQSPoOLuwg4shXMBiDFkdLIL-qGdCkMR8",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARXT_pBKFkSLeNM49YIX35tMU7Gl0mFayG8xrSgQAW8aSewwMu8SorzOPkFOAPIl_0R2ZtkwV9k3OZZKc5OToTOefQJxUOGQ0Vs6X7gLCByErpOtFvw6nc8lTtUsI4xoMoBUojhZmWAm9n1BWHNUb4JSP6bRaQGJEwYcnJjZodJK7CS6t2xV8jtQRYwWzFp_31Yf6S59DUXqFGdHuVb2DOKCd3xeqdutyUuso1Pusb0yBVXWK6CK0lQ2D7bMj1DpGCvgYKjOL7OlY",
    ],
    rating: 4.6,
    reviewCount: 82,
    stockStatus: "in-stock",
    isFeatured: true,
    isArchived: false,
    seoTitle: "Air Max Pulse | Sneaker Index",
    seoDescription:
      "Discover the Air Max Pulse, a sculpted urban runner curated by Sneaker Index.",
  },
  {
    name: "Samba OG",
    brand: "Adidas",
    categorySlug: "lifestyle",
    description:
      "The low-profile terrace classic, recontextualized as an editorial everyday staple with timeless linework and sharp restraint.",
    price: 100,
    compareAtPrice: 120,
    tags: ["featured", "lifestyle", "classic"],
    sizes: [
      { label: "7", stock: 4, sku: "SOG-7" },
      { label: "8", stock: 9, sku: "SOG-8" },
      { label: "9", stock: 7, sku: "SOG-9" },
      { label: "10", stock: 6, sku: "SOG-10" },
    ],
    colors: [
      { name: "Core White", hex: "#FFFFFF" },
      { name: "Black Gum", hex: "#181C20" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPZ2UE3l0DtI9bJckcfptNx21Zl1zAaRP-6Il4J1PatXDE7sFxGjc0NOnHFcHBLM29J5--DPCkFZjYk3RXiBW_lgq27pdrZTBM4SqssJS50yGTdNwX4JB8oYDtACJQDlPbkfma60dnR4h4gCLCl-ob6cYpWbTEXpz1Ps2MJomxztLLhmD9jDUnm6-gkXUxL8SocMqvvEq0ZXvkB5dsCbxlUrpRrltH443frz7HCmkpXxvWMuRlr2lV2-do3hxVQc4ZntZ29TyjBf8",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7EcdCCd1yJ8X5E_H1y4uPvVMTxByMgoqVRQDXVlmFYc2tALvvFAbZu8-GjV9_AcP1SWwOvSmTFAYjgNyDZQYs9siHtHYD0GvKoOw4i641x_xgQ2vSYQP9-02pAqX4DRxLn1y4J16HkWgbXmF_NwezE-sqHREjBDT9v5dP_qpXDDiVhj1Ge2FUzSWVE9YOob2uvoz3DXh9euRyNcsgvP1ikVjcWtGLkDBq9ODBznmDQwmzxni3tdwvVDvSwv_emQOteK56vV0Nkvg",
    ],
    rating: 4.8,
    reviewCount: 114,
    stockStatus: "in-stock",
    isFeatured: true,
    isArchived: false,
    seoTitle: "Samba OG | Sneaker Index",
    seoDescription:
      "Shop the Adidas Samba OG, an understated icon curated for modern daily wear.",
  },
  {
    name: "2002R Protection",
    brand: "New Balance",
    categorySlug: "lifestyle",
    description:
      "A deconstructed suede-and-mesh runner that blends archival comfort with collector-grade texture and presence.",
    price: 150,
    compareAtPrice: 180,
    tags: ["new-balance", "featured", "lifestyle"],
    sizes: [
      { label: "8", stock: 5, sku: "2002R-8" },
      { label: "9", stock: 6, sku: "2002R-9" },
      { label: "10", stock: 2, sku: "2002R-10" },
      { label: "11", stock: 1, sku: "2002R-11" },
    ],
    colors: [
      { name: "Rain Cloud", hex: "#D1D5DB" },
      { name: "Slate Grey", hex: "#6B7280" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBHn8VY8URw3QzKLTeumInj3OBU9BxmqnMlC4xqy97MeCGTWMzVHbNVbGabDVwpwLIH4DxtwNhpMxXIEujAVAt4LkunRudgGqRAfBiLlLFWY8NNjsFjM9sJZQT04JLJeLwTdp7RBDtLIF7BEKhf2O--r42JcbXB07nmxD7woW9aW4R8QFr4M6PGCnuxASQTddT7H7pMrMT3RlLuLf-IpYSgC9cO2r_63z-izgfM1-9p51BkaDREYHrskK_VV6HPrvDtWav9HNIv6B0",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA-Iykp5dYblfvxamED2dnvSbAEts2-twL-OvEdDJnIhx6waGxISs6olZXdOBEKiCkA53QhY93WTpqphIvumzO23ZRtJAHoXMHCIHnaglKIDDbvR88-lWaLZ8Lln5nXPx2cfNY7dYRTUu1C6stVkc1UFnBHcaxX5gMJHKT0j49v73bPKnvWEj3ffqWGr6jUwUVcmUjxajn3SnTt6T3O8LPmE21VO0t2x4jrWKmsb63w6qLdBqbYQR7aaCvh_L_K0ZQ_Shuz7Q3s8pc",
    ],
    rating: 4.7,
    reviewCount: 67,
    stockStatus: "low-stock",
    isFeatured: true,
    isArchived: false,
    seoTitle: "2002R Protection | Sneaker Index",
    seoDescription:
      "Explore the New Balance 2002R Protection Pack with layered texture and archival energy.",
  },
  {
    name: "Clyde All-Pro",
    brand: "Puma",
    categorySlug: "basketball",
    description:
      "A lightweight court silhouette tuned for speed, cut with a sharper high-fashion stance than typical performance footwear.",
    price: 130,
    compareAtPrice: 155,
    tags: ["basketball", "performance", "puma"],
    sizes: [
      { label: "8", stock: 8, sku: "CAP-8" },
      { label: "9", stock: 7, sku: "CAP-9" },
      { label: "10", stock: 6, sku: "CAP-10" },
      { label: "11", stock: 4, sku: "CAP-11" },
    ],
    colors: [
      { name: "White Royal", hex: "#DDE1FF" },
      { name: "Graphite", hex: "#374151" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARXT_pBKFkSLeNM49YIX35tMU7Gl0mFayG8xrSgQAW8aSewwMu8SorzOPkFOAPIl_0R2ZtkwV9k3OZZKc5OToTOefQJxUOGQ0Vs6X7gLCByErpOtFvw6nc8lTtUsI4xoMoBUojhZmWAm9n1BWHNUb4JSP6bRaQGJEwYcnJjZodJK7CS6t2xV8jtQRYwWzFp_31Yf6S59DUXqFGdHuVb2DOKCd3xeqdutyUuso1Pusb0yBVXWK6CK0lQ2D7bMj1DpGCvgYKjOL7OlY",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEJgr3UO6VXwYArOPAeVj1EGpkwGtOeTyxI6DWp-O0yw8bLUVFfxqlWV2b6R4eziQ9C7zTRJQe1W9FiNUGHJ942D9howjU3RXtZDzlLOCihTcPPVK-3E2goZzWu6jZPyqTHUwQ6MT_41OIMh7bAvX1ojAda3LD-H-8n-x8ek06oNkYDrdH_tGtzDDAnuyh_Rv9kY86PsSu5ElNI4VJ9tii8VJZdKztRY4b0yEWqs0OODwigvv6iQcm3sDXNFqrvgT-gQcqqqfV3NE",
    ],
    rating: 4.4,
    reviewCount: 41,
    stockStatus: "in-stock",
    isFeatured: false,
    isArchived: false,
    seoTitle: "Clyde All-Pro | Sneaker Index",
    seoDescription:
      "Discover the Puma Clyde All-Pro, a lightweight basketball silhouette with editorial edge.",
  },
  {
    name: "Question Mid",
    brand: "Reebok",
    categorySlug: "basketball",
    description:
      "An unmistakable hardwood classic elevated through premium materials and a collector-first presentation.",
    price: 170,
    compareAtPrice: 200,
    tags: ["basketball", "archive", "reebok"],
    sizes: [
      { label: "8", stock: 3, sku: "QM-8" },
      { label: "9", stock: 5, sku: "QM-9" },
      { label: "10", stock: 4, sku: "QM-10" },
      { label: "11", stock: 2, sku: "QM-11" },
    ],
    colors: [
      { name: "Chalk Red", hex: "#FFFFFF" },
      { name: "Vector Navy", hex: "#1E3A8A" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9Ltvx6Qw4Tk2EIq86ey-wRUcA0CxQ9nl4_daUBBHyspQN6WAis8oZ-OzL6OKKjJXmIpAGpqvHhJhPnKivyNj-sCkZueg2Wjvu6WngOIBgjtFHhizdfvfDJ9_zkIM6aDU0-3f7Ex0Blnd89Mh31f71UIBhllvwB3qPhOsjD4yY_f0ch0eTeIPyKOVJxq8oB4EaFsJmi6561NHbYfBpV6QUhPAW7_rGtu84AU4h4-L4UGVhvMcUL79s99w4m4R8GxN5ng7f3DGnUq5Gw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhSOgXDHiVeoQe8suu00YH-8omQsKayRq6LtcYB8tjlDNZRkOAXgubZzGvTemE-0FzmVjSin8MOKOZiUQgNBTWS13ei8FyIHNB-8kDjhr7VX9tMa-lHtrw3d5GZKLclHKntJoerGFnSdouBvepdPpjpp-PdbhN7Ok_5irQWSJCA7s1Pqb_3eYATza5MmPs4_z2G_JSxOY8_IOnR4yyGV6tTreF98-utBWzHou9hddhsD7TJsa6E2zcouCDvcb3h4a-1Uh2DZ74Zw0",
    ],
    rating: 4.5,
    reviewCount: 36,
    stockStatus: "low-stock",
    isFeatured: false,
    isArchived: false,
    seoTitle: "Question Mid | Sneaker Index",
    seoDescription:
      "Browse the Reebok Question Mid, a court legend curated for the modern archive.",
  },
  {
    name: "Chuck 70",
    brand: "Converse",
    categorySlug: "skate",
    description:
      "A sharper, heavier-built interpretation of the canvas icon, suited for both board culture and daily uniform dressing.",
    price: 85,
    compareAtPrice: 95,
    tags: ["skate", "converse", "classic"],
    sizes: [
      { label: "7", stock: 10, sku: "C70-7" },
      { label: "8", stock: 12, sku: "C70-8" },
      { label: "9", stock: 11, sku: "C70-9" },
      { label: "10", stock: 8, sku: "C70-10" },
    ],
    colors: [
      { name: "Black Canvas", hex: "#181C20" },
      { name: "Parchment", hex: "#F5F5DC" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgwPV7Cs9e-io4lysSjfzv-R63kpZX4Pp3KSRKRDqFQitdfnOiaz6BV8Aw--qEHPBfM7YpstquRs4KY0JBRT--cmTduDzfoFqnbeZYnFFJrQwt3MyleF0mdG1Q6xNF4QEAqPu9CmbOVjI4D44TGjNuGX4fUNt6Xst3RFlOb8pDil1XOf6-hKspHXUFb69orRDyUR5jGRjh1rUbrxa5LlioJecg6kaRggj6VPedbQnBQxJ8UC_1lMeg_5rrwOKqYlTgqxEQPUGge9I",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCe9yWziD2Mnuni3dFEEVS26VG7MxHoD5pIBUNVIi7gPSItFPdOJ4cSHQLnFJacqjoFJdvS-6ZM16oFMZqxBow6bOsq-Nqv_vL9jswiWipGwwon9-GqeGbcnlA7Hvo1NRxx4i_Bl0-4_eS6pggKKYAtFBFi7ssWmbvpdGXbL3Gb6Y2Q1xaOhECsNTgQch_lYwOk-XbxvOzDpIcMbKUhLPzeCpdok0XJI2NbQHq347SiygIafwTLUALEJw7EZFrpBvWxDyxJer-V9E0",
    ],
    rating: 4.3,
    reviewCount: 58,
    stockStatus: "in-stock",
    isFeatured: false,
    isArchived: false,
    seoTitle: "Chuck 70 | Sneaker Index",
    seoDescription:
      "Shop the Converse Chuck 70, a heavier-built icon with enduring low-key appeal.",
  },
  {
    name: "Zoom Vomero 5",
    brand: "Nike",
    categorySlug: "running",
    description:
      "Technical mesh layering, rich panel density, and cushioned underfoot comfort make the Vomero 5 a contemporary archive essential.",
    price: 160,
    compareAtPrice: 185,
    tags: ["running", "nike", "archive"],
    sizes: [
      { label: "8", stock: 7, sku: "ZV5-8" },
      { label: "9", stock: 9, sku: "ZV5-9" },
      { label: "10", stock: 6, sku: "ZV5-10" },
      { label: "11", stock: 4, sku: "ZV5-11" },
    ],
    colors: [
      { name: "Photon Dust", hex: "#E5E7EB" },
      { name: "Blue Tint", hex: "#93C5FD" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAEDmtm2eVXVl0UY5TCmRZIJ-ekzDyBiQk0cXjTr7u9lClwug58UUUfjqkFLKRuyFlkbQz5VID_MYxUWjchH23ussAaLA3RCjs3cij9rL9tv2fnuFvu9JRZoPvxjZREs2VlC2rLD4_wO1QhqChsYeDEFVUXQhmIEab6eB0nI7oM0uWFss1fwW_kIcjRT_aXNryGAAiWYEOwo0WlvZG0pCYBrDxNxbLD_2oMyZ80J0cVOsmiKswoZPTB4zW8EB38xCdWfx-7GyE2ps",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhNWk_XZW4ngk4bXCNI2AeJZpd6FqAnEWwnz9lzgCiBd3MsXgj2Hp15oEhukkOi3UBkMSuU7LgfHDLK7YjKjB4rlnt43fO8n6oefR9R-eYcZwJPINAhpPSVEZqfuHpHSPeJu-zq-KgF3o9B-qcYuo9DukmdOXpylgG5LgFz971ac9MOOJIGpZzJ3ZE1FKCKjHB6RkN1SSJkG1_ZdIcwVks-Wf-NdoiBZicRpQRFw4FmVQAP31lEIOTz6v9TcUtPEDdK9hSEGiSWG8",
    ],
    rating: 4.9,
    reviewCount: 93,
    stockStatus: "in-stock",
    isFeatured: true,
    isArchived: false,
    seoTitle: "Zoom Vomero 5 | Sneaker Index",
    seoDescription:
      "Discover the Nike Zoom Vomero 5, a layered technical runner with archive energy.",
  },
  {
    name: "Forum Low",
    brand: "Adidas",
    categorySlug: "basketball",
    description:
      "A low-cut reworking of a hardwood staple, balancing retro structure with effortless daily wearability.",
    price: 110,
    compareAtPrice: 130,
    tags: ["basketball", "adidas", "retro"],
    sizes: [
      { label: "8", stock: 6, sku: "FL-8" },
      { label: "9", stock: 5, sku: "FL-9" },
      { label: "10", stock: 5, sku: "FL-10" },
      { label: "11", stock: 3, sku: "FL-11" },
    ],
    colors: [
      { name: "White Blue", hex: "#DBEAFE" },
      { name: "Cloud White", hex: "#FFFFFF" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC0aWnfjiDDSc4U5Tvokjbvge2OzCVyL3nH3EvfRbj24qOs1iymM60Cv0v6zipVVNO86VL1zxrYiN6pCLMocmSsvEsiYi3H-Qq65V01B6GMIGjN8dk1FWEW2UT8WeJOP5Q8HWgYni4o-H-FmIDy1MY0GHqGYIArbfmmO0099ZAZ-Q8IoFdrIzGdLwfQUaEGP8KGHvQV5BSc4Wst8inwgcXGv8CWXBUTwrMNrwsUX9EwoVgxJtGKeJHYul0l6DkVW3iw0q6D1r8lfS8",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAZsIf7d2d6toMMFRXtcGqkOSSmeM0Oy3xfmxvMMFKdyWx6uL4VwwjkVBJ8eiB-anyJRQJOJL6pmKCbKhl247N9vPPkSd9JzR9WQGZ0ud4zuyEvsP93IOop6GVik4558tRG6MXNpOCVSoXvCL2AjCYtA31swAy4p6hebLmBKhSLw-3JU3IWWzvaOFP82YRUvUJk_NQ-UieIi0PgHm0LSkNaMGkcXGpN_0QLNzeH2eTy8S5A9QHQyBmRiUq_OYyRg48EpLEqpDu_iNE",
    ],
    rating: 4.4,
    reviewCount: 44,
    stockStatus: "in-stock",
    isFeatured: false,
    isArchived: false,
    seoTitle: "Forum Low | Sneaker Index",
    seoDescription:
      "Explore the Adidas Forum Low, a retro basketball silhouette with modern daily appeal.",
  },
  {
    name: "Dunk High Retro",
    brand: "Nike",
    categorySlug: "basketball",
    description:
      "A court-born classic with high-top authority, curated here as a statement piece for archive-minded collectors.",
    price: 560,
    compareAtPrice: 620,
    tags: ["archive", "nike", "basketball", "vault"],
    sizes: [
      { label: "8", stock: 2, sku: "DHR-8" },
      { label: "9", stock: 2, sku: "DHR-9" },
      { label: "10", stock: 1, sku: "DHR-10" },
      { label: "11", stock: 1, sku: "DHR-11" },
    ],
    colors: [
      { name: "Archive Blue", hex: "#1D4ED8" },
      { name: "Panda", hex: "#111827" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDUlsCuk960Jq3l9V7oV0mjTQEcLaFUGcAt6p2s5DR2NOVDWyjjl-EDCENdOnZY0L9rPc8Hz3L7PscBBrgSf9s9w0TLQrugKzyF62Ljjalg3D9uVChsI37W7V1nksX_OMvjKnYr_6tVcUnPOT44FJFDTcrMEEJGoqSMQO2QyQJ2lCfmxZYpqJtEaGg6VLeSV8ak2_4i-D6B2EW5Wlq80RXrqUG45O-BgisnsZgfB6S6AU37Z3k2Y7t0Zb_GmbUkdooRuKi8CVQ2N2k",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNoqt0FpUiF8qon7CSY6Y2dTxAKIsJUUPUcXWlq4ipYLahMO_AJ1f8VMwLlNtpnAO4Cmusi7rewn1Qfdp2j5YWIyUjZRWVLpRxQASwio9EtcmyrCYFBeVprhp2LhocEQoTDjcpxuhvPjP-HGI5uJ1RvPnJvnyhVMJKUQrkYO-vmI7LajAPeXxKsY9n_DUgqVTFU9MdGv2qUA0cJRpnz2Co26vwO3heSLKGD0LM0IMlS7xVv_o3lLqnRhikBE1PWNPI4akwgg7RT1Q",
    ],
    rating: 4.8,
    reviewCount: 28,
    stockStatus: "low-stock",
    isFeatured: false,
    isArchived: false,
    seoTitle: "Dunk High Retro | Sneaker Index",
    seoDescription:
      "Shop the Dunk High Retro, a high-top archive classic with collectible presence.",
  },
  {
    name: "Air Jordan 1 85",
    brand: "Jordan Brand",
    categorySlug: "basketball",
    description:
      "A meticulous high-top icon carrying original-era proportions and the kind of presence that anchors any curated rotation.",
    price: 1250,
    compareAtPrice: 1400,
    tags: ["vault", "jordan", "archive", "basketball"],
    sizes: [
      { label: "8", stock: 1, sku: "AJ185-8" },
      { label: "9", stock: 1, sku: "AJ185-9" },
      { label: "10", stock: 1, sku: "AJ185-10" },
    ],
    colors: [
      { name: "Bred", hex: "#7F1D1D" },
      { name: "Royal", hex: "#1D4ED8" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNoqt0FpUiF8qon7CSY6Y2dTxAKIsJUUPUcXWlq4ipYLahMO_AJ1f8VMwLlNtpnAO4Cmusi7rewn1Qfdp2j5YWIyUjZRWVLpRxQASwio9EtcmyrCYFBeVprhp2LhocEQoTDjcpxuhvPjP-HGI5uJ1RvPnJvnyhVMJKUQrkYO-vmI7LajAPeXxKsY9n_DUgqVTFU9MdGv2qUA0cJRpnz2Co26vwO3heSLKGD0LM0IMlS7xVv_o3lLqnRhikBE1PWNPI4akwgg7RT1Q",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhSOgXDHiVeoQe8suu00YH-8omQsKayRq6LtcYB8tjlDNZRkOAXgubZzGvTemE-0FzmVjSin8MOKOZiUQgNBTWS13ei8FyIHNB-8kDjhr7VX9tMa-lHtrw3d5GZKLclHKntJoerGFnSdouBvepdPpjpp-PdbhN7Ok_5irQWSJCA7s1Pqb_3eYATza5MmPs4_z2G_JSxOY8_IOnR4yyGV6tTreF98-utBWzHou9hddhsD7TJsa6E2zcouCDvcb3h4a-1Uh2DZ74Zw0",
    ],
    rating: 5,
    reviewCount: 19,
    stockStatus: "low-stock",
    isFeatured: true,
    isArchived: false,
    seoTitle: "Air Jordan 1 85 | Sneaker Index",
    seoDescription:
      "Discover the Air Jordan 1 85, a collector-grade icon curated for archive enthusiasts.",
  },
  {
    name: "Nike Initiator Class 2.2",
    brand: "Nike",
    categorySlug: "running",
    description:
      "The definitive silhouette for the digital curator, combining layered technicality with a disciplined cobalt-and-neutral palette.",
    price: 125,
    compareAtPrice: 160,
    tags: ["running", "editorial", "featured", "pdp"],
    sizes: [
      { label: "8", stock: 5, sku: "NIC22-8" },
      { label: "8.5", stock: 4, sku: "NIC22-85" },
      { label: "9", stock: 6, sku: "NIC22-9" },
      { label: "9.5", stock: 3, sku: "NIC22-95" },
      { label: "10", stock: 2, sku: "NIC22-10" },
      { label: "10.5", stock: 2, sku: "NIC22-105" },
      { label: "11", stock: 0, sku: "NIC22-11" },
      { label: "11.5", stock: 1, sku: "NIC22-115" },
      { label: "12", stock: 1, sku: "NIC22-12" },
      { label: "13", stock: 1, sku: "NIC22-13" },
    ],
    colors: [
      { name: "Light Bone", hex: "#E5E4E2" },
      { name: "Slate", hex: "#94A3B8" },
      { name: "Cobalt", hex: "#00289C" },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAV58PYLP6Pt2Stc-b24QpTWhC5Z5OS56NXxZ4VU-qhoQuOvezesNWKGizoakxucGC9B39WT-NMWfGxUZuUwM7NMhF6vFz-kcWrvr89I1wioDCCWYXOquOoCUeraImcarP6bgb5sY-2B3BWXnAvOg5DXNxklvuCW_2eLVHo7f7yBfOGU7H4zy8h2Zc3ZEdUye31YT0AIp8Ms5TtPYMqR12DbWNp56lDCjEykaxaggl3STeDeIO6dNdljXEhM2Zz8XNS97D3T3wmNas",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEzHFks6iVF-1gb4_WyofLkY-s5i_m7IpzVIHhS4Ib6XAMz6P6m53asMRNUHChI-I42vyUDuBOTTPtszWKYLvQuNAMg0Azd3V5Jkd_STGYqdq49DHMeXGUFFGYEMeNS_w73uD4p--g12niUiYBQHuEOHPmj6yUBr61BipzZ_b5GWA5ddWWjuZfM3Vggfc9P6tctkoRhvj0ZkH6mH6whQzWo5L8wwmdhnc3UuzGR2OhaxHoK3dty2UGPqtVDPF16eHOOb_hMxV9PMo",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2Pwrgyw0C7CE5T-UbpNuiSMQ3OXnYPl038ISmCQBiKRunrypbqVq3ROcYOoypoHunCfeQD7rAJnTucvFfaoyhELVBuK6IJcgHej4JTcCEM_XIrFQNVZZS798cKW-Pq6bjs-AuQcFO-rvMpMTAImtm1npP7rs8Myz0axwf_8NjmkCyrowlwGg6MZy2Ley38utYzKjb9hYUSo6slznPbT37SA1vqY-FNQnVNx5EFvGWZWZ81__6c0E40OjBzV-RLy5qHb0sTD9A3BM",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA0jf4pS5-Mp8ihlHkAYVtwdI2pOhcZcxUbaknj68edlkLRjwNPVFvMxRVkcHZwdkCihr1Mif1dgveymehZjohbpptrGij_t_dO8GWt1CkYoNQnRGw8u_l6HK1wJqOGM3c3kbqMU_76p-Jm1iZz_405OyfoGe6b-KQ-fiwWuIO-3DSC8OS57fmMuiFKpavfTmcjU9guegNAQKLrrUtzwkfyx45dNzBKUCJKsua3dU6ybLmSgpZgtCi4FehLFKwnVmzizM9jTg-mbUg",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmnn7I_U2nj0btrsxLwEmrFxcLLiMyQ2xGx5r326jKOPU-8PfixNMckC8XhacDDwINd3XlQBZvhz396XZUd0TWztgMhc5TX-IQprGbOD_pwh1suB3OpqLqgAVaYj_c8irCSn36AlUi3vZYUQCuQlDAspnS-w1a-PmmJdJVk9pZpbiux7i69Kw0AHOqIZPSJ9JtEi4RVNSt0Ls-q0fckFrzQM09BRH22QjDVdRa2nGLlV138IdKbkabUnqMJMcBzjgfZZo4CqkSQFI",
    ],
    rating: 4.7,
    reviewCount: 128,
    stockStatus: "low-stock",
    isFeatured: true,
    isArchived: false,
    seoTitle: "Nike Initiator Class 2.2 | Sneaker Index",
    seoDescription:
      "Explore the Nike Initiator Class 2.2, the definitive silhouette for the modern digital curator.",
  },
];

const users = [];

module.exports = {
  categories,
  products,
  users,
};
