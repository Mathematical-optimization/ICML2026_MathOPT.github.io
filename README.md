# ICML 2026 Mathematical Optimization Meetup — Website Source

ICML 2026 참가자 중 **수학적 최적화(Mathematical Optimization) 연구에 관심 있는 사람들**을 위한 오프라인 모임용 정적 웹페이지입니다. 참여자 소개, 최대 6명의 짧은 연구 발표, 저녁 식사 순으로 진행됩니다.

## 확정 반영된 행사 정보

- 대상: 수학적 최적화 연구에 관심 있는 ICML 2026 참가자
- 시작: 2026년 7월 7일(화) 16:00 KST
- 티타임 장소: 카페 언더라인
- 저녁 식사: 18:00부터 이동 및 식사
- 참여 비용: 1인 15,000원
- 최종 안내: 7월 6일 참석 확정자에게 세부 집결 위치, 식사 장소 및 진행 안내 전달
- 문의: `opt214temporal@gmail.com`

종료 시각은 정하지 않았으므로 화면에 임의로 표시하지 않았고, 생성되는 `.ics` 파일에도 `DTEND`를 넣지 않았습니다. 종료 시각이 확정되면 `event-config.js`의 `endISO`를 설정하면 됩니다.

## 일정

| 시간 | 프로그램 |
|---|---|
| 16:00–16:10 | 참여자 확인 및 간단한 소개 |
| 16:10–16:30 | 자기소개 |
| 16:30–16:40 | 발표자 1 연구 주제 소개 및 발표 |
| 16:45–16:55 | 발표자 2 연구 주제 소개 및 발표 |
| 17:00–17:10 | 발표자 3 연구 주제 소개 및 발표 |
| 17:15–17:25 | 발표자 4 연구 주제 소개 및 발표 |
| 17:30–17:40 | 발표자 5 연구 주제 소개 및 발표 |
| 17:45–17:55 | 발표자 6 연구 주제 소개 및 발표 |
| 18:00– | 저녁 식사 이동 및 저녁 식사 |

## 주요 기능

- 외부 프레임워크·폰트·이미지 서비스 의존성 없는 정적 페이지
- 반응형 데스크톱/모바일 일정 표
- 한국어 기본 표시 및 영어 전환
- 일반 참가 신청과 발표자 신청 URL 분리
- QR 이미지와 QR 클릭 대상 URL을 설정 파일에서 교체 가능
- `.ics` 캘린더 파일 생성
- 접근성 기본 요소와 `prefers-reduced-motion` 대응
- ICML 공식 행사로 오인되지 않도록 독립 행사 고지 포함

## 1. 신청 링크 설정

`event-config.js`에서 다음 두 값을 실제 신청 폼 주소로 교체하세요.

```js
rsvpUrl: "https://forms.gle/일반-참가-신청폼",
speakerApplicationUrl: "https://forms.gle/발표자-신청폼",
organizerEmail: "opt214temporal@gmail.com",
```

- `rsvpUrl`: 일반 참가자 신청 버튼에 연결됩니다.
- `speakerApplicationUrl`: 발표자 신청 버튼에 연결됩니다.
- URL이 비어 있으면 해당 버튼은 “준비 중” 상태로 표시되고 클릭 시 설정 안내가 나타납니다.

## 2. QR 코드 교체

기본 QR 코드는 `opt214temporal@gmail.com`으로 이메일을 보내는 `assets/contact-email-qr.png`입니다. 일반 참가 또는 발표자 신청 QR로 교체하려면 PNG, SVG 또는 WebP 이미지를 `assets/` 폴더에 넣고 `event-config.js`를 수정하세요.

```js
qrCode: {
  imageUrl: "assets/speaker-application-qr.png",
  linkUrl: "https://forms.gle/발표자-신청폼",
  label: {
    en: "Speaker application QR",
    ko: "발표자 신청 QR"
  },
  helper: {
    en: "Scan to apply for a 10-minute speaker slot.",
    ko: "10분 발표 슬롯 신청을 위해 스캔하세요."
  },
  alt: {
    en: "QR code for the speaker application form",
    ko: "발표자 신청 폼 QR 코드"
  }
}
```

QR 이미지를 직접 만들려면 포함된 유틸리티를 사용할 수 있습니다.

```bash
pip install "qrcode[pil]"
python3 generate_qr.py "https://forms.gle/발표자-신청폼" assets/speaker-application-qr.png
```

생성 후 `imageUrl`과 `linkUrl`을 같은 신청 폼으로 맞추는 것이 좋습니다.

## 3. 장소 및 종료 시각 수정

식당이나 세부 집결 위치가 확정되면 다음 항목을 갱신하세요.

- `locationLabel`
- `coffeeVenue`
- `dinnerVenue`
- `calendarLocation`
- `calendarDescription`

종료 시각이 확정되면 다음과 같이 입력합니다.

```js
endISO: "2026-07-07T21:00:00+09:00",
```

## 4. 로컬 실행

파일을 직접 열어도 동작하지만, 브라우저 보안 정책 차이를 피하려면 간단한 로컬 서버를 권장합니다.

```bash
cd ICML2026_MathOPT.github.io-updated
python3 -m http.server 8080
```

브라우저에서 `http://localhost:8080`을 엽니다.

## 5. 배포

정적 파일이므로 GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3 등에 그대로 배포할 수 있습니다. 배포 루트에 `index.html`이 위치하도록 업로드하세요.

## 6. 파일별 역할

- 본문 및 일정: `index.html`
- 색상·레이아웃·반응형 표·QR 카드: `styles.css`
- 언어 전환·버튼 연결·QR 표시·카운트다운·캘린더: `script.js`
- 행사 정보·일반/발표 신청 URL·QR 설정: `event-config.js`
- 현재 기본 QR 이미지: `assets/contact-email-qr.png`
- QR 생성 보조 스크립트: `generate_qr.py`

## 7. 배포 전 체크리스트

- `rsvpUrl`에 실제 일반 참가 신청 링크 입력
- `speakerApplicationUrl`에 실제 발표자 신청 링크 입력
- 신청 폼에 발표 시간이 1인당 10분이고 최대 6명임을 명시
- 신청용 QR 이미지 생성 후 `qrCode.imageUrl`과 `qrCode.linkUrl` 교체
- 7월 6일 최종 안내 후 식당명과 세부 장소 반영
- 종료 시각 확정 시 `endISO` 입력
- 신청 폼에 참여 비용 15,000원 명시
- 행사 종료 후 카운트다운과 신청 버튼 정리
