# 투두리스트

![스크린샷 2022-03-20 오후 12.08.46.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ec109f54-6df2-4fb7-8d59-e09c2cbc5ffc/스크린샷_2022-03-20_오후_12.08.46.png)

## json-server를 활용한 비동기 통신

[https://github.com/typicode/json-server](https://github.com/typicode/json-server)

json-servor를 활용하여 로컬에 REST API를 구축하고 연동합니다.

기본적인 데이터 처리인 생성, 읽기, 수정, 삭제(CRUD)를 구현합니다.

AJAX 요청은 fetch API를 사용합니다.

(update: 2022-03-20 일요일)

## 주요 기능

- 할 일 생성
  - 동적으로 HTML Element를 생성하여 append 합니다.
  - HTTP method `POST`를 사용하여 json-server에 할 일을 등록합니다.
- 체크 기능
  - ~~sessionStorage로 부터 데이터를 읽어들여 체크 유무를 판단, 새로고침 시 그대로 유지합니다.~~
  - HTTP method `PATCH`를 사용하여 json-server로 데이터를 넘깁니다.
  - 새로고침, 페이지를 껐다 켜도 체크 상태가 유지됩니다.
- 할 일 수정
  - 수정 버튼을 클릭하여 할 일을 수정할 수 있습니다.
  - HTTP method `PATCH`를 사용하여 수정된 정보를 json-server로 넘깁니다.
  - json-server로부터 수정된 정보를 받아와 할 일을 수정합니다.
- 할 일 삭제
  - 삭제 버튼을 클릭해 동적으로 HTML Element를 삭제합니다.
  - HTTP method `DELETE`를 사용하여 json-server로부터 해당 데이터를 삭제합니다.
- 할 일 모두 삭제
  - json-server의 모든 id값에 대해 `DELETE`를 수행합니다. 할 일을 모두 비웁니다.

### ~~브라우저에 데이터를 저장하고 가져오기~~

~~페이지가 새로고침 되어도 이전 정보를 그대로 저장하기 위해 `sessionStorage`를 사용했습니다.~~

~~localStorage는 중요한 정보를 저장하고 페이지를 종료해도 데이터가 보존되므로 보안상의 이유로 사용하지 않았습니다.~~

~~각 데이터의 정보는 생성 된 순서에 따라 객체 데이터로 배열에 push하고 setItem 메서드를 통해 sessionStorage에 저장합니다.~~

~~각 데이터 정보의 삭제는 인덱스를 참조하여 배열에서 splice되고 갱신된 배열 데이터를 마찬가지로 sessionStorage에 저장합니다.~~

(done: 2022-03-18 금요일)
