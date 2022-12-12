export function validEmail(email) {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !reg.test(email)
}

export function validPhone(phone) {
  const regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/
  if (!phone) {
    return '휴대전화 번호를 입력해 주세요'
    /*
      휴대전화번호 6월말 기준으로 2G종료로 11자리만 적용해달라는 요청으로 주석처리
      (20210625 - 포탈 고도화 테스트)
    */
    // } else if (phone.length < 10 || phone.length > 11) {
    //   return '휴대전화번호는 10 ~ 11자리이어야 합니다.'
  } else if (phone.length !== 11) {
    return '휴대전화 번호는 11자리여야 합니다'
  } else if (!regExp.test(phone)) {
    return '휴대전화 번호가 잘못 입력되었습니다'
  }
  return false
}

export function validPassword(password) {
  const pattern1 = /[0-9]/
  const pattern2 = /[a-zA-Z]/
  const pattern3 = /[~!@#$%<>^&*]/ // 원하는 특수

  if (!password) {
    return '비밀번호를 입력해 주세요'
  } else if (
    !pattern1.test(password) ||
    !pattern2.test(password) ||
    !pattern3.test(password) ||
    password.length < 8 ||
    password.length > 50
  ) {
    return '영문+숫자+특수기호 8자리 이상으로 구성하여야 합니다'
  }
  return false
}

export function validVerifyPassword(password, verifyPassword) {
  if (!verifyPassword) {
    return '비밀번호 확인을 입력해 주세요'
  } else if (password !== verifyPassword) {
    return '비밀번호와 비밀번호 확인이 같지 않습니다'
  }
  return false
}

export function changePhoneFormat(data) {
  return data.replace(/([0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3')
}

export function validFileName(file_name) {
  const pattern = /[{}/?,;:|*~`!^+<>@#$%&\\='"]/gi
  if (pattern.test(file_name)) {
    return "서류명에 사용 가능한 특수문자는 '-', '_', '(', ')', '[', ']', '.' 입니다"
  }
  return false
}

export function validFileExtension(origin_name, file_accept = '*/*') {
  if (origin_name && file_accept !== '*/*') {
    const start_index = origin_name.lastIndexOf('.')
    const extension = origin_name.substring(start_index)
    return file_accept.includes(extension)
  } else {
    return true
  }
}
