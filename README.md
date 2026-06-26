# ICML 2026 Mathematical Optimization Coffee Chat & Dinner — Website Source

ICML 2026 참가자 중 **수학적 최적화(Mathematical Optimization)**, **머신러닝 최적화(Optimization for Machine Learning)**, 관련 이론 및 방법론에 관심 있는 사람들을 위한 비공식 오프라인 커피챗 및 저녁 모임용 정적 웹페이지입니다.

일반 참가자는 발표를 준비하지 않아도 되며, 희망자는 최대 6개의 10분 연구 소개 슬롯 중 하나에 신청할 수 있습니다.

## 확정 반영된 행사 정보

- 행사명: ICML 2026 Mathematical Optimization Coffee Chat & Dinner
- 대상: 수학적 최적화 연구에 관심 있는 ICML 2026 참가자
- 모임 날짜: 2026년 7월 7일(화)
- 시작: 16:00 KST
- 커피챗 장소: 카페 언더라인
- 저녁 식사: 18:00부터 이동 및 식사
- 참여 비용: 1인 10,000원
- 최종 안내: 2026년 7월 5일(일) 참석 확정자에게 세부 집결 위치, 식사 장소 및 진행 안내 전달
- 문의: `opt214temporal@gmail.com`
- 신청 폼: `https://forms.gle/AyNX11vgMhTkHvad6`

이 모임은 커뮤니티 구성원이 자발적으로 운영하는 **비공식 독립 모임**입니다. ICML이 주최·승인·후원·관리하는 공식 행사가 아닙니다.

종료 시각은 정하지 않았으므로 화면에 임의로 표시하지 않았고, 생성되는 `.ics` 파일에도 기본적으로 `DTEND`를 넣지 않았습니다. 종료 시각이 확정되면 `event-config.js`의 `endISO`를 설정하면 됩니다.

## 일정

| 시간 | 프로그램 |
|---|---|
| 16:00–16:10 | 참여자 확인 및 안내 |
| 16:10–16:30 | 자기소개 |
| 16:30–16:40 | 발표자 1 연구 소개 |
| 16:45–16:55 | 발표자 2 연구 소개 |
| 17:00–17:10 | 발표자 3 연구 소개 |
| 17:15–17:25 | 발표자 4 연구 소개 |
| 17:30–17:40 | 발표자 5 연구 소개 |
| 17:45–17:55 | 발표자 6 연구 소개 |
| 18:00– | 저녁 식사 이동 및 대화 |

## 이번 수정에서 반영한 개선사항

- Hero 제목을 **Mathematical Optimization Coffee Chat & Dinner @ ICML 2026** 방향으로 재구성
- 최종 안내일을 7월 5일로 통일
- 참여 비용을 10,000원으로 통일
- 카페 장소를 카페 언더라인으로 통일
- 발표자 수를 최대 6명으로 통일
- 참가 신청 QR을 신청 폼으로 연결하도록 교체
- `qr-helper` 누락으로 QR 설정 함수가 조기 종료되던 문제 수정
- 발표자 신청 버튼을 빈 링크가 아니라 참가 신청 폼의 “발표 희망 표시” 흐름으로 정리
- 홈페이지 구조를 `Hero → Logistics → Format → People → Schedule → Organizer → Apply` 순서로 재배치
- 한국어/영어 모두 비공식 독립 모임 고지 강화
- 모바일에서 브랜드 텍스트가 완전히 사라지지 않도록 수정
- 모바일 hero visual 높이를 축소해 신청 정보 접근성을 개선
- topic cloud에 한국어/영어 전환 적용
- Open Graph/Twitter card 메타 태그 보강
- 브라우저 언어 기반 기본 언어 선택 적용

## 주요 기능

- 외부 프레임워크·폰트·이미지 서비스 의존성 없는 정적 페이지
- 반응형 데스크톱/모바일 일정 표
- 한국어/영어 전환
- 일반 참가 신청과 발표 희망 표시 CTA 제공
- 신청 폼 QR 표시 및 QR 클릭 연결
- `.ics` 캘린더 파일 생성
- 접근성 기본 요소와 `prefers-reduced-motion` 대응
- ICML 공식 행사로 오인되지 않도록 독립 행사 고지 포함

## 1. 신청 링크 설정

`event-config.js`에서 다음 값을 실제 신청 폼 주소로 교체하세요.

```js
rsvpUrl: "https://forms.gle/AyNX11vgMhTkHvad6",
speakerApplicationUrl: "https://forms.gle/AyNX11vgMhTkHvad6",
organizerEmail: "opt214temporal@gmail.com",
```

- `rsvpUrl`: 일반 참가자 신청 버튼과 QR 코드에 연결됩니다.
- `speakerApplicationUrl`: 발표 희망 버튼에 연결됩니다. 현재는 같은 참가 신청 폼을 사용합니다.
- 별도 발표자 신청 폼을 만들 경우 `speakerApplicationUrl`만 교체하면 됩니다.

## 2. QR 코드 교체

현재 QR 코드는 `assets/rsvp-qr.png`이며, `https://forms.gle/AyNX11vgMhTkHvad6` 참가 신청 폼으로 연결됩니다.

신청 폼 URL이 바뀌면 QR 이미지를 다시 생성하고 `event-config.js`의 `qrCode.imageUrl`, `qrCode.linkUrl`을 함께 수정하세요.

```bash
pip install "qrcode[pil]"
python3 generate_qr.py "https://forms.gle/새-신청폼" assets/rsvp-qr.png
```

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
cd ICML2026_MathOPT.github.io-main
python3 -m http.server 8080
```

브라우저에서 `http://localhost:8080`을 엽니다.

## 5. 배포

정적 파일이므로 GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3 등에 그대로 배포할 수 있습니다. 배포 루트에 `index.html`이 위치하도록 업로드하세요.

## 6. 파일별 역할

- 본문 및 페이지 구조: `index.html`
- 색상·레이아웃·반응형 표·QR 카드: `styles.css`
- 언어 전환·버튼 연결·QR 표시·카운트다운·캘린더: `script.js`
- 행사 정보·신청 URL·QR 설정: `event-config.js`
- 참가 신청 QR 이미지: `assets/rsvp-qr.png`
- 기존 이메일 QR 이미지: `assets/contact-email-qr.png`
- QR 생성 보조 스크립트: `generate_qr.py`

## 7. 배포 전 체크리스트

- `rsvpUrl`이 최종 참가 신청 폼으로 연결되는지 확인
- 참가 신청 폼에 발표 희망 여부 항목이 있는지 확인
- 신청 폼에 커피챗/저녁 식사 참석 여부, 식이 제한, 알러지 항목 포함
- QR 이미지가 최종 신청 폼을 인코딩하는지 확인
- 참여 비용 10,000원 문구 확인
- 7월 5일 최종 안내 문구 확인
- 식당명과 세부 장소 확정 후 `event-config.js` 갱신
- 종료 시각 확정 시 `endISO` 입력
- 배포 주소가 확정되면 `index.html`의 `og:url` 수정
