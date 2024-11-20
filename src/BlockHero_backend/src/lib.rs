use candid::types::number::Nat;
use candid::types::principal::Principal;
use ic_cdk::{query, update};
use std::cell::RefCell;
use std::collections::BTreeMap;

thread_local! {
  static COUNTER: RefCell<Nat> = RefCell::new(Nat::from(0 as u32));

  pub static USER_INFO_MAP: RefCell<BTreeMap<Principal, String>> = RefCell::new(BTreeMap::new());
  pub static USER_ATHORITY_MAP: RefCell<BTreeMap<Principal, String>> = RefCell::new(BTreeMap::new());

  pub static FILE_MAP: RefCell<BTreeMap<String, String>> = RefCell::new(BTreeMap::new());
  pub static FILE_ATHORITY_MAP: RefCell<BTreeMap<String, String>> = RefCell::new(BTreeMap::new());
}

// user 관련
#[update]
fn register_user(identity: Principal, user_id: String, user_pw: String) {
  // icp identity와 user id 및 pw, 권한을 param으로 받음

  // id와 icp identity 해시 함수 돌린 결과 -> a 
  // pw와 icp identity 해시 함수 돌린 결과 -> b
  // a와 b를 해시 함수 돌린 결과 -> c
  // 테이블에 저장 -> key : identity, value :  c 를 저장
  // 테이블에 저장 -> key : identity, value : 유저 권한

}

#[query]
fn check_user_registered() -> bool {
  // identity를 param으로 받음
  //둣identity를 key로 테이블 검색했을 때 있으면 true, 없으면 false

  true
}

#[query]
fn login() -> bool {
  // login에 필요한 값 주고, login 성공? 실패?

  // id와 icp identity와 pw를 param으로 받음

  // id와 icp identity 해시 함수 돌린 결과 -> a 
  // pw와 icp identity 해시 함수 돌린 결과 -> b
  // a와 b를 해시 함수 돌린 결과 -> c
  // identity를 key로 테이블 검색한 값과 c를 비교해서 같으면 true, 다르면 false
  true
}

// file 관련
#[update]
fn upload_file() {
  // file의 title과 content, file 권한을 param으로 받음
  // 테이블에 저장 -> key : file title, value : file content
  // 테이블에 저장 -> key: file title, value : file 권한
}

#[query]
fn read_file() {
  // file title과 icp identity를 param으로 받음

  // 테이블에서 file title로 file 권한 가져 옴
  // 테이블에서 identy로 user 권한 가져 옴
  // 둘 비교해서 file 권한 숫자가 user 권한 숫자보다 작으면 읽기 실패(숫자가 작을 수록 권한 쎔. 0이 제일 쎔)

  // 테이블에서 key값으로 file title을 검색한 결과를 전달. 없으면 빈 string

  // 아, 그리고 읽은 history를 기록해야 함
  // 읽은 시간, 읽은 사람 identity, user id, 파일 title 을 history에 추가
  // create_log() 함수 만들어서 써야 하나? 그냥 여기 구현해도 되나?
}


#[update] // 이건 구현 x
fn update_file() {

}

#[update] // 이것도 구현 x
fn delete_file() {

}

fn create_log() {

}

#[query]
fn read_logs() {
  // limit과 시간 순서 옵션(최근 순, 오래된 순)을 파라미터롤 받음
  // logs 에서 위 조건에 맞게 배열로 넘겨 줌
}




#[query]
fn greet(say: String) -> String {
  return say
}



/// Get the value of the counter.
#[query]
fn get() -> Nat {
  COUNTER.with(|counter| counter.borrow().clone())
}

/// Set the value of the counter.
#[update]
fn set(n: Nat) {
  COUNTER.with(|counter| *counter.borrow_mut() = n);
}

#[update]
fn increment() {
  COUNTER.with(|counter| *counter.borrow_mut() += 1 as u32);
}

ic_cdk::export_candid!();