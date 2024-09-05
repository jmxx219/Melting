# 08/26 (월)

## Next.js 기초

- [Setting Up Your Database](https://nextjs.org/learn/dashboard-app/setting-up-your-database)

dashboard에서 계속 작업하기 전에, 데이터가 조금 필요하다. 이 챕터에서는 `@vercel/postgres` PostrgreSQL 데이터 베이스를 사용하여 세팅한다.

- 목표:

  - GitHub에 프로젝트 Push하기
  - Vercel 계정을 세팅하고 즉각적인 preview와 배포를 위해 GitHub 레포를 링크하기
  - 프로젝트를 만들고 Postgres 데이터베이스에 연결
  - 초기 데이터로 데이터베이스 시드하기

- GitHub 레포지터리 만들기
  - GitLab이나 Bitbucket도 가능
- [Vercel 계정 만들기](https://vercel.com/signup)
  - 위 깃 계정과 연동한다.
- 방금 만든 깃헙 레포지터리를 선택하고 가져올 수 있는 화면 : install 클릭
  [import-git-repo.avif](https://prod-files-secure.s3.us-west-2.amazonaws.com/d51cbaf0-9492-4156-90cf-14cb81b94923/816f376b-31f8-41dd-ac63-a55eaf3ebe6b/import-git-repo.avif)
  - 프로젝트 이름을 짓고 Deploy 선택
  - 깃헙 레포지터리와 연결하면 main 브랜치에 변경 사항을 적용할 때마다 Vercel이 자동으로 애플리케이션을 재배치하고 configuration이 필요 없다. pull request를 열때 즉시 미리 보기도 제공해서 배포 오류를 조기에 파악하고 팀원과 프로젝트 미리 보기를 공유하여 피드백을 받을 수 있다.
- Postgres 데이터베이스 만들기
  - `Continue to Dashboard` 를 클릭하고 `Storage` 탭을 선택한다.
  - **Postgres → Connect Store** → **Create New** → **Postgres** → **Continue**.
  - 데이터베이스 region은 **Washington D.C (iad1)**로 하는 것을 권장
    - 모든 Vercel 프로젝트의 [default region](https://vercel.com/docs/functions/configuring-functions/region)이다.
    - 데이터에비으슬 동일한 지역 또는 어플리케이션 코드와 가깝게 배치해서 데이터 요청에 대한  [latency](https://developer.mozilla.org/en-US/docs/Web/Performance/Understanding_latency)을 줄일 수 있다.
    - 한번 region을 선택하면 바꿀 수 없다. 만약 다른 region을 사용하고 싶으면 데이터베이스를 만들기 전에 알아야 한다.
  - 연결이 되었다면, `.env.local` 탭으로 이동하고 `Show secret and Copy Snippet` 을 클릭한다. 그것들을 복사하기 전에 secrets를 드러내는 것을 권장.
  - 코드 에디터로 돌아가서 `.gitignore` 파일과 `.env` 파일을 생성하자.
    - 데이터베이스 secrets를 gitignore에 추가하기
    - `pnpm i @vercel/postgres` in your terminal to install the [Vercel Postgres SDK](https://vercel.com/docs/storage/vercel-postgres/sdk)
- 데이터베이스를 seed하기
  - 데이터베이스가 만들어졌으니 초기 데이터를 시드하자. = 데이터 채우기
  - /app 안에서 `seed` 폴더를 생성하고 `route.ts`를 주석해제한다.
    - 이 폴더에는 데이터베이스 시드에 사용되는 `route.ts` 라는 Next.js [Route Handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)가 포함되어 있다. 이것은 브라우저에서 접근하여 데이터베이스를 채우기 시작할 수 있는 server-side endpoint가 생성된다.
    - ❓server-side endpoint?
  - 전체적으로 설명하자면, 스크립트는 SQL을 사용하여 테이블을 만들고 `placeholder-data.ts` 파일로부터 데이터를 사용하여 테이블을 만든 후 채운다.
  - [localhost:3000/seed](http://localhost:3000/seed로) 로 이동했을때 "Database seeded successfully”라는 메세지가 뜬다면 성공이다.
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d51cbaf0-9492-4156-90cf-14cb81b94923/aa723fb1-d936-4afe-b34b-b1d4cabfd160/Untitled.png)
  - TroubleShooting:
    - .env 파일속에 secret를 복사하기 전에 secrets를 reveal버튼을 누르는 것을 잊지 말 것.
    - 스크립트는 bcrypt를 사용하여 상용자의 암호를 해시한다. bcrypt가 사용자 환경과 호환되지 않는 경우 대신 bcryptjs를 사용하도록 스크립트를 업데이트 할 수 있습니다.
    - 데이터베이스 seed 중에 문제가 발생하여 스크립트를 다시 실행하려면 데이터베이스 쿼리 인터페이스에서 `DROPT TABLE tablename` 을 실행하여 기존 테이블을 삭제할 수 있다.
      - 그러나 이 명령어는 테이블과 테이블의 모든 데이터를 삭제하므로 placeholder 데이터로 작업하기 때문에 여기서는 괜찮지만 실제 앱에서 이 명령어를 사용해선 안된다.

[](https://vercel.com/btotheys-projects/learn-nextjs)

[](https://vercel.com/btotheys-projects/learn-nextjs/stores/postgres/store_5ahHwjrPOUMhHGkU/data)

- 데이터베이스 둘러보기
  - 만든 데이터베이스는 어떻게 생겼는지 둘러보자. Vercel에가서 `Data` 탭을 선택
  - 여기에서 [users, customers, invoices, revenue] 테이블을 볼 수 있다.
  - 각 테이블을 선택하면 레코드를 볼 수 있고 항목entries이 placeholder-data.ts파일의 데이터와 일치하는지 확인할 수 있다.
- 쿼리 실행하기
  - query 탭을 선택하면 데이터베이스와 상호작용할 수 있다.
  - Vercel 인터페이스에 다음 코드를 실행시켜보자.
