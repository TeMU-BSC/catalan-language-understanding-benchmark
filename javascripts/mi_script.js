function obtainTables () {
  $.ajax({
    url: 'https://bsclsaina01.bsc.es/clubapi/tables',
    //url: 'http://localhost:3000/api/tables',
    dataType: 'json',
    // contentType: "application/json",
    success: tableSuccess,
    error: tableError
  })
}

function tableSuccess (d) {
  // console.log(d)
  const arr = d.map((element) => {
    return [
      element.email,
      element.modelName,
      element.researchGroup,
      element.paperLink,
      Number(/\d+\.\d{3}/.exec(element.AnCora_ca.F1)).toPrecision(4).toString(),
      Number(/\d+\.\d{3}/.exec(element.POS.F1)).toPrecision(4).toString(),
      Number(/\d+\.\d{3}/.exec(element.STS_ca.combined_score)).toPrecision(4).toString(),
      Number(/\d+\.\d{3}/.exec(element.TeCla.Accuracy)).toPrecision(4).toString(),
      Number(/\d+\.\d{3}/.exec(element.TECa.Accuracy)).toPrecision(4).toString(),
      Number(/\d+\.\d{3}/.exec(element.CatalanQA_results.f1)).toPrecision(4).toString() + '/' + Number(/\d+\.\d{3}/.exec(element.CatalanQA_results.exact)).toPrecision(4).toString(),
      Number(/\d+\.\d{3}/.exec(element.XQuAD_Ca.f1)).toPrecision(4).toString() + '/' + Number(/\d+\.\d{3}/.exec(element.XQuAD_Ca.exact)).toPrecision(4).toString()
    ]
  })
  const headers = [
    'Rank',
    'Model',
    'Group',
    'Paper',
    'NER (F1)',
    'POS (F1)',
    'STS-ca (Comb.)',
    'TeCla (Acc.)',
    'TE-Ca (Acc.)',
    'CatalanQA (F1/EM)',
    'XQuAD-ca (F1/EM)'
  ]
  const id_href = ['', '', '', '', 'ner', 'pos', 'sts', 'tecla', 'teca', 'catalanqa', 'xquad']

  let innerTable = '<table class="table performanceTable">'
  innerTable += '<tr>'
  $(headers).each(function (header) {
    // console.log(header)
    if (header > 3) {
      innerTable += '<th>' + '<a href="datasets.html#' + id_href[header].toLowerCase() + '">' + headers[header]
    } else {
      innerTable += '<th>' + headers[header]
    }
  })

  $(arr).each(function (elem) {
    innerTable += '<tr>'
    $(arr[elem]).each(function (innerElem) {
      switch (innerElem) {
        case 0:
          innerTable += '<td>' + (elem + 1)
          break
        case 3:
          innerTable += '<td><a target="_blank" href=' + arr[elem][innerElem] + '><span class="material-symbols-outlined">open_in_new'
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
