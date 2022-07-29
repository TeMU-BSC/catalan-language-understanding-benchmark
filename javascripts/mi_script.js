function obtainTables () {
  $.ajax({
    url: 'https://bsclsaina01.bsc.es/clubapi/tables',
    dataType: 'json',
    // contentType: "application/json",
    success: tableSuccess,
    error: tableError
  })
}

function tableSuccess (d) {
  console.log(d)
  const arr = d.map((element) => {
    return [element.email, element.modelName, element.researchGroup, element.paperLink, /\d+\.\d{2}/.exec(element.STS_ca.combined_score), /\d+\.\d{2}/.exec(element.POS.F1), /\d+\.\d{2}/.exec(element.VilaQuAD.exact) + '/' + /\d+\.\d{2}/.exec(element.VilaQuAD.f1), /\d+\.\d{2}/.exec(element.ViquiQuAD.exact) + '/' + /\d+\.\d{2}/.exec(element.ViquiQuAD.f1), /\d+\.\d{2}/.exec(element.XQuAD_Ca.exact) + '/' + /\d+\.\d{2}/.exec(element.XQuAD_Ca.f1), /\d+\.\d{2}/.exec(element.TeCla.Accuracy), /\d+\.\d{2}/.exec(element.TECa.Accuracy), /\d+\.\d{2}/.exec(element.AnCora_ca.F1)]
    // return {email: element.email}
    // return {
    // email: element.email,
    // modelName: element.modelName,
    // researchGroup: element.researchGroup,
    // paperLink: element.paperLink,
    // task1: element.task1,
    // task2: element.task2,
    // task3: element.task3,
    // task4: element.task4,
    // task5: element.task5
    // }
  })
  const headers = ['Rank', 'Model', 'Group', 'Paper', 'STS', 'POS', 'VilaQuAD', 'ViquiQuAD', 'XQuAD', 'TECa', 'TeCla', 'AnCora']

  let innerTable = '<table class="table performanceTable">'
  innerTable += '<tr>'
  $(headers).each(function (header) {
    innerTable += '<th>' + headers[header]
  })

  $(arr).each(function (elem) {
    innerTable += '<tr>'
    $(arr[elem]).each(function (innerElem) {
      switch (innerElem) {
        case 0:
          innerTable += '<td>' + (elem + 1)
          break
        case 3:
          innerTable += '<td><a href=' + arr[elem][innerElem] + '>' + arr[elem][innerElem]
          break
        case 2:
          innerTable += '<td>' + arr[elem][innerElem] // + '<br>' + arr[elem][0]
          break
        default:
          innerTable += '<td>' + arr[elem][innerElem]
      }
    })
  })

  $('#leaderboard').html(innerTable)
}

function tableError (e) {
  console.error(e)
}

$(document).ready(() => {
  obtainTables()

  // console.log(arr)
})
