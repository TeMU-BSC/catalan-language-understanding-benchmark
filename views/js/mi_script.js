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
	// const sorted_objects = [...d].sort(function (a, b) {
	// 	  return (a.scores.reduce((c, z) => c + z)/a.scores.length) - (b.scores.reduce((c, z) => c + z)/b.scores.length)
	// }).reverse()
	// console.log(sorted_objects)
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
	console.log(arr)

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
	innerTable += '<tr>'
	$(headers).each(function (header) {
	  // console.log(header)
	  if (header > 2) {
	    innerTable += '<th>' + '<a href="datasets.html#' + id_href[header].toLowerCase() + '">' + headers[header]
	  } else {
	    innerTable += '<th>' + headers[header]
	  }
	})
	$(arr).each(function (elem) {
		innerTable += '<tr>'
		$(arr[elem]).each(function (innerElem) {
			switch (innerElem) {
				// case 0:
					// innerTable += '<td>' + (elem + 1)
					// break
				case 2:
					if (arr[elem][innerElem] != '') {
						innerTable += '<td><a target="_blank" href=' + arr[elem][innerElem] + '><span class="material-symbols-outlined">open_in_new'
					} else {
						innerTable += '<td>'
					}
					break
				case 1:
					innerTable += '<td>' + arr[elem][innerElem] // + '<br>' + arr[elem][0]
					break
				default:
					innerTable += '<td>' + arr[elem][innerElem]
			}
		})
	})
	$('#leaderboard').html(innerTable)
	let table = new Tabulator("#table", {
		autoColumnsDefinitions:{
			paperLink: {formatter:"link"}
		}
	});
}

function tableError (e) {
  console.error(e)
}

$(document).ready(() => {
	obtainTables();
	// console.log(':', tableData)
  // console.log(arr)
})
