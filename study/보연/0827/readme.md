# 08/27 (화)

## Next.js 기초

- [Fetching Data](https://nextjs.org/learn/dashboard-app/fetching-data)

이제 데이터베이스를 만들고 시드했으니 내 어플리케이션에 데이터를 fetch하는 다양한 방법을 알아보자. 그리고 dashboard overview 페이지를 빌드해보자.

- 목표:
  - 데이터를 fetch하는 다양한 접근방법 : API, ORM, SQL 등
  - Server Component를 통해 백엔드 리소스에 안전하게 접근할 수 있는 방법
  - 네티워크 waterfall이 뭘까
  - 자바스크립트 패턴을 사용하여 병렬 데이터 fetch를 구현하는 방법
- 데이터를 fetch하는 방법을 고르기
  **API 레이어**
  - API는 어플리케이션 코드와 데이터베이스 사이의 중간 레이어다. APi를 사용할 수 있는 몇 가지 경우가 있다 :
    - API를 제공하는 3자 서비스를 사용하는 경우
    - 클라이언트에서 데이터를 가져오는(fetch) 경우 데이터베이스 secrets이 클라이언트에 노출되지 않도록 서버에서 실행되는 API 계층을 사용한다. → ?
    - Nexst.js에서 [Route Handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)를 사용하여 API 엔드포인트를 만들 수 있다.
      **Database 쿼리**
  - 풀스택 어플리케이션을 만들 때는 데이터베이스와 상호 작용할 수 있는 논리도 작성해야 한다. Postgres와 같은 관계형 데잍너베이스의 경우 SQL을 사용하거나 ORM을 사용하여 이 작업을 수행할 수 있다.
  - 데이터베이스 쿼리를 작성해야 하는 몇 가지 경우가 있다
    - API 엔드포인트를 만들때 DB와 상호 작용하기 위해 로직을 작성해야 한다.
    - React Server Components(서버에서 데이터 가져오기)를 사용하는 경우 API 계층을 건너뛰고 데이터베이스 secret을 클라이언트에 노출할 위험 없이 DB에 직접 쿼리할 수 있다.
- data를 fetch하기 위해 서버 컴포넌트 사용하기
  - 기본적으로 Next.js 어플리케이션은 React Server Components를 사용한다. 서버컴포넌트로 데이터를 fetch하는 것은 비교적 새로운 접근법이고 몇가지 장점이 있다
    - 서버 컴포넌트는 promise를 지원하며 데이터 fetch같은 비동기 작업을 위한 더 간단한 솔루션을 제공한다. useEffect, useState또는 데이터 fetching 라이브러리에 손을 대지 않고 async/await 구문을 사용할 수 있다.
    - 서버 컴포넌트는 서버에서 실행되므로 값비싼 데이터 fetch 및 로직을 서버에 유지하고 결과만 클라이언트만 보낼 수 이 ㅆ다.
    - 앞서 언급했듯 서버 컴포넌트는 서버에서 실행되므로 추가 API 계층 없이 DB를 직접 조회할 수 있다.
- SQL 사용하기
  - dashboard 프로젝트의 경우 [Vercel Postgres SDK](https://vercel.com/docs/storage/vercel-postgres/sdk)  및 SQL을 사용하여 DB쿼리를 작성한다. SQL을 사용하는 이유 :
    - SQL은 관계형 데이터베이스(e. ORMs는 hood아래에 SQL을 생성한다)를 쿼리하기 위한 업계 표준임
    - SQL에 대한 기본적 이해를 통해 관계형 데이터베이스(RDB)의 기본을 이해하고 지식을 다른 도구에 적용할 수 있다.
    - SQL은 다양한 용도로 사용되어 특정 데이터를 가져오고 조작할 수 있다
    - Vercel Postgres SDK는  [SQL injections](https://vercel.com/docs/storage/vercel-postgres/sdk#preventing-sql-injections)에 대한 보호 기능 제공
  - `/app/lib/data.ts` 로 이동하여 `@vercel/postgres`에서 [sql](https://vercel.com/docs/storage/vercel-postgres/sdk#sql) 함수를 가져오는 것을 볼 수 있다.
    ```tsx
    import { sql } from '@vercel/postgres';
    ```
    어느 서버 컴포넌트안에서나 `sql`를 call 할 수 있다. 하지만 더 쉽게 컴포넌트를 탐색할 수 있도록 `data.ts`파일에서 모든 데이터 쿼리를 보관하고 이 쿼리를 컴포넌트로 가져올 수 있다.
- dashboard overview 페이지에서 데이터 가져오기

  - /app/dashboard/page.tsx로 이동하여 다음 코드를 붙여넣고 살펴보자

  ```tsx
  import { Card } from '@/app/ui/dashboard/cards';
  import RevenueChart from '@/app/ui/dashboard/revenue-chart';
  import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
  import { lusitana } from '@/app/ui/fonts';

  export default async function Page() {
    return (
      <main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
          {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
          {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
          {/* <Card
            title="Total Customers"
            value={numberOfCustomers}
            type="customers"
          /> */}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          {/* <RevenueChart revenue={revenue}  /> */}
          {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
        </div>
      </main>
    );
  }
  ```

  - 페이지는 async 컴포넌트다. 데이터를 가져올때 await를 허용한다.
  - 데이터를 수신하는 컴포넌트는 <Card>, <RevenueChart>, <LatestInvoices> 세 가지다. 이 것들은 현재 어플리케이션의 오류를 방지하기 위해 주석처리했다.

- `<RevenueChart />`에서 데이터 가져오기

  - `<RevenueChart/>` 컴포넌트에서 데이터를 가져오기 위해서 `fetchRevenue` 함수를 `data.ts`에서 가져와 컴포넌트에 호출

    ```tsx
    export async function fetchRevenue() {
      try {
        // Artificially delay a response for demo purposes.
        // Don't do this in production :)

        // console.log('Fetching revenue data...');
        // await new Promise((resolve) => setTimeout(resolve, 3000));

        const data = await sql<Revenue>`SELECT * FROM revenue`;

        // console.log('Data fetch completed after 3 seconds.');

        return data.rows;
      } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
      }
    }
    ```

    ```tsx
    import { Card } from '@/app/ui/dashboard/cards';
    import RevenueChart from '@/app/ui/dashboard/revenue-chart';
    import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
    import { lusitana } from '@/app/ui/fonts';
    import { fetchRevenue } from '@/app/lib/data';

    export default async function Page() {
      const revenue = await fetchRevenue();
      // ...
    }
    ```

    - 이제 `<RevenueChart />`컴포넌트를 주석해제하고 컴포넌트 파일(/app/ui/dashboard/revenue-chart.tsx)로 이동한 후 그 안에 있는 코드에 대한 주석을 해제하자. localhost를 확인하면 수익 데이터(revenue data)를 사용하는 차트가 표시된다.
      ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d51cbaf0-9492-4156-90cf-14cb81b94923/39d8ac71-3b41-4a36-820c-7b7ce1404978/Untitled.png)

- `<LatestInvoices />`에서 데이터 가져오기

  - `<LatestInvoices />` 컴포넌트의 경우 날짜별로 정렬된 최신 5개의 invoices를 받아야 한다.
  - 자바스크립트를 사용하면 모든 invoices를 가져와 분류할 수 있다. 우리 데이터는 작기 때문에 문제가 되지 않지만, 어플리케이션이 커지면서 각 요청에 전송되는 데이터의 양과 이를 분류하는데 필요한 JS를 크게 늘릴 수 있다
  - 내부 메모리에 있는 최신 invoices를 정렬하는 대신 SQL 쿼리를 사용하여 마지막 5개의 invoice만 가져올 수 있다.
  - 예:

    ```tsx
    // Fetch the last 5 invoices, sorted by date
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;
    ```

    ```tsx
    import { Card } from '@/app/ui/dashboard/cards';
    import RevenueChart from '@/app/ui/dashboard/revenue-chart';
    import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
    import { lusitana } from '@/app/ui/fonts';
    import { fetchRevenue, fetchLatestInvoices } from '@/app/lib/data';

    export default async function Page() {
      const revenue = await fetchRevenue();
      const latestInvoices = await fetchLatestInvoices();
      // ...
    }
    ```

  - <LatestInvoices /> 컴포넌트에 대한 주석을 해제한다. `/app/ui/dashboard/latest-invoices` 에 있는 <LatestInvoices /> 컴포넌트 자체에서 관련된 코드를 주석 해제 해야한다.
  - 만약 localhost에 방문한다면 마지막 5개 데이터만이 DB로부터 반환된다는 것을 알 수 있을 것이다.
    [latest-invoices.avif](https://prod-files-secure.s3.us-west-2.amazonaws.com/d51cbaf0-9492-4156-90cf-14cb81b94923/8eac833c-52dd-452b-850c-bb5e241cdf3d/latest-invoices.avif)

- 연습 : <Card> 컴포넌트에서 데이터 가져오기

  - card는 다음의 데이터를 표시한다:
    - 수집된 invoices의 총 합
    - 보류 중인 invoices의 총 금액
    - invoices 총 개수
    - 총 고객 수
  - 다시 언급해보자면, 모든 invoice와 customers를 가져와서 JS를 이용하여 데이터를 조작하고 싶을 수 있다. 예를 들어, `Array.length`를 사용해서 invoice와 고객의 총 수를 얻을 수도 있다.
    ```tsx
    const totalInvoices = allInvoices.length;
    const totalCustomers = allCustomers.length;
    ```
  - 하지만 SQL을 사용하면 필요한 데이터만 가져올 수 있다. Array.length를 사용하는 것보다 조금 더 길지만 request 동안 전송해야 하는 데이터가 줄어든다.
    ```tsx
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    ```
  - 가져와야 할 함수를 fetchCardData라고 한다. 함수에서 반환되는 값을 재구성(destructure)해야한다.

    ```tsx
    import { Card } from '@/app/ui/dashboard/cards';
    import RevenueChart from '@/app/ui/dashboard/revenue-chart';
    import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
    import { lusitana } from '@/app/ui/fonts';
    import {
      fetchRevenue,
      fetchLatestInvoices,
      fetchCardData,
    } from '@/app/lib/data';

    export default async function Page() {
      const revenue = await fetchRevenue();
      const latestInvoices = await fetchLatestInvoices();
      const {
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
      } = await fetchCardData();
    ```

    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d51cbaf0-9492-4156-90cf-14cb81b94923/0a3179b6-6408-469d-a2c3-ccdd4bef14a9/Untitled.png)

    - 하지만, 두 가지 주의해야 할 사항이 있다:
      1. 데이터 요청이 의도치 않게 서로 차단되어 요청 waterfall을 만들고 있다.
      2. 기본적으로 next.js는 성능을 향상시키기 위해 route를 제공하며 이를 스태틱 렌더링(static rendering)이라고 한다. 따라서 데이터가 변경되면 대시보드에 반영되지 않는다.
         여기서는 1번에 대해서 얘기하고, 다음 항목에서 2번을 자세히 살펴볼 것이다.

- Request waterfall는 뭘까?
  - “waterfall”은 이전 요청의 완료 여부에 따라 결정되는 일련의 네트워크 요청을 말한다. 데이터 가져오기의 경우 각 요청은 이전 요청이 데이터를 반환한 후에만 시작할 수 있다.
  - 즉, 병렬구조가 아니라 직렬 구조란 것.
    [sequential-parallel-data-fetching.avif](https://prod-files-secure.s3.us-west-2.amazonaws.com/d51cbaf0-9492-4156-90cf-14cb81b94923/e8be4520-a725-4906-9b90-fe295d7fa8a2/sequential-parallel-data-fetching.avif)
  - 예를 들어, `fetchLatestInvoices()`가 실행되기 전에 `fetchRevenue()`가 실행될 때까지 기다려야 한다.
    ```tsx
    const revenue = await fetchRevenue();
    const latestInvoices = await fetchLatestInvoices(); // wait for fetchRevenue() to finish
    const {
      numberOfInvoices,
      numberOfCustomers,
      totalPaidInvoices,
      totalPendingInvoices,
    } = await fetchCardData(); // wait for fetchLatestInvoices() to finish
    ```
  - 이 패턴이 반드시 나쁜 것은 아니다. 다음 요청을 만족해야 하는 조건을 원하기 때문에 waterfall 을 사용하는 경우가 있을 수 있다.
    - 예를 들어, 사용자의 ID와 프로필 정보를 먼저 가져오기를 원할 수 있다. ID를 가지고 있으면 친구 목록을 가져오도록 진행할 수 있다. 이 경우, 각 요청은 이전 요청에 반환된 데이터에 따라 달라진다.
    - 그러나 이러한 동작은 의도하지 않은 것일 수도 있고 성능에 영향을 줄 수도 있다.
- 병렬 데이터 가져오기

  - waterfall을 피하는 흔한 방법은 병렬적으로 동시에 모든 데이터 요청을 시작하는 것이다.
  - JS에서 [`Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) 또는 [`Promise.allSettled()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) 함수를 사용하여 모든 promise를 동시에 시작할 수 있다.
  - 예를 들어, `data.ts` 에서 우리는 `fetchCardData()` 함수에서 `Promise.all()` 을 사용하고 있다

    ```tsx
    // /app/lib/data.ts
    export async function fetchCardData() {
      try {
        const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
        const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
        const invoiceStatusPromise = sql`SELECT
             SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
             SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
             FROM invoices`;

        const data = await Promise.all([
          invoiceCountPromise,
          customerCountPromise,
          invoiceStatusPromise,
        ]);
        // ...
      }
    }
    ```

  - 이런 패턴을 사용하면 다음을 수행할 수 있다:
    - 모든 데이터 fetch를 동시에 실행하기 시작하면 성능이 향상될 수 있다.
    - 모든 라이브러리나 프레임워크에 적용할 수 있는 기본 JS 패턴을 사용한다.
    - 하지만 이 JS 패턴에만 의존하는 한 가지 단점이 있다 → 하나의 데이터 요청이 다른 모든 데이터 요청보다 느리면 어떻게 될까?
    - 값을 가져오는 데에 딜레이가 길 것이다.
