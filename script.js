(() => {
  "use strict";

  const config = window.EVENT_CONFIG || {};
  const byId = (id) => document.getElementById(id);

  function readStoredLanguage() {
    try {
      const stored = localStorage.getItem("opt-meetup-lang");
      return stored === "ko" || stored === "en" ? stored : null;
    } catch (_) {
      return null;
    }
  }

  function detectDefaultLanguage() {
    const stored = readStoredLanguage();
    if (stored) return stored;
    const navLang = String(navigator.language || "").toLowerCase();
    return navLang.startsWith("ko") ? "ko" : "en";
  }

  function storeLanguage(lang) {
    try { localStorage.setItem("opt-meetup-lang", lang); }
    catch (_) { /* Storage can be unavailable on local files or privacy-restricted browsers. */ }
  }

  const state = { lang: detectDefaultLanguage() };

  function localized(value, fallback = "") {
    if (value && typeof value === "object") return value[state.lang] || value.en || value.ko || fallback;
    return value ?? fallback;
  }

  function applyLanguage(lang) {
    state.lang = lang === "ko" ? "ko" : "en";
    document.documentElement.lang = state.lang;
    storeLanguage(state.lang);

    document.querySelectorAll("[data-en][data-ko]").forEach((node) => {
      node.textContent = node.dataset[state.lang];
    });

    const toggle = byId("lang-toggle");
    if (toggle) {
      const labels = toggle.querySelectorAll("span");
      labels.forEach((label) => label.classList.remove("lang-active"));
      if (state.lang === "en") labels[0]?.classList.add("lang-active");
      else labels[2]?.classList.add("lang-active");
      toggle.setAttribute("aria-label", state.lang === "en" ? "한국어로 보기" : "View in English");
    }

    populateConfig();
    updateCountdown();
  }

  function populateConfig() {
    const values = {
      "date-status": localized(config.dateStatus, "Confirmed"),
      "date-label": localized(config.dateLabel),
      "location-label": localized(config.locationLabel),
      "coffee-venue": localized(config.coffeeVenue),
      "dinner-venue": localized(config.dinnerVenue),
      "audience-label": localized(config.audienceLabel),
      "fee-label": localized(config.feeLabel),
      "fee-summary": localized(config.feeLabel),
      "notice-label": localized(config.noticeLabel),
      "footer-event-name": localized(config.eventName, "ICML 2026 Mathematical Optimization Coffee Chat & Dinner")
    };

    Object.entries(values).forEach(([id, value]) => {
      const node = byId(id);
      if (node && value) node.textContent = value;
    });

    const conferenceLink = byId("conference-link");
    if (conferenceLink) conferenceLink.href = config.officialConferenceUrl || "https://icml.cc/Conferences/2026";

    configureRsvp();
    configureSpeakerApplication();
    configureEmail();
    configureQrCode();
  }

  function configureRsvp() {
    const hasRsvp = typeof config.rsvpUrl === "string" && config.rsvpUrl.trim().length > 0;
    const links = document.querySelectorAll(".rsvp-link");
    const label = byId("rsvp-button-label");

    if (label) {
      label.textContent = hasRsvp
        ? (state.lang === "ko" ? "참가 신청하기" : "Request a seat")
        : (state.lang === "ko" ? "참가 신청 준비 중" : "RSVP opening soon");
    }

    links.forEach((link) => {
      link.onclick = null;
      if (hasRsvp) {
        link.href = config.rsvpUrl;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.classList.remove("is-disabled");
        link.removeAttribute("aria-disabled");
      } else {
        link.href = "#rsvp";
        link.removeAttribute("target");
        link.removeAttribute("rel");
        link.classList.add("is-disabled");
        link.setAttribute("aria-disabled", "true");
        link.onclick = rsvpPlaceholderNotice;
      }
    });
  }

  function rsvpPlaceholderNotice(event) {
    event.preventDefault();
    showToast(state.lang === "ko"
      ? "event-config.js에 참가 신청 링크를 입력하세요."
      : "Add the RSVP URL in event-config.js.");
  }

  function configureSpeakerApplication() {
    const speakerUrl = String(config.speakerApplicationUrl || "").trim();
    const rsvpUrl = String(config.rsvpUrl || "").trim();
    const url = speakerUrl || rsvpUrl;
    const hasUrl = url.length > 0;
    const usesRsvp = hasUrl && rsvpUrl && url === rsvpUrl;
    const labelText = hasUrl
      ? (usesRsvp
          ? (state.lang === "ko" ? "발표 희망 표시하기" : "Indicate speaker interest")
          : (state.lang === "ko" ? "발표자로 신청" : "Apply to speak"))
      : (state.lang === "ko" ? "발표자 신청 준비 중" : "Speaker application opening soon");

    document.querySelectorAll(".speaker-button-label").forEach((label) => {
      label.textContent = labelText;
    });

    document.querySelectorAll(".speaker-application-link").forEach((link) => {
      link.onclick = null;
      if (hasUrl) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.classList.remove("is-disabled");
        link.removeAttribute("aria-disabled");
      } else {
        link.href = "#speaker-application";
        link.removeAttribute("target");
        link.removeAttribute("rel");
        link.classList.add("is-disabled");
        link.setAttribute("aria-disabled", "true");
        link.onclick = speakerApplicationPlaceholderNotice;
      }
    });
  }

  function speakerApplicationPlaceholderNotice(event) {
    event.preventDefault();
    showToast(state.lang === "ko"
      ? "event-config.js에 발표자 신청 링크 또는 참가 신청 링크를 입력하세요."
      : "Add the speaker application URL or RSVP URL in event-config.js.");
  }

  function configureEmail() {
    const email = String(config.organizerEmail || "").trim();
    const isPlaceholder = !email || email.includes("REPLACE_WITH") || email.endsWith("@example.com");
    const link = byId("email-link");
    const label = byId("email-label");
    if (!link || !label) return;

    link.onclick = null;
    if (isPlaceholder) {
      link.href = "#";
      label.textContent = state.lang === "ko" ? "event-config.js에 이메일을 입력하세요" : "Add email in event-config.js";
      link.onclick = placeholderEmailNotice;
    } else {
      const subject = encodeURIComponent(`[${localized(config.eventName)}] Meetup inquiry`);
      link.href = `mailto:${email}?subject=${subject}`;
      label.textContent = email;
    }
  }

  function placeholderEmailNotice(event) {
    event.preventDefault();
    showToast(state.lang === "ko" ? "event-config.js에서 주최자 이메일을 설정하세요." : "Set the organizer email in event-config.js.");
  }

  function configureQrCode() {
    const qr = config.qrCode && typeof config.qrCode === "object" ? config.qrCode : {};
    const imageUrl = String(qr.imageUrl || "").trim();
    const linkUrl = String(qr.linkUrl || config.rsvpUrl || "").trim();
    const link = byId("qr-link");
    const image = byId("qr-image");
    const placeholder = byId("qr-placeholder");
    const label = byId("qr-label");
    const helper = byId("qr-helper");

    if (!link || !image || !placeholder || !label) return;

    label.textContent = localized(qr.label, state.lang === "ko" ? "참가 신청 QR" : "Participant RSVP QR");
    if (helper) {
      helper.textContent = localized(
        qr.helper,
        state.lang === "ko"
          ? "스캔하면 참가 신청 폼으로 이동합니다."
          : "Scan to open the participant RSVP form."
      );
    }
    image.alt = localized(qr.alt, state.lang === "ko" ? "참가 신청 폼 QR 코드" : "QR code for the participant RSVP form");

    const revealImage = () => {
      image.classList.add("is-visible");
      placeholder.classList.add("is-hidden");
    };
    const revealPlaceholder = () => {
      image.classList.remove("is-visible");
      placeholder.classList.remove("is-hidden");
    };

    image.onload = revealImage;
    image.onerror = revealPlaceholder;
    if (imageUrl) {
      if (image.getAttribute("src") !== imageUrl) image.src = imageUrl;
      if (image.complete && image.naturalWidth > 0) revealImage();
      else if (!image.complete) revealPlaceholder();
    } else {
      image.removeAttribute("src");
      revealPlaceholder();
    }

    link.onclick = null;
    if (linkUrl) {
      link.href = linkUrl;
      link.classList.remove("is-disabled");
      link.removeAttribute("aria-disabled");
      if (/^https?:\/\//i.test(linkUrl)) {
        link.target = "_blank";
        link.rel = "noreferrer";
      } else {
        link.removeAttribute("target");
        link.removeAttribute("rel");
      }
    } else {
      link.href = "#rsvp";
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.classList.add("is-disabled");
      link.setAttribute("aria-disabled", "true");
      link.onclick = qrPlaceholderNotice;
    }
  }

  function qrPlaceholderNotice(event) {
    event.preventDefault();
    showToast(state.lang === "ko"
      ? "event-config.js에서 QR 코드 연결 주소를 설정하세요."
      : "Set the QR-code destination in event-config.js.");
  }

  function updateCountdown() {
    const start = new Date(config.startISO);
    if (Number.isNaN(start.getTime())) return;

    const now = new Date();
    const diff = start.getTime() - now.getTime();
    const daysNode = byId("days");
    const hoursNode = byId("hours");
    const minutesNode = byId("minutes");
    const kicker = document.querySelector(".countdown-kicker");

    if (diff <= 0) {
      if (daysNode) daysNode.textContent = "00";
      if (hoursNode) hoursNode.textContent = "00";
      if (minutesNode) minutesNode.textContent = "00";
      if (kicker) kicker.textContent = state.lang === "ko" ? "서울에서 만나요" : "See you in Seoul";
      return;
    }

    const totalMinutes = Math.floor(diff / 60000);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;
    if (daysNode) daysNode.textContent = String(days).padStart(2, "0");
    if (hoursNode) hoursNode.textContent = String(hours).padStart(2, "0");
    if (minutesNode) minutesNode.textContent = String(minutes).padStart(2, "0");
  }

  function escapeIcs(value) {
    return String(value || "")
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  }

  function toIcsUtc(iso) {
    const date = new Date(iso);
    return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  }

  function downloadCalendar() {
    if (!config.startISO) {
      showToast(state.lang === "ko" ? "event-config.js에 시작 시간을 설정하세요." : "Set the start time in event-config.js.");
      return;
    }

    const title = localized(config.eventName, "ICML 2026 Mathematical Optimization Coffee Chat & Dinner");
    const description = localized(config.calendarDescription);
    const location = localized(config.calendarLocation || config.locationLabel, "Cafe Underline, Seoul");
    const uid = `icml-2026-mathopt-coffee-chat-dinner-${Date.now()}@local`;
    const stamp = toIcsUtc(new Date().toISOString());
    const start = toIcsUtc(config.startISO);
    const endDate = config.endISO ? new Date(config.endISO) : null;
    const hasValidEnd = endDate && !Number.isNaN(endDate.getTime());

    const eventLines = [
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${start}`
    ];

    if (hasValidEnd) eventLines.push(`DTEND:${toIcsUtc(config.endISO)}`);

    eventLines.push(
      `SUMMARY:${escapeIcs(title)}`,
      `DESCRIPTION:${escapeIcs(description)}`,
      `LOCATION:${escapeIcs(location)}`,
      "STATUS:CONFIRMED",
      "END:VEVENT"
    );

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//ICML 2026 Mathematical Optimization Coffee Chat Dinner//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      ...eventLines,
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "icml-2026-mathopt-coffee-chat-dinner.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast(state.lang === "ko" ? "캘린더 파일을 만들었습니다." : "Calendar file created.");
  }

  let toastTimer;
  function showToast(message) {
    const toast = byId("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  function init() {
    byId("lang-toggle")?.addEventListener("click", () => applyLanguage(state.lang === "en" ? "ko" : "en"));
    byId("calendar-button")?.addEventListener("click", downloadCalendar);
    applyLanguage(state.lang);
    setInterval(updateCountdown, 60000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
