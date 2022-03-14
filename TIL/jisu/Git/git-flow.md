# Git flow

> git으로 개발할 때 거의 표준처럼 사용되는 방법론

## branch

> 총 5가지 브랜치를 사용해 운영함

- master: 기준 브랜치로, 최종 배포 시 사용
- develop: master에서 파생된 개발 브랜치, 주로 개발자 각자 작업한 기능(feature)을 merge함
- feature: develop에서 파생된 브랜치로 단위 기능 개발에 사용됨, 기능 개발 완료 시 develop 브랜치에 merge
- release: 배포를 위해 master에 보내기 전, QA 검사하는 브랜치
- hotfix: master에서 배포한 뒤 버그 생겼을 시 급하게 생성하는 브랜치

## CLI 설정!!

초기화

```
$ git flow init -d
```

- master, develop, feature, release, hotfix 브랜치가 default로 만들어짐

브랜치명을 커스텀 하고 싶으면

```
$ git flow init
```

```
SSAFY@DESKTOP-KVCQHCD MINGW64 ~/Desktop/SSAFY/test (master)
$ git flow init
No branches exist yet. Base branches must be created now.
Branch name for production releases: [master]
Branch name for "next release" development: [develop] <여기에 frontend or backend(아래 추가 설명,,)>

How to name your supporting branch prefixes?
Feature branches? [feature/]
Bugfix branches? [bugfix/]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]
Version tag prefix? []
Hooks and filters directory? [C:/Users/SSAFY/Desktop/SSAFY/test/.git/hooks]
```

- 각 브랜치에서 엔터를 치면 [] 안에 들어간 이름으로 브랜치가 생성되고, 커스텀 가능

---

## ⭐️ 우리 프로젝트(뽈락)는!!

frontend와 backend를 같은 깃랩 프로젝트 안에서 작업해야 하기 때문에

```
master
├── frontend(develop)
│   ├── feature(각자 개별 기능 작업)
├── backend(develop)
│   ├── feature(각자 개별 기능 작업)
```

정도로 하면 좋을 것 같다!

=> 즉, git flow init(커스텀버전)으로 초기화해서 FE 개발자들은 develop 브랜치의 이름을 `frontend`로! BE 개발자는 develop 브랜치의 이름을 `backend`로! 하면됨

---

## feature 브랜치 사용하기

### 브랜치 생성
FE는 `frontend` 브랜치에서 BE는 `backend` 브랜치에서

```bash
$ git flow feature start <feature-name>
```

- `feature/`를 접두어로 설정했으므로 `feature/feature-name` 브랜치가 자동 생성되고, checkout 된다.

### 원격 저장소 push

```bash
$ git add .
$ git commit -m "[jira issue number]commit type: commit msg"
$ git flow feature publish <feature-name>
```

- Pull Request를 이용하려면 원격 저장소에 먼저 push해야 한다. 그때 쓰는 명령어

### 개발 끝 (브랜치 머지)

```bash
$ git flow feature finish <feature-name>
```

- `develop` 브랜치로 체크아웃 뒤 `feature/feature-name` 브랜치를 머지 후 삭제한다.
- Pull Request가 필요할 경우는 이 명령어 대신 Pull Request를 연다.

### 원격 저장소 pull

```bash
$ git flow feature pull origin <feature-name>
```

## References

- [Git flow 개념 이해하기](https://uxgjs.tistory.com/183)
- [git-flow cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/index.ko_KR.html)
- [[협업] 협업을 위한 Git Flow 설정하기](https://overcome-the-limits.tistory.com/entry/%ED%98%91%EC%97%85-%ED%98%91%EC%97%85%EC%9D%84-%EC%9C%84%ED%95%9C-Git-Flow-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
- [git 브랜치 전략에 대해서](https://tecoble.techcourse.co.kr/post/2021-07-15-git-branch/)
- [[Git] git-flow 소개, 설치 및 사용법](https://hbase.tistory.com/60)
- [Git flow 이해하기](https://lab.ssafy.com/s06-webmobile1-sub2/S06P12C203/-/edit/frontend/TIL/hyein/Git/git-flow-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0.md)
