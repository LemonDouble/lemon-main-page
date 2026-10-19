# lemon-main-page

- [LemonDouble의 개인 소개 페이지](https://lemondouble.com)입니다.
- Next.js와 Tailwind CSS로 스크롤 스토리와 프로젝트·기술 상세 화면을 제공합니다.
- 데스크톱·모바일과 한국어·영어·일본어·중국어 간체·번체를 지원합니다.

## 로컬 실행

```bash
pnpm install --frozen-lockfile
pnpm dev
```

- [스토리 화면](http://localhost:3000)과 [상세 화면](http://localhost:3000/detail)을 확인합니다.
- 배포 전에는 `pnpm lint`와 `pnpm build`를 실행합니다.

## 이미지 관리

- 실제 페이지에서 사용하는 이미지는 `public/image/story/`에 둡니다.
- 배포 이미지는 PNG 원본에서 WebP 품질 `75`로 변환합니다.
- 이미지 원본·프롬프트·시안은 `output/`, 레퍼런스는 `ref/`에 로컬 보관하며 Git에서 제외합니다.
