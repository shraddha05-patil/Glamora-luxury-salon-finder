export interface Salon {
  id: string;
  name: string;
  location: string;
  area: string;
  rating: number;
  reviewCount: number;
  category: string;
  type: string;
  description: string;
  specialties: string[];
  services: Service[];
  image: string;
  images: string[];
  priceRange: string;
  startingPrice: number;
  aiMatch?: number;
  badges: string[];
  contact: {
    phone: string;
    website?: string;
  };
  hours: string;
  availability: string;
  vibe: string;
  coords: {
    lat: number;
    lng: number;
  };
}

export interface Service {
  name: string;
  price: number;
  duration: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  service: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
  slug: string;
  description: string;
  priceRange: string;
  popularServices: string[];
  icon?: string;
}

const coordsByArea: Record<string, { lat: number; lng: number }> = {
  Indiranagar: { lat: 12.9719, lng: 77.6410 },
  Koramangala: { lat: 12.9351, lng: 77.6248 },
  Whitefield: { lat: 12.9698, lng: 77.7500 },
  "HSR Layout": { lat: 12.9116, lng: 77.6476 },
  "Electronic City": { lat: 12.8456, lng: 77.6628 },
  Jayanagar: { lat: 12.9260, lng: 77.5852 },
  "JP Nagar": { lat: 12.9061, lng: 77.5832 },
  "MG Road": { lat: 12.9754, lng: 77.6067 },
  Marathahalli: { lat: 12.9592, lng: 77.6974 },
  Bellandur: { lat: 12.9308, lng: 77.6782 },
};

export const areas = [
  "Indiranagar",
  "Koramangala",
  "Whitefield",
  "HSR Layout",
  "Electronic City",
  "Jayanagar",
  "JP Nagar",
  "MG Road",
  "Marathahalli",
  "Bellandur",
];

export const salonTypes = ["Luxury Salon", "Spa", "Hair Studio", "Makeup Studio", "Nail Studio"];
export const serviceCategories = ["Hair", "Spa", "Facial", "Makeup", "Nails", "Bridal"];

const referenceSalonImages = [
  "https://images.openai.com/static-rsc-4/d7YQAjhxAso_WJQmLFFeRN4WPijJCC9qqSHk5VI2suoAdaL3fWTcN34a8uWVqoXhWLiAJnySZOmFA_Br2D_o1vJsRiADkpnvtBEHDnQUMztSb6R-e40NiluktEr1aBC_fOAdWGlgHZvPkqI-XvMdAG49WtU4J0H0aOAe0CT-mlxM-pE8jeso8H5XGxI7xEUE?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/qdse_oOGu9Hqg0v1pIP8Ef-iIzLjyjG5srQvLxTduIt_VpK15fyTEYD_Z78BIbEoPZp52RWHyrW2XOSfVEDR5Ejk4-2UNesFLj9w6maSwM-aL6_bx7fOEQv8NvkLn8r7fq38WDMVoUwgyIHCFT0KsMsRqf7i_8mKO_GeodWFbZqKVzK8xaf6Mn8vBFqAWrgA?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/ruLzG9ID4veeb5JOjF6NYrlGeJvKpO93waHKYC9OKtbU7OiMXCri7EPxrWS01CgmJDhsgTwhlLPUa6GliZzpN6YE5IhwC5kxA5AT7q-WnCW-7bq3ciIi4gm4pqIUQvLnSjVv5R1_DwUxOXHm0h3MLNPXLJhOBmb5_x9D-3Z4NSqFixqRU3MPHmOOasKvAYd8?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/zNUn16vQ2sv78luca_RQsq2JaTIsGYVzCssEclrPEGu00MF4Do_6rYbZ0oxheTIaKOrS2NTokokiuZoS9dMGS6JkposJIDXnRzWzDQTVbrhS3tuUBEgYB3DKZYnETcYYnbV3HOk1Ce34CIRGnAsgOIwE-gm9_o7ojGoSyZPRpup821_NwoeYc8c5gecO39CW?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/IlkHgUrgHvRIt4G00uoNGH41px3gSUTCVuvuvLD16oFvGstdcaVh_Ol9kIu6Y8FNGPN7jur55Q-s05o_uZGr9NPRFUjiDeLr03p5W1_tjLXs_woLlSkWlvM2TF_tLpc9oRduUIagm49V2esEAmTAS75znjMNZpWq4L3zL_7kf60v04A8YSYM5HinfoHP1qXK?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/fcgpdAoQscT2rbiOZhzbI3PIAzYYA7cqBHCYnSmx-vPkeYsGKjzsruYJYcFkR2wSHpLEgHSd86yahDtA0_IBzX-4Wv8F3GhAoh1K9gaPe3xIf-jzAwwmuU1ufmMpjugDP5jdw_r9BfOKl-k0zmZnROP14mS0kd9jpiAAKEffq6HxeZJxTMfVsM2Tk4M1Tm7k?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/z2I_1aLvm1CLXSw07xNwt9onKYIgnA0NSAsTTfv3o1_cbbj1Q0tyPyxk9PO3E5-X1bzmTBYlT50Kjyjh3n0COGGsPtbqGmrGk2tX7TeP21jwmqlkAkjFblft2QCy-9QMtmzj2XPyQmBLnO4tp0RZv5CqcJQqj6IxDG1g5f3YsgVeKB6BxSnkRJMrtsz4HSAM?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/EVjfx8Ewb6_dzEDC3rCVRyPQtB1YXStPtB3TBBMLOkVtJq8RIhKyyM67ZjaEC4hov9XfnN_O2lVnW54tvSePJoNMs_jJlVivwfoE5YETrYC0xdE745nSmQClEWzvSNHJbRgrAbZy_U6PneXjjuh9i2-AUA040skllb7a8SMMPEAO-EvcQepieGtUB-QZGzAa?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/TW7yMfZdr6TIm4Lg1u3yQRqtGm2Y3xCVqDtT-G1pe7Eo9Z9__LnKHYU9xQmCiuRaKYaLlgfdwV4Ye95W7jG190T2gPXJxvo9twZ1_V3MpUow32ySuhE78bIKVD4IZyzZKVDJY7kX28NNICeNoF9rUc6Jncv94H2-pnxUnDbT5z031kU4zFQWUhpAMAsi1bd3?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/0Uok71prc1ZVcW5JrCNfQQ5xN17PLcRSlmYSOMfp45g0MPGeVCt6OQwtB1V1kLjWlXpjs1UQerhobzFsm2GdDJSfwLMCMlDFJZQbXkNUZ0EB1_lBlomAMJMMoAmvjY21DWjsy1eMPuSSDexBOsCeFtNuV9ZcOtWY1SqSwOIAA6dRSbBY3CFWSaBJjK2p7VnJ?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/zmccbleUy3egybDCcRV0Y2NjS9RcCwkATg8sWyQwFwObZu-8u4284J_aimb-eB8uavfSnhu-ye-ADV05zQLhxMq4S-3M_0t2WKFPTxYvWs-dYIRCyl1XmO3jaFCpCuE0w20ujUpyhpPHl3Zzq-IKnDdk5ZFsz0AYHE8SFM8ujFggEBY9Z4f3nGoMviel_58i?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/nGNeottrpPtg4530QuQRLdlla_TZZB60K0tzhn_Ag1VnaBg6symSylYUzgesXtO7K0Hr_rHWgiNCvXBF1WL-c3pepV0i4L8HGvmWinqByze4gnAFgiLshuO7rWD4UJfMQXQivhPR-lHJwYXUwUyoeiuwDihRVQRnXoDidPbWTNI1rneEdcIes8fd8Bqdfxio?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/ZgSa7Auk1rM8amlY6uOPvgXuoYAPPbrf__x-tKB_HP-3JHLe3WeoLvi--_oCCyYEuNW9_1LOvSc80OC64YaeTzrqx3KpN2m51K6ivnQWj09HXvBmWMW2s1-KkWgo8NTnK0NecEczOfVUR8Y3-QSrKNMpBujKWEsFGcdC6MTbNiHgTRVdhlDwt_SoQbP1OwaG?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/-AXphPLO1sS1rw0KlAuXBBtUfmBiMczpa9FzSYWRWlEfyu97CklkK_fEf-mTicGuPcECW84je7Sk2ieK8hbXYGkkOgTK18sFBCij1KM7ym5HLeFYnw-Kcc1pjFqavzYyvpCf5OFNTiHV6jj9gvaXpt_h0zFsddQqt3_wdbz8mb1btedMcpP5H-SPkrKApn3f?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/SA3xJOTOE1Ofe6pFrp4jR0sbEXqRDRWmAPlxoYyZGefV8mHdbgA-EZ752Kt8SvIjz42DdmO2Y7PAqMdMX1pobb1fESMp3XlRliE49UnwEpv5lpmMX94yEWYsDTEFIHC__EZ-m8HTw6mTvYWsBdG0HXlQ8xbAJJS32fIA02CBe73kNnriMryf10ZDzqUqW8jK?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/BFmuBVBkt11GHJkc9oriN0yB77EH09s0i588wCsOK04aukM4kBJIZRIMQNyl8ZhuYZWA9mfVHouQFAgufes-gfMOOhui2X3HEnwnJOrlz4De7Uw0Ycl4ShNXmNYpXYzMmNzt4ukxmQkerZE7KEH-4T12kC2T5CfwN0DZY_yZUoGdWtAPIekhuBO8k6_FLAAz?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/Pj0qOwl0MnCzhjKqlN03JyLSqimYPgt70IUeZn7_PW2KpXWeO6BpwNOJTova42Z0iH9d-9ZGYhyAQ2-GM7DpFFXOx3n1OAj3bEL5Ipg_d7B-K1KBYC-WKqLfp2tuk_rrYAo2zXWnPSron2jI7PMRFtlsP-YveclVUuEewF-riszU_tg8-qLw37TI1B_qJbMY?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/PS86SMzDDUNfeGCIDSfy29et6ExFf-cuTAq02c23tEvSn59j7oQw6vzoeSHE4R_7QTk8gBtu7ORSn1hIfThGz6PMOrVo9vN8yqShDUm_GRZURLG_Km6gQEG2MOX5b9DLBDUwl2nO1yQkMvxYmpmBuq-o2ek0F_endrdYRKzy78VKyc_LB9LJPSNHbDW7JP9F?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/k2i4tLPVp4Fd0rbSt-NajxU0aTzaoifI91x-qQIFvjL9tuALINBTaG_1CwM-liN8tBJ3b5FgPGbKm_mdZozgwBfiVP1eusiPyIbv0G-Z_i59MaLD8Rp4sXRig9_Y2V2CuRRIH16l4c1ZYC9P8M9juq-j1xwebtomEoIbqyH4QXDP_6uDLvqjbUK-WSMrqpSj?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/A4VjpvGqpHN1kt5DTH-bS1581c7K3xmWS5rBXA3wjHfoDNBo9hJOoLFzSwPiXzRrusPLq-moDnbUiH48quaqK0oAbjwSPqO0zAY6e0iZOsKFN1a3SPrwd7ytYCwwSszSzTW5JZDZQOgv9Ny4TC2pS36l69CmF1wQoOFa6uiqnjFvhjxrqY6fjT4lm4abMzvS?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/JwWj7s5L7FJaBW3S70d2KCmALM_YTModyiAJyx7A5PMNGEKRvfqrIv4jOablbBWpSqFcv-czyKaKm6bZieHL2jVkTO1KX0rnbwoD0LXudFcaeprLKoILc3ia9VEnjplbnCGvZUzki08YArbNxNQYOB14fJWV1GVx6BmZRqTsp8KbaKNya7OVFoUiwhzPBWK1?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/gJ25xxwZRWT1js12eBCaZf43s_jgTCrsCsxYZgqLJ8S0zeNctHsatbFGITYgr04yPLt692gG7aoPmn_yv54JF9ImAI0spFW1VQGGQp1iA_TzO4F4iln2hOLipESkssqxkKOeCoGrqY2eHYxcJA3toZoUpyc89b6a7Q6yCiQlv_Ch7HxjxCek3LWhJPXKERRS?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/o4Ivlje_pOgEOqltAeNDm-uo349difdMvhHbbrXxhqpM8yp-YlUZHcl1FXCTEhIT9UjzZ3aOjFsa8PKzEw80tMm_nOv0slCJl2digSF_CrpoXtd9sCp8RSAy0SAySOrIeZgREdIQPGJiZtWthvKOJfCaPwbcoa4Rq4uwzKy7ZUVHwrLOsHbdyhjfUMTKPcj9?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/X6KFEd0u91qw_QpdxnEMHzRNbJ4RyN0qtHZsTry5ypzjUCVEGEZpfzSfsmNT74EySKV_wzimnuvzdPRwpJ59bqHEiV78q3pv07zHbnx5taICc4L87kg8WYzM7-AyobNh2yu8ucrgVFwwbybpM62VWwaU-n8UiEKRKa24Sfci2m3T8X5gWjtu_J5WMQ1eoOiL?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/AUpo_ppAWWRME7pmu00U7cLaQR55gmvXUGaI5hkqOMc6P8iZgBh7FicO7S54FszICmSUd9Fhlu-1ABIGRuz5Kfr1WYKcNvTkFGGDoU0qoJtRYsgMomgfOsjr6MJw0XG_yBDWuBkk2tKT-X-_Km7oNyQUceYQyl17C5kBluvPWvpy_bOFj43DB2ENDbKjua-Q?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/6LBrHYwkvL-SzMEgyYO75gbApDIEqVbBw9Gsg1cbqrO3-IqoWsvHebTp6ZCYBSwEGcAZJLO14abimjAQM4mQTYtT9BtNnVJhZTguukr38YqHlATZLRgeU1DuQMR_F-3DMOocKyCB0Dx7N7j7lzWVQLGecw1H5uXsrc8tI50dbUNasEOvFlYC_jkOWGGxglSA?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/jHOy1YUihQMSUY4ZAG0gtCrw94D1vdtLnw7VVo7ZJTIxI0E4Sjb19XeLN7rEeMUwTPC8f2pXo4Z8bMtrI6ydNADRcWrUU0KKhix-f0Li5ezEn3lIhApdq-essWemXh8h-VoKEsFEXpurO_rpHQLMVAGYF_6HM3LEsXiwcPelLVgi-noFF2fSLswVRarC9ECV?purpose=fullsize",
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Hair Studio",
    image: "/assets/img-category-hair.jpg",
    count: 50,
    slug: "hair",
    description: "Precision cuts, luxury colour and signature blowouts for polished women.",
    priceRange: "₹1,000 - ₹5,000",
    popularServices: ["Haircut", "Color", "Blowout", "Keratin"],
  },
  {
    id: "2",
    name: "Skin & Facial",
    image: "/assets/img-category-skin.jpg",
    count: 50,
    slug: "skin",
    description: "Glow-boosting facials and skin rituals tailored for your tone.",
    priceRange: "₹1,500 - ₹4,500",
    popularServices: ["Facial", "Glow Peel", "Skin Therapy"],
  },
  {
    id: "3",
    name: "Spa & Wellness",
    image: "/assets/img-category-spa.jpg",
    count: 50,
    slug: "spa",
    description: "Relaxing spa rituals and wellness therapies for complete restoration.",
    priceRange: "₹2,000 - ₹6,000",
    popularServices: ["Massage", "Spa Ritual", "Body Polish"],
  },
  {
    id: "4",
    name: "Bridal Beauty",
    image: "/assets/img-category-bridal.jpg",
    count: 50,
    slug: "bridal",
    description: "Elegant bridal styling, makeup and hair for your most memorable day.",
    priceRange: "₹5,000 - ₹15,000",
    popularServices: ["Bridal Makeup", "Hair Styling", "Trial"],
  },
  {
    id: "5",
    name: "Nail Studio",
    image: "/assets/img-category-nail.jpg",
    count: 50,
    slug: "nails",
    description: "Luxury manicures, pedicures and artistic nail design.",
    priceRange: "₹800 - ₹3,000",
    popularServices: ["Gel Nails", "Manicure", "Pedicure"],
  },
  {
    id: "6",
    name: "Makeup Studio",
    image: "/assets/img-salon-5.jpg",
    count: 50,
    slug: "makeup",
    description: "Soft glam, editorial looks and event makeup for every occasion.",
    priceRange: "₹1,500 - ₹8,000",
    popularServices: ["Party Makeup", "Wedding Makeup", "Airbrush"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya S.",
    avatar: "/assets/img-testimonial-1.jpg",
    rating: 5,
    comment: "The recommendation engine found a salon that matched my bridal brief perfectly and the experience felt luxurious from start to finish.",
    service: "Bridal Makeup",
  },
  {
    id: "2",
    name: "Nisha P.",
    avatar: "/assets/img-testimonial-3.jpg",
    rating: 5,
    comment: "The visuals, filters and booking flow made it simple to find a premium salon in Indiranagar in minutes.",
    service: "Hair Styling",
  },
  {
    id: "3",
    name: "Meera R.",
    avatar: "/assets/img-testimonial-3.jpg",
    rating: 5,
    comment: "I loved how every salon listing included pricing, rating, services and availability in one polished card.",
    service: "Spa Ritual",
  },
];

function createSalonImage(name: string, index: number, type = "Luxury Salon"): string {
  const palettes = {
    "Luxury Salon": [["#1f1a16", "#d7b36b", "#f6efe2", "#a45e2a"], ["#2d2438", "#d6a85f", "#f9f2e7", "#8a5a3a"], ["#1c2a2f", "#c59b63", "#f7f0e6", "#6c4931"], ["#2f2722", "#e0bf72", "#f8efe2", "#8e6143"], ["#232b33", "#d7b36b", "#f5e8d2", "#7b4f2e"]],
    Spa: [["#24343b", "#8fb9aa", "#f7efe6", "#6d7c5e"], ["#2d2a31", "#b3927c", "#f4ebde", "#7b5f4d"], ["#21363d", "#b0c8b1", "#f8f2e8", "#66806b"], ["#2a3038", "#c4a67a", "#f7efe5", "#6b6354"]],
    "Hair Studio": [["#1f252c", "#f0b36f", "#fef4e9", "#8a5a3a"], ["#2b2f3a", "#e1b16d", "#fcf1e1", "#805231"], ["#27333b", "#d5a15d", "#f6e8d7", "#6b4a3d"]],
    "Makeup Studio": [["#261f28", "#dba27a", "#f8ebdf", "#8e4f54"], ["#2c232a", "#c48663", "#f8efe8", "#7f4b5a"], ["#30262d", "#ca9775", "#f6eadf", "#6e3f4d"]],
    "Nail Studio": [["#221d24", "#e2a0b8", "#fdf3f7", "#8f4f6d"], ["#2a2630", "#e4afaf", "#fff7f8", "#784a5e"], ["#2f2b36", "#d896a2", "#fdf0f4", "#6f4254"]],
  };
  const palette = (palettes[type as keyof typeof palettes] ?? palettes["Luxury Salon"])[index % 3];
  const [bg, gold, cream, accent] = palette;
  const accent2 = index % 2 === 0 ? "#ffffff" : "#f2dbc0";
  const title = name.replace(/&/g, "and").slice(0, 24);

  const visuals = {
    Spa: `<g>
      <circle cx="250" cy="260" r="90" fill="${gold}" opacity="0.95" />
      <circle cx="250" cy="260" r="48" fill="${cream}" />
      <rect x="180" y="360" width="150" height="110" rx="24" fill="${accent}" opacity="0.95" />
      <rect x="382" y="180" width="250" height="220" rx="28" fill="${accent2}" />
      <path d="M470 230c30-50 108-50 138 0" stroke="${bg}" stroke-width="12" stroke-linecap="round" />
      <path d="M470 290h135" stroke="${gold}" stroke-width="10" stroke-linecap="round" />
      <path d="M760 220c44 0 82 36 82 82s-38 82-82 82" stroke="${accent}" stroke-width="16" stroke-linecap="round" />
      <rect x="700" y="380" width="220" height="90" rx="22" fill="${bg}" opacity="0.92" />
    </g>`,
    "Hair Studio": `<g>
      <rect x="180" y="160" width="220" height="260" rx="26" fill="${accent2}" />
      <rect x="430" y="170" width="280" height="250" rx="28" fill="${accent}" opacity="0.95" />
      <circle cx="780" cy="270" r="95" fill="${gold}" opacity="0.95" />
      <path d="M210 384c58-42 121-62 180-58" stroke="${bg}" stroke-width="16" stroke-linecap="round" />
      <path d="M448 310h148" stroke="${cream}" stroke-width="10" stroke-linecap="round" />
      <path d="M740 280c38 24 54 66 54 112" stroke="${bg}" stroke-width="14" stroke-linecap="round" />
      <rect x="180" y="455" width="760" height="120" rx="24" fill="${cream}" opacity="0.95" />
    </g>`,
    "Makeup Studio": `<g>
      <rect x="180" y="170" width="300" height="260" rx="32" fill="${accent2}" />
      <rect x="520" y="180" width="220" height="220" rx="28" fill="${accent}" />
      <circle cx="780" cy="290" r="98" fill="${gold}" opacity="0.95" />
      <rect x="220" y="460" width="660" height="120" rx="24" fill="${cream}" opacity="0.95" />
      <path d="M260 300c38-58 90-92 144-92" stroke="${bg}" stroke-width="12" stroke-linecap="round" />
      <path d="M560 250h110" stroke="${cream}" stroke-width="10" stroke-linecap="round" />
      <circle cx="780" cy="290" r="44" fill="${cream}" />
    </g>`,
    "Nail Studio": `<g>
      <rect x="180" y="180" width="220" height="250" rx="30" fill="${accent2}" />
      <rect x="430" y="180" width="220" height="250" rx="30" fill="${accent}" opacity="0.95" />
      <rect x="690" y="180" width="190" height="250" rx="30" fill="${bg}" opacity="0.92" />
      <circle cx="240" cy="310" r="56" fill="${gold}" opacity="0.95" />
      <path d="M470 300h120" stroke="${cream}" stroke-width="10" stroke-linecap="round" />
      <path d="M725 300h110" stroke="${gold}" stroke-width="10" stroke-linecap="round" />
      <rect x="190" y="468" width="690" height="110" rx="24" fill="${cream}" opacity="0.95" />
    </g>`,
    default: `<g>
      <rect x="140" y="170" width="240" height="260" rx="24" fill="${accent2}" />
      <rect x="420" y="180" width="300" height="250" rx="24" fill="${accent}" />
      <rect x="750" y="180" width="220" height="250" rx="24" fill="${accent2}" />
      <circle cx="240" cy="300" r="70" fill="${gold}" opacity="0.95" />
      <circle cx="240" cy="300" r="38" fill="${cream}" />
      <rect x="180" y="470" width="760" height="120" rx="24" fill="${cream}" opacity="0.95" />
      <path d="M200 610h780" stroke="${gold}" stroke-width="8" stroke-linecap="round" opacity="0.3" />
    </g>`,
  };

  const visual = visuals[type as keyof typeof visuals] ?? visuals.default;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <rect width="1200" height="800" rx="40" fill="${bg}" />
      <rect x="70" y="80" width="1060" height="640" rx="32" fill="${cream}" />
      ${visual}
      <path d="M180 650h820" stroke="${gold}" stroke-width="8" stroke-linecap="round" opacity="0.3" />
      <text x="170" y="722" fill="${bg}" font-size="40" font-family="Segoe UI, Arial, sans-serif" font-weight="700">${title}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildServices(serviceTags: string[], basePrice: number): Service[] {
  const services: Service[] = [];
  if (serviceTags.includes("Hair")) {
    services.push({ name: "Signature Hair Service", price: basePrice + 260, duration: "45 min", category: "Hair" });
  }
  if (serviceTags.includes("Facial")) {
    services.push({ name: "Glow Facial", price: basePrice + 650, duration: "60 min", category: "Facial" });
  }
  if (serviceTags.includes("Spa")) {
    services.push({ name: "Relaxing Spa Ritual", price: basePrice + 1100, duration: "75 min", category: "Spa" });
  }
  if (serviceTags.includes("Nails")) {
    services.push({ name: "Premium Nail Care", price: basePrice + 220, duration: "45 min", category: "Nails" });
  }
  if (serviceTags.includes("Makeup")) {
    services.push({ name: "Soft Glam Makeup", price: basePrice + 1600, duration: "90 min", category: "Makeup" });
  }
  if (serviceTags.includes("Bridal")) {
    services.push({ name: "Bridal Styling", price: basePrice + 3600, duration: "120 min", category: "Bridal" });
  }
  return services;
}

function getNormalizedRating(index: number): number {
  return index % 3 === 0 ? 3 : index % 3 === 1 ? 4 : 5;
}

function getNormalizedPriceRange(price: number): string {
  if (price < 2000) return "₹1,000-₹2,000";
  if (price < 3000) return "₹2,000-₹3,000";
  if (price < 5000) return "₹3,000-₹5,000";
  return "₹5,000+";
}

const salonBlueprints = [
  { name: "Bodycraft Salon & Spa", area: "Indiranagar", location: "100 Feet Road, Indiranagar", rating: 4.8, reviewCount: 318, price: 1500, services: ["Hair", "Facial", "Spa", "Nails"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Spa Luxury" },
  { name: "Dessange Paris", area: "Indiranagar", location: "12th Main, Indiranagar", rating: 4.7, reviewCount: 292, price: 1800, services: ["Hair", "Facial", "Spa"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Spa Luxury" },
  { name: "SCENT Salon Spa", area: "Indiranagar", location: "90 Feet Road, Indiranagar", rating: 4.6, reviewCount: 265, price: 1400, services: ["Hair", "Facial", "Spa"], type: "Spa", category: "Women's Luxury Salon", vibe: "Relaxed" },
  { name: "Jean-Claude Biguine", area: "Koramangala", location: "Church Street, Koramangala", rating: 4.7, reviewCount: 278, price: 1700, services: ["Hair", "Makeup", "Facial"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Boutique" },
  { name: "Lakmé Salon", area: "Indiranagar", location: "CMH Road, Indiranagar", rating: 4.5, reviewCount: 245, price: 1600, services: ["Hair", "Makeup", "Bridal"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Elegant" },
  { name: "Toni & Guy", area: "HSR Layout", location: "HSR Layout Main Road", rating: 4.6, reviewCount: 252, price: 1750, services: ["Hair"], type: "Hair Studio", category: "Women's Luxury Salon", vibe: "Trendy" },
  { name: "BBlunt Salon", area: "Indiranagar", location: "12th Main, Indiranagar", rating: 4.7, reviewCount: 238, price: 1500, services: ["Hair", "Makeup"], type: "Hair Studio", category: "Women's Luxury Salon", vibe: "Trendy" },
  { name: "Bounce Salon", area: "Koramangala", location: "5th Block, Koramangala", rating: 4.5, reviewCount: 228, price: 1400, services: ["Hair", "Facial", "Spa"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Relaxed" },
  { name: "YLG Salon", area: "Jayanagar", location: "Jayanagar 9th Block", rating: 4.6, reviewCount: 240, price: 1550, services: ["Hair", "Facial", "Nails"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Professional" },
  { name: "Naturals Salon", area: "Electronic City", location: "Electronic City Phase 1", rating: 4.4, reviewCount: 214, price: 1200, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Friendly" },
  { name: "Green Trends", area: "Whitefield", location: "Whitefield Main Road", rating: 4.4, reviewCount: 208, price: 1150, services: ["Hair", "Facial"], type: "Hair Studio", category: "Women's Luxury Salon", vibe: "Classic" },
  { name: "Bounce Beauty Bar", area: "Koramangala", location: "1st Block, Koramangala", rating: 4.5, reviewCount: 219, price: 1300, services: ["Hair", "Nails"], type: "Nail Studio", category: "Women's Luxury Salon", vibe: "Trendy" },
  { name: "The Blow Room", area: "Indiranagar", location: "100 Feet Road, Indiranagar", rating: 4.6, reviewCount: 226, price: 1450, services: ["Hair"], type: "Hair Studio", category: "Women's Luxury Salon", vibe: "Contemporary" },
  { name: "Blush & Blow", area: "Whitefield", location: "Whitefield Airfield Road", rating: 4.5, reviewCount: 221, price: 1600, services: ["Hair", "Makeup", "Facial"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Boutique" },
  { name: "Sparsh Salon", area: "Jayanagar", location: "Jayanagar 4th Block", rating: 4.5, reviewCount: 216, price: 1350, services: ["Hair", "Facial", "Spa"], type: "Spa", category: "Women's Luxury Salon", vibe: "Relaxed" },
  { name: "Aveda Salon", area: "Indiranagar", location: "Lavelle Road, Indiranagar", rating: 4.6, reviewCount: 233, price: 1850, services: ["Hair", "Spa"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Spa Luxury" },
  { name: "Zido Salon", area: "Koramangala", location: "7th Block, Koramangala", rating: 4.4, reviewCount: 205, price: 1250, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Contemporary" },
  { name: "YLG Bridal Studio", area: "HSR Layout", location: "HSR Sector 2", rating: 4.6, reviewCount: 242, price: 2100, services: ["Bridal", "Makeup", "Hair"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Elegant" },
  { name: "Fresche Salon", area: "MG Road", location: "MG Road", rating: 4.5, reviewCount: 224, price: 1450, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Professional" },
  { name: "MyGlamm Salon", area: "Koramangala", location: "Koramangala 5th Block", rating: 4.4, reviewCount: 212, price: 1350, services: ["Makeup", "Hair"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Boutique" },
  { name: "Salon Nayana", area: "Jayanagar", location: "Jayanagar 3rd Block", rating: 4.5, reviewCount: 220, price: 1280, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Modern" },
  { name: "Aura Salon", area: "Indiranagar", location: "Indiranagar 100 Feet Road", rating: 4.4, reviewCount: 206, price: 1320, services: ["Hair", "Spa"], type: "Spa", category: "Women's Luxury Salon", vibe: "Relaxed" },
  { name: "Lavender Salon", area: "Marathahalli", location: "Marathahalli Outer Ring Road", rating: 4.4, reviewCount: 201, price: 1240, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Elegant" },
  { name: "Aaina Salon", area: "Bellandur", location: "Bellandur Main Road", rating: 4.4, reviewCount: 199, price: 1325, services: ["Hair", "Makeup"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Modern" },
  { name: "Mirror Mirror Salon", area: "JP Nagar", location: "JP Nagar 3rd Phase", rating: 4.5, reviewCount: 217, price: 1380, services: ["Hair", "Makeup", "Nails"], type: "Nail Studio", category: "Women's Luxury Salon", vibe: "Classic" },
  { name: "The Vanity Room", area: "MG Road", location: "MG Road, Bengaluru", rating: 4.7, reviewCount: 236, price: 1680, services: ["Hair", "Facial", "Makeup"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Boutique" },
  { name: "Glam Studios", area: "Whitefield", location: "Whitefield Garden City", rating: 4.6, reviewCount: 229, price: 1620, services: ["Hair", "Makeup", "Bridal"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Elegant" },
  { name: "Studio 11 Salon", area: "Bellandur", location: "Bellandur Service Road", rating: 4.5, reviewCount: 211, price: 1480, services: ["Hair", "Nails"], type: "Hair Studio", category: "Women's Luxury Salon", vibe: "Contemporary" },
  { name: "Lakme Luxe", area: "MG Road", location: "MG Road Junction", rating: 4.6, reviewCount: 223, price: 1720, services: ["Hair", "Makeup", "Bridal"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Elegant" },
  { name: "Glow Beauty Lounge", area: "Electronic City", location: "Electronic City Phase 2", rating: 4.5, reviewCount: 210, price: 1390, services: ["Facial", "Spa", "Hair"], type: "Spa", category: "Women's Luxury Salon", vibe: "Relaxed" },
  { name: "Blush Beauty Lounge", area: "Marathahalli", location: "Marathahalli Market Road", rating: 4.4, reviewCount: 203, price: 1275, services: ["Hair", "Makeup"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Trendy" },
  { name: "The Beauty Lab", area: "JP Nagar", location: "JP Nagar 7th Phase", rating: 4.6, reviewCount: 231, price: 1580, services: ["Hair", "Facial", "Nails"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Professional" },
  { name: "Pearl Salon", area: "HSR Layout", location: "HSR Sector 6", rating: 4.4, reviewCount: 204, price: 1260, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Friendly" },
  { name: "Sapphire Salon", area: "Whitefield", location: "Whitefield Varthur Road", rating: 4.7, reviewCount: 239, price: 1660, services: ["Hair", "Spa", "Nails"], type: "Spa", category: "Women's Luxury Salon", vibe: "Sophisticated" },
  { name: "Elite Salon", area: "Koramangala", location: "3rd Block, Koramangala", rating: 4.5, reviewCount: 218, price: 1440, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Professional" },
  { name: "Urban Beauty Studio", area: "Bellandur", location: "Bellandur Outer Ring Road", rating: 4.5, reviewCount: 214, price: 1420, services: ["Hair", "Makeup", "Nails"], type: "Nail Studio", category: "Women's Luxury Salon", vibe: "Modern" },
  { name: "The Glam Room", area: "Indiranagar", location: "Indiranagar 80 Feet Road", rating: 4.6, reviewCount: 227, price: 1540, services: ["Hair", "Makeup"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Boutique" },
  { name: "Femina Salon", area: "Jayanagar", location: "Jayanagar 11th Main", rating: 4.4, reviewCount: 207, price: 1290, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Classic" },
  { name: "Aura Luxe Salon", area: "MG Road", location: "MG Road, Bengaluru", rating: 4.7, reviewCount: 234, price: 1710, services: ["Hair", "Spa", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Spa Luxury" },
  { name: "Lavish Salon", area: "Electronic City", location: "Electronic City, Phase 3", rating: 4.5, reviewCount: 213, price: 1370, services: ["Hair", "Spa"], type: "Spa", category: "Women's Luxury Salon", vibe: "Relaxed" },
  { name: "The Hair Story", area: "Marathahalli", location: "Marathahalli NH 44", rating: 4.6, reviewCount: 225, price: 1490, services: ["Hair", "Nails"], type: "Hair Studio", category: "Women's Luxury Salon", vibe: "Contemporary" },
  { name: "Serenity Salon", area: "JP Nagar", location: "JP Nagar 2nd Phase", rating: 4.5, reviewCount: 215, price: 1410, services: ["Hair", "Facial", "Spa"], type: "Spa", category: "Women's Luxury Salon", vibe: "Relaxed" },
  { name: "Belle Beauty Salon", area: "HSR Layout", location: "HSR Sector 4", rating: 4.4, reviewCount: 202, price: 1250, services: ["Hair", "Makeup"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Friendly" },
  { name: "The Beauty Square", area: "Whitefield", location: "Whitefield Hope Farm", rating: 4.5, reviewCount: 209, price: 1460, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Professional" },
  { name: "Royal Touch Salon", area: "Koramangala", location: "6th Block, Koramangala", rating: 4.6, reviewCount: 230, price: 1590, services: ["Hair", "Bridal", "Makeup"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Elegant" },
  { name: "Grace Salon", area: "Bellandur", location: "Bellandur Green View", rating: 4.4, reviewCount: 200, price: 1245, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Classic" },
  { name: "Divine Salon", area: "Indiranagar", location: "Indiranagar 12th Main", rating: 4.5, reviewCount: 222, price: 1430, services: ["Hair", "Spa", "Nails"], type: "Spa", category: "Women's Luxury Salon", vibe: "Sophisticated" },
  { name: "Beauty Bliss", area: "Jayanagar", location: "Jayanagar 10th Main", rating: 4.6, reviewCount: 232, price: 1510, services: ["Hair", "Facial", "Makeup"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Boutique" },
  { name: "Signature Salon", area: "MG Road", location: "MG Road, Bengaluru", rating: 4.7, reviewCount: 243, price: 1690, services: ["Hair", "Bridal", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Elegant" },
];

export const salons: Salon[] = salonBlueprints.map((salon, index) => {
  const fallbackImage = createSalonImage(salon.name, index, salon.type);
  const image = referenceSalonImages[index % referenceSalonImages.length] || fallbackImage;
  const startingPrice = salon.price;
  const priceRange = getNormalizedPriceRange(startingPrice);
  const rating = getNormalizedRating(index);
  const coords = coordsByArea[salon.area] ?? { lat: 12.9719, lng: 77.6410 };
  const availability = index % 3 === 0 ? "Open today · 10 AM - 9 PM" : index % 3 === 1 ? "Open today · 11 AM - 8 PM" : "Open today · 9 AM - 10 PM";

  return {
    id: `${index + 1}`,
    name: salon.name,
    location: salon.location,
    area: salon.area,
    rating,
    reviewCount: salon.reviewCount,
    category: salon.category,
    type: salon.type,
    description: `${salon.name} brings a polished luxury experience to Bangalore with expert styling, skin rituals and elevated beauty care tailored for modern women.`,
    specialties: [salon.type, "Luxury Care", "Personalized Styling"],
    services: buildServices(salon.services, startingPrice),
    image,
    images: [
      image,
      referenceSalonImages[(index + 1) % referenceSalonImages.length] || fallbackImage,
      referenceSalonImages[(index + 2) % referenceSalonImages.length] || fallbackImage,
    ],
    priceRange,
    startingPrice,
    aiMatch: Math.max(88, Math.min(99, 90 + (index % 6))),
    badges: ["Premium", "Women Only"],
    contact: { phone: `+91 80 4${(index + 1).toString().padStart(3, "0")} ${5000 + index * 37}` },
    hours: "10:00 AM - 9:00 PM",
    availability,
    vibe: salon.vibe,
    coords,
  };
});

export function getSalonById(id: string): Salon | undefined {
  return salons.find((salon) => salon.id === id);
}

export function filterSalons(filters: {
  areas?: string[];
  types?: string[];
  rating?: number;
  priceRange?: string[];
  services?: string[];
  searchQuery?: string;
  sortBy?: string;
}): Salon[] {
  let result = [...salons];

  if (filters.areas && filters.areas.length > 0) {
    result = result.filter((salon) => filters.areas!.includes(salon.area));
  }

  if (filters.types && filters.types.length > 0) {
    result = result.filter((salon) => filters.types!.includes(salon.type));
  }

  if (filters.rating) {
    result = result.filter((salon) => salon.rating >= filters.rating!);
  }

  if (filters.priceRange && filters.priceRange.length > 0) {
    result = result.filter((salon) =>
      filters.priceRange!.some((range) => {
        if (range === "₹10,000+") return salon.startingPrice >= 10000;
        const [min, max] = range.replace("₹", "").split("-").map((part) => Number(part.replace(/,/g, "").trim()));
        return salon.startingPrice >= min && salon.startingPrice <= max;
      })
    );
  }

  if (filters.services && filters.services.length > 0) {
    result = result.filter((salon) => salon.services.some((service) => filters.services!.includes(service.category)));
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    result = result.filter((salon) =>
      salon.name.toLowerCase().includes(query) ||
      salon.location.toLowerCase().includes(query) ||
      salon.services.some((service) => service.category.toLowerCase().includes(query))
    );
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        result.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case "price-high":
        result.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      default:
        break;
    }
  }

  return result;
}
