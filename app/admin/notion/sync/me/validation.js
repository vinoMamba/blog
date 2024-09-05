"use server"

export const validatePassword = async ({ pwd }) => {
  return new Promise((res, rej) => {
    if (pwd === process.env.LOGIN_PWD) {
      res(true)
    } else {
      rej(false)
    }
  })
}
