# Todo-list

## 주요 기능

- 할 일 생성
  - 동적으로 HTML Element를 생성하여 append 합니다.
- 체크 기능
  - sessionStorage로 부터 데이터를 읽어들여 체크 유무를 판단, 새로고침 시 그대로 유지합니다.
- 할 일 삭제
  - 삭제 버튼을 클릭해 동적으로 HTML Element를 삭제합니다.
  - 삭제 된 Element의 정보는 sessionStorage에서도 삭제되어 새로고침 시 반영됩니다.

### 브라우저에 데이터를 저장하고 가져오기

페이지가 새로고침 되어도 이전 정보를 그대로 저장하기 위해 `sessionStorage`를 사용했습니다.

localStorage는 중요한 정보를 저장하고 페이지를 종료해도 데이터가 보존되므로 보안상의 이유로 사용하지 않았습니다.

각 데이터의 정보는 생성 된 순서에 따라 객체 데이터로 배열에 push하고 setItem 메서드를 통해 sessionStorage에 저장합니다.

각 데이터 정보의 삭제는 인덱스를 참조하여 배열에서 splice되고 갱신된 배열 데이터를 마찬가지로 sessionStorage에 저장합니다.
