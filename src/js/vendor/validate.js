import Modals from './modals'
import Header from '../../blocks/modules/header/header'
import sliders from '../../blocks/modules/apartments/apartments'

const modals = new Modals()
const header = new Header()

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form._validate')
    if (forms.length <= 0) return

    for (let i = 0; i < forms.length; i++) {
        const form = forms[i]

        form.addEventListener('submit', formSubmit)

        function formSubmit(evt) {
            evt.preventDefault()

            const errors = validateForm(form)

            const formData = new FormData(form)
            const object = {}
            formData.forEach((value, key) => {
                // Reflect.has in favor of: object.hasOwnProperty(key)
                if (!Reflect.has(object, key)) {
                    object[key] = value
                    return
                }
                if (!Array.isArray(object[key])) {
                    object[key] = [object[key]]
                }
                object[key].push(value)
            })
            const json = JSON.stringify(object)
            controlApp(
                {
                    data: json,
                    failed: errors > 0,
                    form,
                },
                { modals, header, sliders },
            )

            return false
        }

        function validateForm(form) {
            let errors = 0
            const requiredInputs = form.querySelectorAll('._req')

            for (let j = 0; j < requiredInputs.length; j++) {
                const input = requiredInputs[j]
                formRemoveError(input.parentElement)

                if (input.parentElement.classList.contains('_tel')) {
                    if (telTest(input)) {
                        formAddError(input.parentElement)
                        errors++
                    }
                } else if (input.value.length < '2') {
                    formAddError(input.parentElement)
                    errors++
                }
            }

            const requiredCheck = form.querySelectorAll('._req-check')

            for (let j = 0; j < requiredCheck.length; j++) {
                const checkWrapper = requiredCheck[j]
                formRemoveError(checkWrapper)

                const inputs = checkWrapper.querySelectorAll('input')
                let checkedInputs = 0

                for (let x = 0; x < inputs.length; x++) {
                    const input = inputs[x]
                    if (input.checked) {
                        checkedInputs++
                    }
                }

                if (!checkedInputs) {
                    formAddError(checkWrapper)
                    errors++
                }
            }

            return errors
        }

        function formAddError(input) {
            input.classList.add('_error')
        }

        function formRemoveError(input) {
            input.classList.remove('_error')
        }

        function telTest(input) {
            return !/^(\+[1-9]{1})?[0-9]{3,14}$/.test(input.value)
        }
    }
})
