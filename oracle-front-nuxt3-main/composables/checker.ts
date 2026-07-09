export function isPositive(change: number): boolean {
  return change >= 0
}

export async function validateAndProcessFile(
  file: File,
  minImageDimension: number,
): Promise<{ valid: boolean; dataUrl?: string; error?: string }> {
  return await new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        const img = new Image()
        img.onload = () => {
          if (
            img.width < minImageDimension ||
            img.height < minImageDimension
          ) {
            resolve({
              valid: false,
              error: `Low Resolution Image. This image has a very low resolution (below ${minImageDimension}x${minImageDimension} pixels). Please upload a higher quality image for better results.`,
            })
          } else {
            resolve({
              valid: true,
              // @ts-ignore
              dataUrl: e.target.result as string,
            })
          }
        }

        img.onerror = () => {
          resolve({
            valid: false,
            error: 'Invalid image file. Please upload a valid image.',
          })
        }

        img.src = e.target.result as string
      } else {
        resolve({
          valid: false,
          error: 'Failed to read file data.',
        })
      }
    }

    reader.onerror = () => {
      resolve({
        valid: false,
        error: 'Failed to read file data.',
      })
    }

    reader.readAsDataURL(file)
  })
}

export interface Rule {
  key: 'length' | 'uppercase' | 'digit' | 'symbol'
  text: string
  enabled: boolean
}

export interface ValidationResult {
  valid: boolean
  errors: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }
  passwordValid: {
    length: boolean
    uppercase: boolean
    digit: boolean
    symbol: boolean
  }
}

export function validatePasswordForm(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
  rules: Rule[]
): ValidationResult {
  const errors = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }

  const passwordValid = {
    length: false,
    uppercase: false,
    digit: false,
    symbol: false,
  }

  let valid = true

  if (!currentPassword) {
    errors.currentPassword = 'Current password is required.'
    valid = false
  }

  if (!newPassword) {
    errors.newPassword = 'New password is required.'
    valid = false
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
    valid = false
  }

  if (newPassword) {
    rules.forEach((rule) => {
      if (!rule.enabled) return

      switch (rule.key) {
        case 'length':
          passwordValid.length = newPassword.length >= 8
          if (!passwordValid.length) {
            errors.newPassword ||= 'Password must be at least 8 characters.'
            valid = false
          }
          break
        case 'uppercase':
          passwordValid.uppercase = /[A-Z]/.test(newPassword)
          if (!passwordValid.uppercase) {
            errors.newPassword ||= 'Password must contain an uppercase letter.'
            valid = false
          }
          break
        case 'digit':
          passwordValid.digit = /\d/.test(newPassword)
          if (!passwordValid.digit) {
            errors.newPassword ||= 'Password must contain a digit.'
            valid = false
          }
          break
        case 'symbol':
          passwordValid.symbol = /[^a-zA-Z0-9]/.test(newPassword)
          if (!passwordValid.symbol) {
            errors.newPassword ||= 'Password must contain a symbol.'
            valid = false
          }
          break
      }
    })

    if (confirmPassword && confirmPassword !== newPassword) {
      errors.confirmPassword = 'Passwords do not match.'
      valid = false
    }
  }

  return { valid, errors, passwordValid }
}


export function hasAnyValidAmount(addresses: Array<{ amount?: string | number | null }>): boolean {
  return addresses.some((address) => parseFloat(String(address.amount ?? 0)) > 0)
}
