use candid::types::number::Nat;
use ic_cdk::{query, update};
use std::cell::RefCell;

thread_local! {
  static COUNTER: RefCell<Nat> = RefCell::new(Nat::from(0 as u32));
}

// user 관련
#[update]
fn register_user() {

}

#[query]
fn check_user_registered() -> bool {
  true
}

#[query]
fn login() -> bool {
  // login에 필요한 값 주고, login 성공? 실패?
  true
}

// file 관련
#[update]
fn upload_file() {

}

#[query]
fn read_file() {
}

#[update] // 이건 구현 x
fn update_file() {

}

#[update]
fn delete_file() {

}

fn create_log() {

}

#[query]
fn read_logs() {
  
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