import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Object.keys(rules).forEach((rule) => {
  // eslint-disable-next-line import/namespace
  extend(rule, rules[rule])
})

extend('required', {
  // eslint-disable-next-line no-undef
  message: '{_field_} 은(는) 반드시 입력해야 합니다',
})
extend('email', {
  // eslint-disable-next-line no-undef
  message: '{_field_} 이메일 형식이 아닙니다',
})
