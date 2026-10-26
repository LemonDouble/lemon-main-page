# lemon-main-page

- [LemonDouble의 개인 소개 페이지](https://lemondouble.com)입니다.
- Next.js와 Tailwind CSS로 만든 한 페이지짜리 소개 화면입니다. 분야·기술 스택·오픈소스 기여 데이터는 `src/lib/profile.ts`, 문구는 `src/messages/`에 있습니다.
- 전체 프로젝트 목록은 [블로그 Projects 페이지](https://blog.lemondouble.com/projects/)에서 관리하고, 이 페이지에는 분야별 대표 프로젝트만 둡니다.
- 데스크톱·모바일과 한국어·영어를 지원합니다.

## 로컬 실행

```bash
pnpm install --frozen-lockfile
pnpm dev
```

- [메인 화면](http://localhost:3000)을 확인합니다.
- 배포 전에는 `pnpm lint`와 `pnpm build`를 실행합니다.

## 이미지 관리

- 실제 페이지에서 사용하는 이미지는 `public/image/`에 둡니다.
- 배너는 [GitHub 프로필](https://github.com/LemonDouble/LemonDouble)의 `assets/banner.png`에서 글자를 지운 버전입니다.
- 배포 이미지는 PNG 원본에서 WebP 품질 `75`로 변환합니다.
- 이미지 원본·프롬프트·시안은 `output/`, 레퍼런스는 `ref/`에 로컬 보관하며 Git에서 제외합니다.
