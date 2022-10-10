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
	let arr = d.map((element) => {
		return [
			// element.email,
			element.modelName,
			element.researchGroup,
			element.paperLink,
			Number(element.AnCora_ca.F1).toPrecision(4).toString(),
			Number(element.POS.F1).toPrecision(4).toString(),
			Number(element.STS_ca.combined_score).toPrecision(4).toString(),
			Number(element.TeCla.Accuracy).toPrecision(4).toString(),
			Number(element.TECa.Accuracy).toPrecision(4).toString(),
			Number(element.CatalanQA_results.f1).toPrecision(4).toString() + '/' + Number(element.CatalanQA_results.exact).toPrecision(4).toString(),
			Number(element.XQuAD_Ca.f1).toPrecision(4).toString() + '/' + Number(element.XQuAD_Ca.exact).toPrecision(4).toString()
		]
	})
	console.log('arr:', arr)

	const headers = [
		// 'Rank',
		'Model',
		'Submitted By',
		'Paper',
		'NER (F1)',
		'POS (F1)',
		'STS-ca (Comb.)',
		'TeCla (Acc.)',
		'TE-Ca (Acc.)',
		'CatalanQA (F1/EM)',
		'XQuAD-ca (F1/EM)'
	]
	const id_href = ['', '', '', 'ner', 'pos', 'sts', 'tecla', 'teca', 'catalanqa', 'xquad']

	let innerTable = '<table id="table" class="table performanceTable">'
	innerTable += '<thead><tr>'
	$(headers).each(function (header) {
	  // console.log(header)
	  if (header > 2) {
	    innerTable += '<th>' + '<a href="datasets.html#' + id_href[header].toLowerCase() + '">' + headers[header] + "</a></th>"
	  } else {
	    innerTable += '<th>' + headers[header] + "</th>"
	  }
	})
	innerTable += "</tr></thead></tbody>"
	$(arr).each(function (elem) {
		innerTable += '<tr>'
		$(arr[elem]).each(function (innerElem) {
			switch (innerElem) {
				// case 0:
					// innerTable += '<td>' + (elem + 1)
					// break
				case 2:
					if (arr[elem][innerElem] != '') {
						innerTable += '<td><a target="_blank" href=' + arr[elem][innerElem] + '><span class="material-symbols-outlined">open_in_new</span></a></td>'
					} else {
						innerTable += '<td></td>'
					}
					break
				case 1:
					innerTable += '<td>' + arr[elem][innerElem] + "</td>" // + '<br>' + arr[elem][0]
					break
				default:
					innerTable += '<td>' + arr[elem][innerElem] + '</td>'
			}
		})
		innerTable += "</tr>"
	})
	innerTable += "</tbody></table>"
	$('#leaderboard').html(innerTable)
	$('#table').DataTable({
		"paging": false
	});
}

function tableError (e) {
  console.error(e)
}

$(document).ready(() => {
	obtainTables();
})
