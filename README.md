# <img src="./resources/img/logo.png" width="20px"/> 멜팅, Melting

<br/>
<img src="./resources/img/main.png" />
<br/><br/>

> '멜팅'은 AI와 함께 나만의 커버곡을 만들어 누구나 쉽게 앨범을 발매할 수 있는 웹앱 플랫폼 서비스입니다.

<br/>

|                                     멜팅                                      |
| :---------------------------------------------------------------------------: |
|                       [랜딩 페이지](j11a701.p.ssafy.io)                       |
|                   [서비스 페이지](j11a701.p.ssafy.io/main)                    |
| [멜팅 Notion](https://www.notion.so/jmxx219/0be8aa563b104eedaf97cd76eaeb604b) |

<br><br>

## 목차

1. [개요](#개요)
2. [서비스 소개](#서비스-소개)
3. [프로젝트 설계](#프로젝트-설계)
4. [개발 환경 및 기술 스택](#개발-환경-및-기술-스택)
5. [팀원 소개](#팀원-소개)

<br/>

## [개요](#목차)

> **개발 기간** : `2024-09-26 ~ 2024-10-10`

<br>

기획 배경

<br>
 
**멜팅이란?**

멜팅은 녹는다 멜트(melt)와 녹음(record)의 이중적 의미를 언어유희적으로 살린 서비스명입니다.

<br>

### 주요 기능

1. 노래 녹음(멜팅)

2. AI 커버

3. 앨범 제작

<br>

### 차별점/독창성

1.
2.
3.
4.
5. 웹과 앱을 활용한 서비스 제공

   - 모바일 기반 서비스이므로 빠른 진입을 위해 앱 제공, 딥링크를 활용하여 빠르게 앱 진입가능

<br/>
<br/>

## [서비스 소개](#목차)

### 1️⃣ <b>메인 페이지</b>

|               **Register Page**               |                 **Main Page**                 |                 **Main Page**                 |
| :-------------------------------------------: | :-------------------------------------------: | :-------------------------------------------: |
| <img src="./resources/gif/.gif" height="400"> | <img src="./resources/gif/.gif" height="400"> | <img src="./resources/gif/.gif" height="400"> |

<br>

### 2️⃣ <b>곡 생성 페이지</b>

<br>

### 3️⃣ <b>앨범 제작 페이지</b>

<br>

### 4️⃣ <b>켜뮤니티 제작 페이지</b>

<br>

### 5️⃣ <b>마이 페이지</b>

|                **Login Page**                 |                  **My Page**                  |
| :-------------------------------------------: | :-------------------------------------------: |
| <img src="./resources/gif/.gif" height="400"> | <img src="./resources/gif/.gif" height="400"> |

<br/>
<br/>

## [프로젝트 설계](#목차)

### 시스템 아키텍쳐

<img width="500px" src="./resources/img/아키텍쳐.png">

<br/>

### ERD

<img width="500px" src="./resources/img/ERD.png">

<br>

### API 명세서

<details>
<summary>Swagger API</summary>
<div markdown="1">
<img width="400px" src="./resources/img/swagger-api.png">
</div>
</details>

<br/>
<br/>

## [개발 환경 및 기술 스택](#목차)

|      개발 환경      | 기술 스택                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |     |
| :-----------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
|    **Frontend**     | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-1572b6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white) ![vite](https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![react](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![typescript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)                                                                                |
|     **Backend**     | ![Java](https://img.shields.io/badge/Java_21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white) ![Gradle](https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring_Boot_3.3.3-6DB33F?style=for-the-badge&logo=spring&logoColor=white) ![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white) ![OAuth2](https://img.shields.io/badge/OAuth2-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white) ![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-gray?style=for-the-badge&logo=Spring_Data_JPA&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white) |
|       **DB**        | ![PostgreSQL](https://img.shields.io/badge/postgresql-4479A1?style=for-the-badge&logo=postgresql&logoColor=white) ![redis](https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white) ![Elastic Search](https://img.shields.io/badge/elasticsearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|      **Infra**      | ![amazonec2](https://img.shields.io/badge/amazon_ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white) ![docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![nginx](https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Management Tool** | ![Jira](https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white) ![Gitlab](https://img.shields.io/badge/GitLab-FC6D26?style=for-the-badge&logo=GitLab&logoColor=white) ![Mattermost](https://img.shields.io/badge/mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000.svg?style=for-the-badge&logo=notion&logoColor=white) ![Figma](https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)                                                                                                                                                                        |
|       **App**       | ![ReactNative](https://img.shields.io/badge/ReactNative-61DAFB?style=for-the-badge)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

<br/>
<br/>

## [팀원 소개](#목차)

<table align="center">
  <tr>
    <th style="text-align: center;"><a href="https://github.com/tkdgus97">전상현</a></th>
    <th style="text-align: center;"><a href="https://github.com/btothey99">이보연</a></th>
    <th style="text-align: center;"><a href="https://github.com/jmxx219">손지민</a></th>
  </tr>
  <tr>
    <td style="text-align: center;"><img src="./resources/img/전상현.png" alt="" width="150px"/></td>
    <td style="text-align: center;"><img src="./resources/img/이보연.png" alt="" width="150px"/></td>
    <td style="text-align: center;"><img src="./resources/img/손지민.png" alt="" width="150px" /></td>
  </tr>
  <tr>
    <td style="text-align: center;"><b>Frontend</b></td>
    <td style="text-align: center;"><b>Frontend</b></td>
    <td style="text-align: center;"><b>Infra/Frontend</b></td>
  </tr>
</table>

<table align="center">
  <tr>
    <th style="text-align: center;"><a href="https://github.com/hyooun">유승현</a></th>
    <th style="text-align: center;"><a href="https://github.com/gyuoo">염규영</a></th>
    <th style="text-align: center;"><a href="https://github.com/EH05">최은혜</a></th>
  </tr>
  <tr>
    <td style="text-align: center;"><img src="./resources/img/유승현.png" alt="" width="150px" /></td>
    <td style="text-align: center;"><img src="./resources/img/염규영.png" alt="" width="150px"/></td>
    <td style="text-align: center;"><img src="./resources/img/최은혜.png" alt="" width="150px" /></td>
  </tr>
  <tr>
    <td style="text-align: center;"><b>Backend</b></td>
    <td style="text-align: center;"><b>Backend</b></td>
    <td style="text-align: center;"><b>Backend/AI</b></td>
  </tr>
</table>

<br>
