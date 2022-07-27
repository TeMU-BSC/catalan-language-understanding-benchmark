function checkMail () {
  const mail = $('#email').val()
  if (/[\w-]+@\w+\.\w{2,3}/.exec(mail) == null) {
    $('#emailDiv').addClass('has-error').append('<div class="help-block">Mail ' + mail + ' is not valid</div>')
  } else {
    $('#emailDiv').removeClass('has-error')
    $('#emailDiv > div.help-block').remove()
  }
}

function checkLink () {
  const paperLink = $('#paperLink').val()
  if (paperLink !== '' && /http[s]?:\/\/[\w-]+\.\w{2,3}[/\w-]*\.?\w{0,4}/.exec(paperLink) == null) {
    $('#paperLinkDiv').addClass('has-error').append('<div class="help-block">Link ' + paperLink + ' is not valid</div>')
  } else {
    $('#paperLinkDiv').removeClass('has-error')
    $('#paperLinkDiv > div.help-block').remove()
  }
}

function checkFile(sender) {
  if (sender.path === '') {
    $('#' + sender.id).parent().addClass('has-error').append('<div class="help-block">This name is not valid</div>')
  } else {
    $('#' + sender.id).parent().removeClass('has-error')
    $('#' + sender.id + ' + div.help-block').remove()
  }
}

function checkText(sender) {
  if (sender.value === '') {
    $('#' + sender.id).parent().addClass('has-error').append('<div class="help-block">This name is not valid</div>')
  } else {
    $('#' + sender.id).parent().removeClass('has-error')
    $('#' + sender.id + ' + div.help-block').remove()
  }
}

function submitForm (e) {
  let formData = new FormData($('#evaluation_form')[0])
  // let mailValid = checkMail(formData.get('email'))
  // let linkValid = checkLink(formData.get('paperLink'))
  if (!$('#evaluation_form div').hasClass('has-error')) {
    $('#submit_button').val('Submit')
    $.ajax({
      url: 'https://bsclsaina01.bsc.es/clubapi/results',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: submitSuccess,
      error: submitError
    })
  }
}

function submitSuccess () {
  $('#evaluation_form').css('display', 'none').parent().append('<img src="../ok.png" alt="Evaluation sent successfully">')
  $('#evaluation_form + img').css('filter', 'invert(100%)').css('text-align', 'center')
  $('#evaluation_form + p').css('display', 'none')
  $('#evaluation_form + h1').text('Thanks for submitting!')
}

function submitError (err) {
  console.error(err)
}
