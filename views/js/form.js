function checkMail () {
  const mail = $('#email').val()
  if (/[\w\-]+@\w+\.\w{2,3}/.exec(mail) == null) {
    $('#emailDiv').addClass('has-error')
    console.log(mail + ' is not valid.')
  } else {
    $('#emailDiv').removeClass('has-error')
  }
}

function checkLink () {
  const paperLink = $('#paperLink').val()
  if (paperLink !== '' && /http[s]?:\/\/[\w-]+\.\w{2,3}[/\w-]*\.?\w{0,4}/.exec(paperLink) == null) {
    $('#paperLinkDiv').addClass('has-error')
    console.log('Link ' + paperLink + ' is not valid.')
  } else {
    $('#paperLinkDiv').removeClass('has-error')
  }
}

function submitForm (e) {
  let formData = new FormData($('#evaluation_form')[0])
  // let mailValid = checkMail(formData.get('email'))
  // let linkValid = checkLink(formData.get('paperLink'))
  // if (mailValid && linkValid) {
    $.ajax({
      url: 'http://localhost:3000/api/results',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: submitSuccess,
      error: submitError
    })
  // }
}

function submitSuccess () {
  alert('Success!')
}

function submitError (err) {
  // console.error(err)
}
