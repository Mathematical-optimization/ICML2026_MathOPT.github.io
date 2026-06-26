/**
 * Edit this file first.
 * The page reads all event-specific logistics and application links from EVENT_CONFIG.
 */
window.EVENT_CONFIG = Object.freeze({
  eventName: {
    en: "ICML 2026 Mathematical Optimization Meetup",
    ko: "ICML 2026 수학적 최적화 모임"
  },
  dateStatus: {
    en: "Confirmed · final details on July 6",
    ko: "일정 확정 · 7월 5일 최종 안내"
  },
  startISO: "2026-07-07T16:00:00+09:00",
  // Dinner begins at 18:00, but the event ending time is open. Leave blank to omit DTEND.
  endISO: "",
  dateLabel: {
    en: "Tue, July 7, 2026 · 16:00 KST",
    ko: "2026년 7월 7일(화) · 16:00 KST"
  },
  locationLabel: {
    en: "Cafe· precise meeting point and dinner venue shared July 6",
    ko: "카페 · 세부 집결 위치와 식사 장소는 7월 5일 안내"
  },
  coffeeVenue: {
    en: "Cafe",
    ko: "카페"
  },
  dinnerVenue: {
    en: "Shared with confirmed participants on July 6",
    ko: "7월 5일 참석 확정자에게 안내"
  },
  audienceLabel: {
    en: "ICML 2026 attendees interested in mathematical optimization",
    ko: "수학적 최적화 연구에 관심 있는 ICML 2026 참가자"
  },
  feeLabel: {
    en: "KRW 10,000",
    ko: "10,000원"
  },
  noticeLabel: {
    en: "Final details on July 5",
    ko: "7월 5일 최종 안내"
  },

  // Participant registration form: Google Forms, Tally, Luma, Partiful, etc.
  // Leave blank to show “RSVP opening soon”.
  rsvpUrl: "https://forms.gle/AyNX11vgMhTkHvad6",

  // Separate form for one of the six 10-minute speaker slots.
  // Leave blank to show “Speaker application opening soon”.
  speakerApplicationUrl: "",

  organizerEmail: "opt214temporal@gmail.com",
  officialConferenceUrl: "https://icml.cc/Conferences/2026",

  // QR code settings. Place a PNG/SVG/WebP file in assets/ and update imageUrl.
  // linkUrl is where users go after clicking the QR card.
  // The included default QR opens an email to the organizer; replace it with an
  // attendee-registration or speaker-application QR after those URLs are ready.
  qrCode: {
    imageUrl: "assets/contact-email-qr.png",
    linkUrl: "mailto:opt214temporal@gmail.com",
    label: {
      en: "Organizer email QR",
      ko: "주최자 이메일 QR"
    },
    helper: {
      en: "Replace this image with an RSVP or speaker-application QR code when the form is ready.",
      ko: "신청 폼이 준비되면 참가 또는 발표 신청용 QR 이미지로 교체할 수 있습니다."
    },
    alt: {
      en: "QR code for contacting the organizer by email",
      ko: "주최자 이메일 문의용 QR 코드"
    }
  },

  calendarLocation: {
    en: "Cafe, Seoul — precise meeting point to be shared July 6",
    ko: "카페, 서울 — 세부 집결 위치는 7월 5일 안내"
  },
  calendarDescription: {
    en: "An independent in-person gathering for ICML 2026 attendees interested in mathematical optimization.",
    ko: "수학적 최적화 연구에 관심 있는 ICML 2026 참가자를 위한 오프라인 모임"
  }
});
