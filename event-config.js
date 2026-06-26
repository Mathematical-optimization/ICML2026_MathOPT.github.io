/**
 * Edit this file first.
 * The page reads event-specific logistics, application links, and QR settings from EVENT_CONFIG.
 */
window.EVENT_CONFIG = Object.freeze({
  eventName: {
    en: "ICML 2026 Mathematical Optimization Coffee Chat & Dinner",
    ko: "ICML 2026 수학적 최적화 커피챗 & 저녁 모임"
  },
  dateStatus: {
    en: "Confirmed · final details on July 5",
    ko: "일정 확정 · 7월 5일 최종 안내"
  },
  startISO: "2026-07-07T16:00:00+09:00",
  // Dinner begins at 18:00, but the ending time is intentionally open.
  // Set an ISO string such as "2026-07-07T21:00:00+09:00" if you want DTEND in the .ics file.
  endISO: "",
  dateLabel: {
    en: "Tue, July 7, 2026 · 16:00 KST",
    ko: "2026년 7월 7일(화) · 16:00 KST"
  },
  locationLabel: {
    en: "Cafe Underline · dinner venue shared July 5",
    ko: "카페 · 식사 장소는 7월 5일 안내"
  },
  coffeeVenue: {
    en: "Cafe",
    ko: "카페"
  },
  dinnerVenue: {
    en: "Shared with confirmed participants on July 5",
    ko: "7월 5일 참석 확정자에게 안내"
  },
  audienceLabel: {
    en: "ICML 2026 attendees interested in mathematical optimization",
    ko: "수학적 최적화에 관심 있는 ICML 2026 참가자"
  },
  feeLabel: {
    en: "KRW 10,000",
    ko: "10,000원"
  },
  noticeLabel: {
    en: "Final details on July 5",
    ko: "7월 5일 최종 안내"
  },

  // Participant registration form. Replace this with your final Google Forms/Tally/Luma URL if it changes.
  rsvpUrl: "https://forms.gle/AyNX11vgMhTkHvad6",

  // Speaker interest currently uses the same participant form.
  // If you later create a separate speaker form, replace this URL with that form URL.
  speakerApplicationUrl: "https://forms.gle/AyNX11vgMhTkHvad6",

  organizerEmail: "opt214temporal@gmail.com",
  officialConferenceUrl: "https://icml.cc/Conferences/2026",

  // QR code settings. The included QR opens the participant RSVP form.
  qrCode: {
    imageUrl: "assets/rsvp-qr.png",
    linkUrl: "https://forms.gle/AyNX11vgMhTkHvad6",
    label: {
      en: "Participant RSVP QR",
      ko: "참가 신청 QR"
    },
    helper: {
      en: "Scan to request a seat. Speaker interest can be indicated in the same form.",
      ko: "스캔하면 참가 신청 폼으로 이동합니다. 발표 희망도 같은 폼에서 표시할 수 있습니다."
    },
    alt: {
      en: "QR code for the participant RSVP form",
      ko: "참가 신청 폼 QR 코드"
    }
  },

  calendarLocation: {
    en: "Cafe, Seoul — dinner venue to be shared July 5",
    ko: "카페, 서울 — 식사 장소는 7월 5일 안내"
  },
  calendarDescription: {
    en: "An independent, unofficial coffee chat and dinner for ICML 2026 attendees interested in mathematical optimization. Not organized, endorsed, sponsored, or supervised by ICML.",
    ko: "수학적 최적화에 관심 있는 ICML 2026 참가자를 위한 비공식 모임입니다. ICML이 주최·승인·후원·관리하는 공식 행사가 아닙니다."
  }
});
