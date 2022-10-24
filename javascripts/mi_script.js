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
			element.url,
			Number(Number(element.sum) / Number(9)).toPrecision(4).toString(),
			Number(element.AnCora_ca.F1).toPrecision(4).toString(),
			Number(element.POS.F1).toPrecision(4).toString(),
			Number(element.STS_ca.combined_score).toPrecision(4).toString(),
			Number(element.TeCla.Accuracy).toPrecision(4).toString(),
			Number(element.TECa.Accuracy).toPrecision(4).toString(),
			Number(element.CatalanQA_results.f1).toPrecision(4).toString() + '/' + Number(element.CatalanQA_results.exact).toPrecision(4).toString(),
			Number(element.XQuAD_Ca.f1).toPrecision(4).toString() + '/' + Number(element.XQuAD_Ca.exact).toPrecision(4).toString()
		]
	})

	const headers = [
		'Rank',
		'Model',
		'Submitted By',
		'Url',
		'Score',
		'NER (F1)',
		'POS (F1)',
		'STS-ca (Comb.)',
		'TeCla (Acc.)',
		'TE-Ca (Acc.)',
		'CatalanQA (F1/EM)',
		'XQuAD-ca (F1/EM)'
	]
	const id_href = ['', '', '', '', '', 'ner', 'pos', 'sts', 'tecla', 'teca', 'catalanqa', 'xquad']

	let innerTable = '<table id="table" class="performanceTable table">'
	innerTable += '<thead><tr>'
	$(headers).each(function (header) {
	  // console.log(header)
	  if (id_href[header] != '') {
	    innerTable += '<th>' + '<a href="datasets.html#' + id_href[header].toLowerCase() + '">' + headers[header] + "</a></th>"
	  } else if (headers[header] === 'Paper') {
	    innerTable += '<th style="width:30px;">' + headers[header] + "</th>"
		} else {
	    innerTable += '<th>' + headers[header] + "</th>"
		}
	})
	innerTable += "</tr></thead></tbody>"
	$(arr).each(function (elem) {
		innerTable += '<tr>'
		innerTable += '<td>' + (elem + 1) + '</td>'
		$(arr[elem]).each(function (innerElem) {
			switch (innerElem) {
				case 2:
					if (arr[elem][innerElem] != '') {
						innerTable += '<td><a target="_blank" href=' + arr[elem][innerElem] + '><span class="material-symbols-outlined">open_in_new</span></a></td>'
					} else {
						innerTable += '<td></td>'
					}
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
		paging: false,
		autoWidth: false,
		//order: [[4, 'desc']],
		columnDefs: [
			{ targets: [1, 2, 3], orderable: false },
			{ targets: "_all", className: 'dt-center' },
			{ targets: "_all", orderSequence: ['desc', 'asc'] }
		],
		searching: false
	});
}

function tableError (e) {
  console.error(e)
}

$(document).ready(() => {
	obtainTables();
})
